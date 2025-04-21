import React, { useMemo, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

interface SoundButtonProps {
  label: string;
  soundFile: any;             // required sound file (e.g. require('../assets/boom.mp3'))
  size?: number;              // optional diameter (default: 80)
  style?: StyleProp<ViewStyle>;
}

/**
 * A circular button with a random gradient background, drop shadows, and plays a sound on press.
 *
 * Props:
 * - label: string            // text inside
 * - soundFile: any           // imported sound asset
 * - size?: number            // diameter in px (default: 80)
 * - style?: extra container styles
 */
const SoundButton: React.FC<SoundButtonProps> = ({ label, soundFile, size = 80, style }) => {
  // generate gradient colors once
  const [startColor, endColor] = useMemo(() => {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    const r = Math.floor(parseInt(hex.substring(0,2), 16) * 0.8);
    const g = Math.floor(parseInt(hex.substring(2,4), 16) * 0.8);
    const b = Math.floor(parseInt(hex.substring(4,6), 16) * 0.8);
    const darker = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    return [`#${hex}`, `#${darker}`];
  }, []);

  // ref to store the sound object
  const sound = useRef<Audio.Sound | null>(null);

  // preload the sound when mounting
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { sound: loadedSound } = await Audio.Sound.createAsync(soundFile, { shouldPlay: false });
      if (isMounted) sound.current = loadedSound;
    })();
    return () => {
      isMounted = false;
      // unload on unmount
      sound.current?.unloadAsync();
    };
  }, [soundFile]);

  // play the preloaded sound
  const handlePress = async () => {
    if (sound.current) {
      await sound.current.replayAsync();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handlePress}
      style={[styles.shadowContainer, style]}
    >
      <LinearGradient
        colors={[startColor, endColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <Text style={styles.text}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    margin: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  } as ViewStyle,
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  } as TextStyle,
});

export default SoundButton;
