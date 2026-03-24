import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { createDeck } from "../services/api"; // Importing your POST function

const AddDeckScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [colors, setColors] = useState("");

  const handleSave = async () => {
    if (!name || !colors)
      return Alert.alert("Error", "Please fill in all fields.");

    try {
      await createDeck({ name, colors }); // Triggering POST
      Alert.alert("Success", "Deck added to the Vault!");
      navigation.goBack(); // Return to List
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>DECK NAME</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g. Eldrazi Unbound"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>COLORS</Text>
      <TextInput
        style={styles.input}
        value={colors}
        onChangeText={setColors}
        placeholder="e.g. Colorless"
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>SAVE DECK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#121212" },
  label: {
    color: "#d4af37",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#d4af37",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
});

export default AddDeckScreen;
