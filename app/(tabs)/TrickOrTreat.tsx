import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

// treat and trick options with paired audio and image assets
const treatOptions = [
  { sound: require('../../assets/treat.mp3'), image: require('../../assets/images/Anay.png') },
  { sound: require('../../assets/vine_boom.mp3'), image: require('../../assets/images/Deborah.png') },
  { sound: require('../../assets/vine_boom.mp3'), image: require('../../assets/images/Joyce.png') },
  { sound: require('../../assets/vine_boom.mp3'), image: require('../../assets/images/Hallie.jpg') },
  { sound: require('../../assets/sparkles.mp3'), image: require('../../assets/images/Gabby.jpg') },
  { sound: require('../../assets/sparkles.mp3'), image: require('../../assets/images/Josh.jpg') },
  { sound: require('../../assets/tacobell.mp3'), image: require('../../assets/images/Val.jpg') },
  { sound: require('../../assets/treat.mp3'), image: require('../../assets/images/lebron_james.png') },
  { sound: require('../../assets/tacobell.mp3'), image: require('../../assets/images/lebron_james_2.jpg') },
  { sound: require('../../assets/sparkles.mp3'), image: require('../../assets/images/redekopp.png') },
  { sound: require('../../assets/treat.mp3'), image: require('../../assets/images/scopeheart.png') },
  { sound: require('../../assets/billnye.mp3'), image: require('../../assets/images/billnye.png') },
].map(item => ({ ...item, type: 'treat' as const }));

const trickOptions = [
  { sound: require('../../assets/augh.m4a'), image: require('../../assets/images/anay_mog.png') },
  { sound: require('../../assets/sad_violin.mp3'), image: require('../../assets/images/bald_anay.png') },
  { sound: require('../../assets/bruh.mp3'), image: require('../../assets/images/bald_deborah.png') },
  { sound: require('../../assets/rickroll.mp3'), image: require('../../assets/images/bald_josh.png') },
  { sound: require('../../assets/augh.m4a'), image: require('../../assets/images/bald_joyce.png') },
  { sound: require('../../assets/sad_violin.mp3'), image: require('../../assets/images/bald_malachi.png') },
  { sound: require('../../assets/bruh.mp3'), image: require('../../assets/images/bald_ryan.png') },
  { sound: require('../../assets/rickroll.mp3'), image: require('../../assets/images/bald_val.png') },
  { sound: require('../../assets/augh.m4a'), image: require('../../assets/images/chris_eyes.png') },
].map(item => ({ ...item, type: 'trick' as const }));

type Item = {
  loadedSound: Audio.Sound;
  image: any;
  type: 'treat' | 'trick';
};

export default function TrickOrTreat() {
  const [imageSource, setImageSource] = useState(require('../../assets/images/pumpkin.png'));
  const [loadedItems, setLoadedItems] = useState<Item[]>([]);
  const [treatCount, setTreatCount] = useState(0);
  const [trickCount, setTrickCount] = useState(0);

  // preload all sounds on mount
  useEffect(() => {
    let isActive = true;

    (async () => {
      const options = [...treatOptions, ...trickOptions];
      const results = await Promise.all(
        options.map(({ sound, image, type }) =>
          Audio.Sound.createAsync(sound, { shouldPlay: false })
            .then(({ sound: loadedSound }) => ({ loadedSound, image, type }))
        )
      );
      if (isActive) setLoadedItems(results);
    })();

    return () => {
      isActive = false;
      loadedItems.forEach(({ loadedSound }) => {
        loadedSound.unloadAsync();
      });
    };
  }, []);

  // play random preloaded sound, show its image, and update the appropriate counter
  const playRandom = async () => {
    if (loadedItems.length === 0) return;

    const { loadedSound, image, type } = loadedItems[
      Math.floor(Math.random() * loadedItems.length)
    ];

    setImageSource(image);
    await loadedSound.replayAsync();

    if (type === 'treat') {
      setTreatCount(count => count + 1);
    } else {
      setTrickCount(count => count + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trick or Treat!</Text>

      <View style={styles.counters}>
        <View style={[styles.counterBox, styles.treatBox]}>
          <Text style={styles.counterLabel}>🎁 Treats</Text>
          <Text style={styles.counterValue}>{treatCount}</Text>
        </View>
        <View style={[styles.counterBox, styles.trickBox]}>
          <Text style={styles.counterLabel}>👻 Tricks</Text>
          <Text style={styles.counterValue}>{trickCount}</Text>
        </View>
      </View>


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
  counters: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 20, // gap between counters (for React Native 0.71+)
  },
  counterBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  treatBox: {
    backgroundColor: '#FFA500', // orange
  },
  trickBox: {
    backgroundColor: '#800080', // purple
  },
  counterLabel: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  counterValue: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
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