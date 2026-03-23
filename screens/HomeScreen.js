import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getDecks } from "../services/api"; // Importing  GET function

const HomeScreen = () => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    try {
      const response = await getDecks();
      setDecks(response.data);
    } catch (error) {
      console.error("Error fetching decks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My MTG Decks</Text>
      <FlatList
        data={decks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.deckItem}>
            <Text style={styles.deckName}>{item.name}</Text>
            <Text style={styles.deckDetails}>
              {item.colors} • {item.format}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  deckItem: {
    padding: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    marginBottom: 10,
  },
  deckName: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  deckDetails: { color: "#bbb", marginTop: 4 },
  loader: { flex: 1, justifyContent: "center" },
});

export default HomeScreen;
