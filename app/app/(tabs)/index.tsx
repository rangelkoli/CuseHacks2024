import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, Dimensions, Button } from 'react-native';
import axios from 'axios';


interface NewsArticle {
  url: string;
  title: string;
  urlToImage: string;
  description: string;
  source: {
    name: string;
  };
  publishedAt: string;
}


const NewsCard = ({ title, imageUrl, description, publisher, publishedTime, onPress }:{
  title: string;
  imageUrl: string;
  description: string;
  publisher: string;
  publishedTime: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
    </View>
    <View style={styles.content}>
      <Text style={styles.title}>{title ?? 'No Title Available'}</Text>
      <Text style={styles.description}>{description ?? 'No Description Available'}</Text>
      <Text style={styles.publisher}>{publisher ?? 'Unknown'}</Text>
      <Text style={styles.publishedTime}>{publishedTime ?? 'Unknown time'}</Text>
    </View>
  </TouchableOpacity>
);

const getTimeBasedGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Good Morning!';
  if (currentHour < 18) return 'Good Afternoon!';
  return 'Good Evening!';
};

const WeatherInfo = () => {
  const greeting = getTimeBasedGreeting();

  return (
    <View style={styles.weatherContainer}>
      <Image
        source={{
          uri: 'https://www.syracuse.edu/images/T_ZJPJZaFZ9RXChaDUT3mGnN34M=/2601/width-1300/3966-Aerial_photograph_of_Syracuse_University_campus_on_a_blue_sky_autumn_day.',
        }}
        style={styles.weatherImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.greetingText}>{greeting}</Text>
        <Text style={styles.weatherTemp}>96°F</Text>
        <Text style={styles.weatherDetails}>Sunny, Monday</Text>
      </View>
    </View>
  );
};

const App = () => {
  const [news, setNews] = useState<NewsArticle[]>([]); // Store news articles
  const [loading, setLoading] = useState(true);
  const [visibleNewsCount, setVisibleNewsCount] = useState(10); // Number of visible news articles
  const newsLimit = 10; // Limit for loading more news articles

  // Fetch news data from the API
  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=syracuse&apiKey=5464312f641a4026b26d9270ba361031`
      );
      setNews(response.data.articles); // Store all articles
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCardPress = () => {
    alert('Card pressed!');
  };

  const loadMoreNews = () => {
    setVisibleNewsCount((prevCount) => prevCount + newsLimit); // Load more articles
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Weather section */}
        <WeatherInfo />
        <Text style={styles.headerText}>What's up in Cuse</Text>

        {/* News section */}
        {news.slice(0, visibleNewsCount).map((item) => (
          <NewsCard
            key={item.url}
            title={item.title}
            imageUrl={item.urlToImage}
            description={item.description}
            publisher={item.source.name}
            publishedTime={new Date(item.publishedAt).toLocaleString()}
            onPress={handleCardPress}
          />
        ))}

        {/* Load More Button */}
        {visibleNewsCount < news.length && (
          <Button title="Load More" onPress={loadMoreNews} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 0, // No padding for the scroll container
  },
  weatherContainer: {
    position: 'relative',
    marginTop: 50, // Increased margin to avoid the notch
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  weatherImage: {
    width: Dimensions.get('window').width, // Set image width to screen width dynamically
    height: 300,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5733',
    marginBottom: 10,
  },
  weatherTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#999',
  },
  weatherDetails: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    width: '100%', // Set image width to full width for news cards
    height: 200,
    borderRadius: 8,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  publisher: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  publishedTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    color: '#333',
  },
});

export default App;
