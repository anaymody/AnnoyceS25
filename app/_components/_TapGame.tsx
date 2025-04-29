import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function MiniGame() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  // countdown timer
  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
      return;
    }
    const timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  const handleTap = () => {
    if (!gameOver) {
      setCount(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setCount(0);
    setTimeLeft(10);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap Frenzy!</Text>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>

      <TouchableOpacity
        style={[styles.tapButton, gameOver && styles.disabled]}
        onPress={handleTap}
        disabled={gameOver}
        activeOpacity={0.8}
      >
        <Text style={styles.tapText}>Tap Me!</Text>
      </TouchableOpacity>

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1D',
    padding: 20,
  },
  button: {
    backgroundColor: '#FF7518',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 10,
  },
  timer: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
  },
  tapButton: {
    backgroundColor: '#FF7518',
    padding: 20,
    borderRadius: 50,
    marginVertical: 20,
  },
  disabled: {
    backgroundColor: '#555',
  },
  tapText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  score: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 20,
  },
  resetButton: {
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
