// app/Games.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


export default function Games() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('../_components/TrickOrTreat')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Trick or Treat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('../_components/_TapGame')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Tap Frenzy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('../_components/Facts')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Random Facts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('../_components/MatchingGame')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Matching</Text>
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
    padding: 20,
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
