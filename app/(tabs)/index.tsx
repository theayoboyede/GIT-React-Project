import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayoboyede's App</Text>

      <Text style={styles.subtitle}>First React Native project 🚀</Text>

      <Pressable style={styles.button} onPress={() => alert("Button pressed")}>
        <Text style={styles.buttonText}>Tap Me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
