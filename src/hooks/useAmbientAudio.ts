'use client';

import { useRef, useCallback, useState, useEffect } from 'react';

/* ==================================================
   GENERATIVE AMBIENT AUDIO ENGINE
   Uses Web Audio API — no external files needed
   Generates: rain ambience, cinematic drone, tape hiss
   ================================================== */

export function useAmbientAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.15);

  const init = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;

    const ctx = new AudioContext();
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.15;
    masterGain.connect(ctx.destination);

    ctxRef.current = ctx;
    masterGainRef.current = masterGain;

    // === LAYER 1: Tape hiss (brown noise) ===
    const bufferSize = 2 * ctx.sampleRate;
    const brownBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const brownData = brownBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      brownData[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = brownData[i];
      brownData[i] *= 3.5;
    }
    const brownSource = ctx.createBufferSource();
    brownSource.buffer = brownBuffer;
    brownSource.loop = true;

    const hissFilter = ctx.createBiquadFilter();
    hissFilter.type = 'bandpass';
    hissFilter.frequency.value = 800;
    hissFilter.Q.value = 0.5;

    const hissGain = ctx.createGain();
    hissGain.gain.value = 0.08;

    brownSource.connect(hissFilter);
    hissFilter.connect(hissGain);
    hissGain.connect(masterGain);
    brownSource.start();

    // === LAYER 2: Cinematic drone (low oscillators) ===
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.04;
    droneGain.connect(masterGain);

    // Sub bass drone
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.value = 55; // A1
    const subGain = ctx.createGain();
    subGain.gain.value = 0.03;
    subOsc.connect(subGain);
    subGain.connect(droneGain);
    subOsc.start();

    // Pad drone (fifth above)
    const padOsc = ctx.createOscillator();
    padOsc.type = 'sine';
    padOsc.frequency.value = 82.5; // E2-ish
    const padGain = ctx.createGain();
    padGain.gain.value = 0.02;
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.value = 200;
    padOsc.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(droneGain);
    padOsc.start();

    // LFO for drone movement
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // Very slow
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 5;
    lfo.connect(lfoGain);
    lfoGain.connect(padOsc.frequency);
    lfo.start();

    // === LAYER 3: Rain simulation (filtered noise) ===
    const rainBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = rainBuffer.getChannelData(ch);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }
    }
    const rainSource = ctx.createBufferSource();
    rainSource.buffer = rainBuffer;
    rainSource.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.value = 3000;
    rainFilter.Q.value = 0.3;

    const rainHighpass = ctx.createBiquadFilter();
    rainHighpass.type = 'highpass';
    rainHighpass.frequency.value = 500;

    const rainGain = ctx.createGain();
    rainGain.gain.value = 0.06;

    rainSource.connect(rainFilter);
    rainFilter.connect(rainHighpass);
    rainHighpass.connect(rainGain);
    rainGain.connect(masterGain);
    rainSource.start();

    nodesRef.current = [brownSource, subOsc, padOsc, lfo, rainSource];

    return ctx;
  }, []);

  const play = useCallback(() => {
    if (!ctxRef.current) init();
    if (ctxRef.current?.state === 'suspended') {
      ctxRef.current.resume();
    }
    setIsPlaying(true);
  }, [init]);

  const pause = useCallback(() => {
    if (ctxRef.current?.state === 'running') {
      ctxRef.current.suspend();
    }
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(v, ctxRef.current?.currentTime || 0, 0.1);
    }
  }, []);

  useEffect(() => {
    return () => {
      nodesRef.current.forEach(n => {
        try { (n as AudioBufferSourceNode | OscillatorNode).stop(); } catch {}
      });
      try { ctxRef.current?.close(); } catch {}
    };
  }, []);

  return { init, play, pause, toggle, isPlaying, volume, setVolume };
}
