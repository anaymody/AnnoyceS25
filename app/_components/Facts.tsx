import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function RandomFact() {
  const router = useRouter();
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en', {
        headers: {
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error('Error fetching fact:', error);
      setFact('Could not load a useless fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Useless Fact</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" />
      ) : (
        <Text style={styles.factText}>{fact}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={fetchFact} activeOpacity={0.8}>
        <Text style={styles.buttonText}>New Fact</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('../(tabs)/Games')} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 20,
    textAlign: 'center',
  },
  factText: {
    fontSize: 20,
    color: '#FFF',
    marginVertical: 30,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FF7518',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
