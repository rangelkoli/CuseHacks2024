import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';

// Define an interface for the props
interface NewsCardProps {
  title: string;
  imageUrl: string;
  description: string;  
  onPress: () => void; // Define the type for the onPress function
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  imageUrl,
  description,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const WeatherInfo: React.FC = () => {
  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.weatherTemp}>96°F</Text> 
      <Text style={styles.weatherDetails}>Sunny, Monday</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  weatherTemp: {
    fontSize: 48, // Large font for temperature
    fontWeight: 'bold',
  },
  weatherDetails: {
    fontSize: 15, // Font size for weather details
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 2,
    marginHorizontal: 10,
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

// Example usage of NewsCard
const App = () => {
  const handleCardPress = () => {
    alert('Card pressed!');
  };

  const newsData = [
    {
      id: '1',
      title: 'Latest News Headline 1',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'This is a brief description of the news article 1.',
    },
    {
      id: '2',
      title: 'Latest News Headline 2',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'This is a brief description of the news article 2.',
    },
    {
      id: '3',
      title: 'Latest News Headline 3',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'This is a brief description of the news article 3.',
    },
    {
      id: '4',
      title: 'Latest News Headline 4',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'This is a brief description of the news article 4.',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}> {/* Increased padding for better visibility */}
      {/* Render the WeatherInfo component */}
      <WeatherInfo />

      {/* Use FlatList to render the news cards */}
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            imageUrl={item.imageUrl}
            description={item.description}
            onPress={handleCardPress}
          />
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </SafeAreaView>
  );
};

export default App;
