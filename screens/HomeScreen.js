import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getDecks } from "../services/api"; //

const HomeScreen = ({ navigation }) => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadDecks();
    }
  }, [isFocused]);

  const loadDecks = async () => {
    try {
      const response = await getDecks(); // GET method implementation
      setDecks(response.data);
    } catch (error) {
      console.error("Error fetching decks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <ActivityIndicator size="large" color="#d4af37" style={styles.loader} />
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={decks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deckItem}
            onPress={() => navigation.navigate("EditDeck", { deck: item })}
          >
            <View>
              <Text style={styles.deckName}>{item.name}</Text>
              <Text style={styles.deckDetails}>
                {item.colors} • Tap to Edit
              </Text>
            </View>
            {/* Using {'>'} ensures the JSX parser doesn't see it as a tag bracket */}
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddDeck")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#121212" },
  deckItem: {
    padding: 20,
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#d4af37",
  },
  deckName: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  deckDetails: {
    color: "#888",
    marginTop: 4,
    fontSize: 12,
    textTransform: "uppercase",
  },
  arrow: { color: "#d4af37", fontSize: 20, fontWeight: "bold" },
  loader: { flex: 1, justifyContent: "center", backgroundColor: "#121212" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#d4af37",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: { fontSize: 30, color: "#000", fontWeight: "bold" },
});

export default HomeScreen;
