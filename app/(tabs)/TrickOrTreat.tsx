import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

// treat and trick options with paired audio and image assets
const treatOptions = [
  { sound: require('../../assets/treat.mp3'), image: require('../../assets/images/Anay.png') },
  { sound: require('../../assets/treat.mp3'), image: require('../../assets/images/Deborah.png') },
];
const trickOptions = [
  { sound: require('../../assets/augh.m4a'), image: require('../../assets/images/Joyce.png') },
  { sound: require('../../assets/augh.m4a'), image: require('../../assets/images/Joyce.png') },
];

export default function TrickOrTreat() {
  const [imageSource, setImageSource] = useState(require('../../assets/images/pumpkin.png'));
  const [loadedItems, setLoadedItems] = useState<{
    loadedSound: Audio.Sound;
    image: any;
  }[]>([]);

  // preload all sounds on mount
  useEffect(() => {
    let isActive = true;
    (async () => {
      const options = [...treatOptions, ...trickOptions];
      const results = await Promise.all(
        options.map(({ sound, image }) =>
          Audio.Sound.createAsync(sound, { shouldPlay: false }).then(({ sound: loadedSound }) => ({ loadedSound, image }))
        )
      );
      if (isActive) setLoadedItems(results);
    })();

    // unload on unmount
    return () => {
      isActive = false;
      loadedItems.forEach(({ loadedSound }) => {
        loadedSound.unloadAsync();
      });
    };
  }, []);

  // play random preloaded sound and show its image
  const playRandom = async () => {
    if (loadedItems.length === 0) return;
    const { loadedSound, image } = loadedItems[
      Math.floor(Math.random() * loadedItems.length)
    ];
    setImageSource(image);
    await loadedSound.replayAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trick or Treat!</Text>
      <TouchableOpacity onPress={playRandom} style={styles.button} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Give Me a Surprise!</Text>
      </TouchableOpacity>
      <Image source={imageSource} style={styles.image} />
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
    color: '#FFA500',
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.8)',
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
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});