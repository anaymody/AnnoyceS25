import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SoundButton from '../_components/_SoundButton'; 

export default function Sounds() {
  const buttons = [
   
    { id: '1', label: 'sparkles', soundFile: require('../../assets/sparkles.mp3') },
    { id: '2', label: 'tacobell', soundFile: require('../../assets/tacobell.mp3') },
    { id: '3', label: 'billnye', soundFile: require('../../assets/billnye.mp3') },
    { id: '4', label: 'augh', soundFile: require('../../assets/augh.m4a') },
    { id: '5', label: 'sad_violin', soundFile: require('../../assets/sad_violin.mp3') },
    { id: '6', label: 'bruh', soundFile: require('../../assets/bruh.mp3') },
    { id: '7', label: 'rickroll', soundFile: require('../../assets/rickroll.mp3') },
  ];
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="music-note"
          size={80}
          color="#EDEDED"
          style={styles.icon}
        />
        <Text style={styles.title}>Sounds</Text>
        <Text style={styles.subtitle}>
          Tap a button below to play a sound!
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map(({ id, label, soundFile }) => (
          <SoundButton
            key={id}
            label={label}
            soundFile={soundFile}
            size={70}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    color: '#EDEDED',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#C5C6C7',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
