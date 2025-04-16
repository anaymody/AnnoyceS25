import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

// Define the type for the challenge
type Challenge = {
  type: 'treat' | 'trick';
  message: string;
};

const challenges: Challenge[] = [
  { type: 'treat', message: 'You got a cute cat GIF!' },
  { type: 'treat', message: 'You won a mini-game!' },
  { type: 'trick', message: 'Boo! Jump scare!' },
  { type: 'trick', message: 'Here’s a tricky riddle: What has keys but can’t open locks?' },
];

// Function to get a random challenge
function getRandomChallenge(): Challenge {
  const randomIndex = Math.floor(Math.random() * challenges.length);
  return challenges[randomIndex];
}

const Index = () => {
  // Explicitly typing the state as Challenge or null
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const handleDoorTap = () => {
    const randomChallenge = getRandomChallenge();
    setChallenge(randomChallenge);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={handleDoorTap}
        style={{ padding: 20, backgroundColor: 'gray' }}>
        <Text style={{ color: 'white' }}>Tap the Door!</Text>
      </TouchableOpacity>
      {challenge && (
        <View style={{ marginTop: 20 }}>
          <Text>{challenge.message}</Text>
        </View>
      )}
    </View>
  );
};

export default Index;
