import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, Dimensions, Button } from 'react-native';
import axios from 'axios';

// Interface for News Article
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

const apiKey = '0c12b9c4e22129f7407c6e82563539dd'; // Replace with your OpenWeather API key
const city = 'Syracuse'; // You can modify this to use dynamic location data

// WeatherInfo Component
const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning!';
    if (currentHour < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  // Get current day of the week
  const getDayOfWeek = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const greeting = getTimeBasedGreeting();
  const temperature = Math.round(weatherData?.main?.temp || 0);
  const weatherCondition = weatherData?.weather?.[0]?.description || 'N/A';
  const dayOfWeek = getDayOfWeek(); // Get the current day

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
        <Text style={styles.weatherTemp}>{`${temperature}°F`}</Text>
        <Text style={styles.weatherDetails}>{`${dayOfWeek}, ${weatherCondition}`}</Text>
      </View>
    </View>
  );
};

// NewsCard Component
const NewsCard = ({ title, imageUrl, description, publisher, publishedTime, onPress }: {
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

// Main App Component
const App = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleNewsCount, setVisibleNewsCount] = useState(10);
  const newsLimit = 10;

  // Fetch news data
  const fetchNews = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/everything?q=syracuse&apiKey=5464312f641a4026b26d9270ba361031'
      );
      setNews(response.data.articles);
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
    setVisibleNewsCount((prevCount) => prevCount + newsLimit);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Weather section */}
        <WeatherInfo />

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Maps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>DPS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>
        </View>

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
          <View style={styles.loadMoreContainer}>
            <View style={styles.loadMoreLine} />
            <Text style={styles.loadMoreText} onPress={loadMoreNews}>
              LOAD MORE
            </Text>
            <View style={styles.loadMoreLine} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    color: '#fff',
    padding: 0,
  },
  weatherContainer: {
    position: 'relative',
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  weatherImage: {
    width: Dimensions.get('window').width,
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
    marginVertical: 2,
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
    marginTop: 5,
    marginBottom: 5,
  },
  publisher: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  publishedTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FF5733',
    padding: 20,
    borderRadius: 5,
    // flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loadMoreLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  loadMoreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FAC898',
  },
});

export default App;