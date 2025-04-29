import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';

// Separate trick and treat sounds
const trickSounds = [
  require('../../assets/augh.m4a'),
  require('../../assets/sad_violin.mp3'),
  require('../../assets/bruh.mp3'),
  require('../../assets/rickroll.mp3'),
];

const treatSounds = [
  
  require('../../assets/vine_boom.mp3'),
  require('../../assets/sparkles.mp3'),
  require('../../assets/tacobell.mp3'),
  require('../../assets/billnye.mp3'),
];

// Random images pool
const randomImages = [
  require('../../assets/images/Anay.png'),
  require('../../assets/images/Deborah.png'),
  require('../../assets/images/Joyce.png'),
  require('../../assets/images/Hallie.jpg'),
  require('../../assets/images/Gabby.jpg'),
  require('../../assets/images/Josh.jpg'),
  require('../../assets/images/Val.jpg'),
  require('../../assets/images/lebron_james.png'),
  require('../../assets/images/lebron_james_2.jpg'),
  require('../../assets/images/redekopp.png'),
  require('../../assets/images/scopeheart.png'),
  require('../../assets/images/billnye.png'),
  require('../../assets/images/anay_mog.png'),
  require('../../assets/images/bald_anay.png'),
  require('../../assets/images/bald_deborah.png'),
  require('../../assets/images/bald_josh.png'),
  require('../../assets/images/bald_joyce.png'),
  require('../../assets/images/bald_malachi.png'),
  require('../../assets/images/bald_ryan.png'),
  require('../../assets/images/bald_val.png'),
  require('../../assets/images/chris_eyes.png'),

  require('../../assets/images/Ayoub.jpg'),
  require('../../assets/images/Ellie.jpg'),
  require('../../assets/images/Jared.jpg'),
  require('../../assets/images/Joel.jpg'),
  require('../../assets/images/John.jpg'),
  require('../../assets/images/Malachi.jpg'),
  
  require('../../assets/images/Ryan.jpg'),
  require('../../assets/images/Luke.jpg'),
  require('../../assets/images/Max.jpg'),
  require('../../assets/images/Lucas.jpg'),
  require('../../assets/images/Ayoub.jpg')
];

export default function TrickOrTreat() {
  const router = useRouter();
  const [loadedTrickSounds, setLoadedTrickSounds] = useState<Audio.Sound[]>([]);
  const [loadedTreatSounds, setLoadedTreatSounds] = useState<Audio.Sound[]>([]);
  const [imageSource, setImageSource] = useState(require('../../assets/images/pumpkin.png'));

  // preload all sounds on mount
  useEffect(() => {
    let isActive = true;
    (async () => {
      const trickResults = await Promise.all(
        trickSounds.map(sound => Audio.Sound.createAsync(sound, { shouldPlay: false }).then(({ sound }) => sound))
      );
      const treatResults = await Promise.all(
        treatSounds.map(sound => Audio.Sound.createAsync(sound, { shouldPlay: false }).then(({ sound }) => sound))
      );
      if (isActive) {
        setLoadedTrickSounds(trickResults);
        setLoadedTreatSounds(treatResults);
      }
    })();

    return () => {
      isActive = false;
      [...loadedTrickSounds, ...loadedTreatSounds].forEach(sound => {
        sound.unloadAsync();
      });
    };
  }, []);

  // play random sound and show random image
  const playRandom = async () => {
    const allSounds = [...loadedTrickSounds, ...loadedTreatSounds];
    if (allSounds.length === 0) return;

    const randomSound = allSounds[Math.floor(Math.random() * allSounds.length)];
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

    setImageSource(randomImage);
    await randomSound.replayAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trick or Treat!</Text>
      <TouchableOpacity onPress={playRandom} style={styles.button} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Give Me a Surprise!</Text>
      </TouchableOpacity>

      <Image source={imageSource} style={styles.image} />

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
    marginBottom: 20,
  },
});
