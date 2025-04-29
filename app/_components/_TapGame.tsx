import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av'; // <<< Add this

const { width, height } = Dimensions.get('window');

// import the sound file
const soundFile = require('../../assets/hehe.m4a'); // <<< Make sure the path is correct!

export default function MiniGame() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: height / 2, left: width / 2 });
  const [sound, setSound] = useState<Audio.Sound | null>(null); // <<< Add this

  // preload the sound
  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { sound } = await Audio.Sound.createAsync(soundFile, { shouldPlay: false });
      if (isMounted) {
        setSound(sound);
      }
    })();

    return () => {
      isMounted = false;
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // countdown timer
  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
      return;
    }
    const timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  const handleTap = async () => {
    if (!gameOver) {
      setCount(prev => prev + 1);
      moveButtonRandomly();
      if (sound) {
        await sound.replayAsync(); // <<< Play the sound on tap
      }
    }
  };

  const moveButtonRandomly = () => {
    const buttonSize = 100; // approximate button size
    const padding = 50; // prevent it from being too close to edges

    const randomLeft = Math.random() * (width - buttonSize - padding * 2) + padding;
    const randomTop = Math.random() * (height - buttonSize - padding * 2) + padding;

    setButtonPosition({ top: randomTop, left: randomLeft });
  };

  const resetGame = () => {
    setCount(0);
    setTimeLeft(10);
    setGameOver(false);
    setButtonPosition({ top: height / 2, left: width / 2 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap Frenzy!</Text>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>

      {!gameOver && (
        <TouchableOpacity
          style={[
            styles.tapButton,
            { top: buttonPosition.top, left: buttonPosition.left },
          ]}
          onPress={handleTap}
          activeOpacity={0.8}
        >
          <Text style={styles.tapText}>Tap Me!</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.score}>Score: {count}</Text>

      {gameOver && (
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.resetButton} onPress={resetGame} activeOpacity={0.8}>
            <Text style={styles.resetText}>Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => router.push('../(tabs)/Games')}
            activeOpacity={0.8}
          >
            <Text style={styles.resetText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFA500',
    textAlign: 'center',
    marginTop: 20,
  },
  timer: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 10,
  },
  tapButton: {
    position: 'absolute',
    backgroundColor: '#FF7518',
    padding: 20,
    borderRadius: 50,
  },
  tapText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  score: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    width: 200,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#FFA500',
    marginBottom: 10,
  },
  resetText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1D',
  },
});
