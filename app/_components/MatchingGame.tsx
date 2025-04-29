import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

// All images
const images = [
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

// Duplicate and shuffle images
const prepareCards = () => {
	const shuffledImages = [...images].sort(() => Math.random() - 0.5); // randomize
	const selectedImages = shuffledImages.slice(0, 8); // pick 8 random unique ones
	const cards = [...selectedImages, ...selectedImages] // duplicate for pairs
	  .map((image, index) => ({
		id: index.toString(),
		image,
		isFlipped: false,
		isMatched: false
	  }))
	  .sort(() => Math.random() - 0.5); // shuffle pairs
	return cards;
  };

export default function MatchingGame() {
  const router = useRouter();
  const [cards, setCards] = useState(prepareCards());
  const [firstCard, setFirstCard] = useState<any>(null);
  const [secondCard, setSecondCard] = useState<any>(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setWon(true);
    }
  }, [cards]);

  const handleCardPress = (card: any) => {
    if (lockBoard || card.isFlipped || card.isMatched) return;

    const flippedCard = { ...card, isFlipped: true };
    const newCards = cards.map(c => (c.id === card.id ? flippedCard : c));
    setCards(newCards);

    if (!firstCard) {
      setFirstCard(flippedCard);
    } else if (!secondCard) {
      setSecondCard(flippedCard);
      setLockBoard(true);

      if (firstCard.image === flippedCard.image) {
        // It's a match
        const updatedCards = newCards.map(c =>
          c.image === flippedCard.image ? { ...c, isMatched: true } : c
        );
        setCards(updatedCards);
        resetTurn();
      } else {
        // Not a match
        setTimeout(() => {
          const resetCards = updatedCards(newCards, [firstCard.id, flippedCard.id]);
          setCards(resetCards);
          resetTurn();
        }, 1000);
      }
    }
  };

  const updatedCards = (cardsArray: any[], ids: string[]) => {
    return cardsArray.map(c =>
      ids.includes(c.id) ? { ...c, isFlipped: false } : c
    );
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
  };

  const restartGame = () => {
    setCards(prepareCards());
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
    setWon(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Match</Text>

      {won && (
        <Text style={styles.winText}>You Win!</Text>
      )}

      <View style={styles.grid}>
        {cards.map(card => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => handleCardPress(card)}
            activeOpacity={0.8}
          >
            {card.isFlipped || card.isMatched ? (
              <Image source={card.image} style={styles.image} />
            ) : (
              <View style={styles.cardBack} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={restartGame} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>

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

const cardSize = (screenWidth - 60) / 4; // 4 cards per row

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#FFA500',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  winText: {
    fontSize: 24,
    color: '#00FF00',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: screenWidth,
    marginBottom: 20,
  },
  card: {
    width: cardSize,
    height: cardSize,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardBack: {
    backgroundColor: '#555',
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FF7518',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
