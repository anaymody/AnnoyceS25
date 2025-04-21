import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {

	return (
		<View style={styles.container}>
			<MaterialCommunityIcons
				name="ghost"
				size={80}
				color="#EDEDED"
				style={styles.icon}
			/>
			<Text style={styles.title}>Welcome to TrickOrTreat!</Text>
			<Text style={styles.subtitle}>
				Use the tabs below to get a treat or a trick 👻
			</Text>
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
	icon: {
		marginBottom: 20,
	},
	title: {
		fontSize: 28,
		color: '#EDEDED',
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: '#C5C6C7',
		textAlign: 'center',
	},
});