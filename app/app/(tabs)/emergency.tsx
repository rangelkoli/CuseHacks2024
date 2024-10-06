import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText'; // Assuming you have this component

export default function EmergencyReportForm() {
  const [emergencyType, setEmergencyType] = useState('');
  const [description, setDescription] = useState('');
  const [isEmergencyTypeFocused, setIsEmergencyTypeFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const handleSubmit = () => {
    if (emergencyType === '' || description === '') {
      Alert.alert('Please fill in all fields.');
      return;
    }

    // Here you can handle the form submission, e.g., send data to an API
    Alert.alert('Emergency Report Submitted', `Type: ${emergencyType}\nDescription: ${description}`);
    
    // Reset the form fields
    setEmergencyType('');
    setDescription('');
    setIsEmergencyTypeFocused(false);
    setIsDescriptionFocused(false);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Report an Emergency</ThemedText>
      
      {/* Emergency Type Input */}
      <Text style={styles.label}>Emergency Type</Text>
      <TextInput
        style={styles.input}
        placeholder={isEmergencyTypeFocused ? '' : 'Enter Emergency Type'}
        placeholderTextColor="#A9A9A9" // Optional: Color for the placeholder text
        value={emergencyType}
        onChangeText={setEmergencyType}
        onFocus={() => setIsEmergencyTypeFocused(true)}
        onBlur={() => setIsEmergencyTypeFocused(false)}
      />
      
      {/* Description Input */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textArea}
        placeholder={isDescriptionFocused ? '' : 'Enter Description'}
        placeholderTextColor="#A9A9A9" // Optional: Color for the placeholder text
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        onFocus={() => setIsDescriptionFocused(true)}
        onBlur={() => setIsDescriptionFocused(false)}
      />
      
      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the container to fill the available space
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20,
  },
  title: {
    fontSize: 33, // Font size for the title
    fontWeight: 'bold', // Bold text
    color: '#FF5733', // Color of the title
    marginBottom: 20, // Space below the title
    textAlign: "left"
  },
  label: {
    alignSelf: 'flex-start', // Align label to the start
    marginBottom: 5, // Space between label and input
    fontSize: 16, // Font size for label
    color: '#999', // Color for label
    fontWeight: 'bold', // Bold label text
    width: '100%', // Ensure it fills the container width
    maxWidth: 400, // Optional: set a max width for the label
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10, // Rounded corners
    margin: 10,
    paddingHorizontal: 10,
    width: '100%', // Ensure it fills the container width
    maxWidth: 400, // Optional: set a max width for the input
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10, // Rounded corners
    margin: 10,
    paddingHorizontal: 10,
    width: '100%', // Ensure it fills the container width
    maxWidth: 400, // Optional: set a max width for the text area
  },
  submitButton: {
    backgroundColor: '#FF5733', // Button background color
    borderRadius: 10, // Rounded corners
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    alignItems: 'center', // Center the text horizontally
    marginTop: 10, // Space above the button
  },
  buttonText: {
    color: '#FFFFFF', // Text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },
});
