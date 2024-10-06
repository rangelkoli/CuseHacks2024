import { View, Text, TextInput, Button, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Camera } from "expo-camera";
const CrimeReport = () => {
  const [crimeDescription, setCrimeDescription] = useState("");

  const submitCrimeReport = () => {
    // Logic to submit the crime report
    console.log("Crime report submitted:", crimeDescription);
  };

  return (
    <SafeAreaView>
      <Text>Crime Report Form</Text>
      <TextInput
        placeholder='Enter crime description'
        value={crimeDescription}
        onChangeText={setCrimeDescription}
      />

      <Button title='Submit' onPress={submitCrimeReport} />
    </SafeAreaView>
  );
};

export default CrimeReport;
