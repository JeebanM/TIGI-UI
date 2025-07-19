import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { hapticFeedback, ImpactHapticFeedbackStyle } from '@telegram-apps/sdk';

interface SoundVibrationContextProps {
  playSound: (id: string) => void;
  triggerVibration: (id: string) => void;
  isEnabled: boolean;
  toggleSoundVibration: () => void;
  stopAllSounds: () => void;
  stopSound: (id: string) => void;
}

const SoundVibrationContext = createContext<SoundVibrationContextProps | undefined>(undefined);

export const SoundVibrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const audioContextRef = useRef<{ [index: string]: any }>({});
  const buffersRef = useRef<{ [index: string]: string }>({});
  const gainNodesRef = useRef<{ [index: string]: any }>({});
  const activeSounds = useRef<{ [index: string]: any }>({});

  
  useEffect(() => {
    const loadSounds = async () => {
      audioContextRef.current = new (window.AudioContext)();
      const context = audioContextRef.current;

      const loadSound = async (name: string, url: string) => {
        const response = await fetch(url, {});
        const arrayBuffer = await response.arrayBuffer();
        const decodedBuffer = await context.decodeAudioData(arrayBuffer);
        buffersRef.current[name] = decodedBuffer;
        gainNodesRef.current[name] = context.createGain();  // Create GainNode for volume control
        gainNodesRef.current[name].connect(context.destination);
      };

      // Load all files
      const soundFiles = {
        // shuffle: "/sounds/shuffle.mp3",
        click: "/sounds/click.mp3",
        // game: "/sounds/game.mp3",
        // submit: "sounds/submit.mp3",
        // unlock: "/sounds/unlock.mp3",
        // exit: "/sounds/exit_card.mp3"

      };
      await Promise.all(Object.entries(soundFiles).map(([name, url]) => loadSound(name, url)));
    };

    loadSounds();
  }, []);

  const playAudioContextSound = (name: string, volume: number=1, loop: boolean=false ) => {
    if(activeSounds.current[name])
      return
    const context = audioContextRef.current;
    const buffer = buffersRef.current[name];
    const gainNode = gainNodesRef.current[name];

    if (context && buffer && gainNode) {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = loop;
      gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      source.connect(gainNode);
      source.start(0);
      if(loop)
        activeSounds.current[name] = source;
    }
  };


  const stopSound = (name: string) => {
    if (activeSounds.current[name]) {
      activeSounds.current[name].stop();
      delete activeSounds.current[name]; // Clear reference
    }
  };

  const stopAllSounds = () => {
    Object.keys(activeSounds.current).forEach((name) => {
      if (activeSounds.current[name]) {
        activeSounds.current[name].stop();
        delete activeSounds.current[name];
      }
    });
  };


  const playSound = (id: string) => {
    if (isEnabled) {
      switch (id) {
        case "game":
          playAudioContextSound(id, 0.1, true);
          break;
        case "shuffle":
          // audio = new Audio("/sounds/shuffle.mp3")
          playAudioContextSound(id);
          break;
        case "submit":
        case "bet":
          playAudioContextSound("submit");
          break;
        case "unlock":
          playAudioContextSound(id);
          break;
        case "exit":
        case "confirm":
        case "cancel":
          playAudioContextSound("exit");
          break;
      }
    }
  };

  const triggerVibration = (id: string) => {
    if (isEnabled) {
      switch(id) {
        case "shuffle":
          if (hapticFeedback.notificationOccurred.isAvailable()) {
            hapticFeedback.impactOccurred("heavy");
            console.log("Triggered 'success' haptic feedback for shuffle");
          }
          break;
        case "submit":
        case "bet":
          if (hapticFeedback.impactOccurred.isAvailable()) {
            hapticFeedback.impactOccurred("heavy");
            console.log("Triggered 'medium' impact feedback for submit/bet");
          }
          break;
        case "unlock":
          if (hapticFeedback.notificationOccurred.isAvailable()) {
            hapticFeedback.notificationOccurred("success");
            console.log("Triggered 'success' haptic feedback for unlock");
          }
          break;
        case "exit":
        case "confirm":
        case "cancel":
          vibrate(50);
          break;
      }
    }
  };

  const toggleSoundVibration = () => {
    setIsEnabled((prev) => !prev);
  };

  const vibrate = (duration: number) => {
    if (navigator.vibrate) {
      console.log("Using navigator.vibrate()");
      navigator.vibrate(duration);
    }
  };
  return (
    <SoundVibrationContext.Provider value={{ playSound, triggerVibration, isEnabled, toggleSoundVibration, stopAllSounds, stopSound }}>
      {children}
    </SoundVibrationContext.Provider>
  );
};

export const useSoundVibration = (): SoundVibrationContextProps => {
  const context = useContext(SoundVibrationContext);
  if (!context) {
    throw new Error("useSoundVibration must be used within a SoundVibrationProvider");
  }
  return context;
};
