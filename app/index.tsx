import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

const PlaySoundExample = () => {
  // Function to randomly play either treat or trick sound
  const playRandomSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      // Randomly choose treat or trick: 50/50 chance
      const isTreat = Math.random() < 0.5;
      if (isTreat) {
        await soundObject.loadAsync(require('../assets/treat.mp3'));
      } else {
        await soundObject.loadAsync(require('../assets/trick.mp3'));
      }
      await soundObject.playAsync();
      // Optionally, unload the sound after playback:
      // await soundObject.unloadAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boo!</Text>
      <TouchableOpacity onPress={playRandomSound} style={styles.button}>
        <Text style={styles.buttonText}>Give Me a Surprise!</Text>
      </TouchableOpacity>
      <Image source={require('../assets/pumpkin.png')} style={styles.image} />
    </View>
  );
};

export default PlaySoundExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#1A1A1D', // Dark background for a spooky vibe
  },
  title: {
    fontSize: 32,
    color: '#FFA500', // Pumpkin orange color
    fontWeight: 'bold',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  button: {
    backgroundColor: '#FF7518', // Pumpkin hue for the button
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: '#FFF',
    borderWidth: 2,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 20,
  },
});
