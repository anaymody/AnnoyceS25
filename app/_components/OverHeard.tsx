import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';

// List of all sounds
const sounds = [
  require('../../assets/overheard/lips.m4a'),
  require('../../assets/overheard/long schlong.m4a'),
  require('../../assets/overheard/mirror.m4a'),
  require('../../assets/overheard/Turn around.m4a'),
  require('../../assets/overheard/bed.m4a'),
  require('../../assets/overheard/jobs.m4a'),
  require('../../assets/overheard/juicy.m4a'),
  require('../../assets/overheard/race.m4a')
  
];

export default function OverHeard() {
  const router = useRouter();
  const [loadedSounds, setLoadedSounds] = useState<Audio.Sound[]>([]);

  // Preload sounds on mount
  useEffect(() => {
    let isActive = true;
    (async () => {
      const soundResults = await Promise.all(
        sounds.map(sound => Audio.Sound.createAsync(sound, { shouldPlay: false }).then(({ sound }) => sound))
      );
      if (isActive) {
        setLoadedSounds(soundResults);
      }
    })();

    return () => {
      isActive = false;
      loadedSounds.forEach(sound => {
        sound.unloadAsync();
      });
    };
  }, []);

  // Play a random sound
  const playRandom = async () => {
    if (loadedSounds.length === 0) return;

    const randomSound = loadedSounds[Math.floor(Math.random() * loadedSounds.length)];
    await randomSound.replayAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Over Heard In Scope</Text>

      <TouchableOpacity onPress={playRandom} style={styles.button} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Play a Sound</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('../(tabs)/Games')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1D',
  },
  title: {
    fontSize: 32,
    color: 'rgb(69, 40, 147)',
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: 'rgb(69, 40, 147)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  button: {
    backgroundColor: '#FF7518',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
