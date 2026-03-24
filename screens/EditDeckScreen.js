import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { updateDeck, deleteDeck } from "../services/api"; // Importing PUT and DELETE

const EditDeckScreen = ({ route, navigation }) => {
  const { deck } = route.params; // Get the deck data passed from HomeScreen
  const [name, setName] = useState(deck.name);
  const [colors, setColors] = useState(deck.colors);

  const handleUpdate = async () => {
    try {
      await updateDeck(deck._id, { name, colors }); // Triggering PUT
      Alert.alert("Success", "Deck updated in the Vault!");
      navigation.goBack();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = () => {
    // Add this log to see what is actually inside the deck object
    console.log("Deck Object Contents:", deck);

    Alert.alert("Delete Deck", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            // Verify if it is deck._id or just deck.id
            console.log("Sending ID to API:", deck._id);
            await deleteDeck(deck._id);
            navigation.goBack();
          } catch (error) {
            console.error("Delete failed:", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>EDIT DECK NAME</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>EDIT COLORS</Text>
      <TextInput style={styles.input} value={colors} onChangeText={setColors} />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>DELETE DECK</Text>
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
  saveButton: {
    backgroundColor: "#d4af37",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  saveButtonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  deleteButton: {
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff4444",
  },
  deleteButtonText: { color: "#ff4444", fontWeight: "bold" },
});

export default EditDeckScreen;
