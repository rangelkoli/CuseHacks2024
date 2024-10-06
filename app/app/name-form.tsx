import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
} from "react-native";

const NameForm = ({
  handleSubmit,
}: {
  handleSubmit: (name: string) => void;
}) => {
  const [name, setName] = useState("");

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handlePress = () => {
    handleSubmit(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>NameForm</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter your name'
        value={name}
        onChangeText={handleNameChange}
      />
      <Button title='Submit' onPress={handlePress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    marginHorizontal: 16,
  },
});

export default NameForm;
