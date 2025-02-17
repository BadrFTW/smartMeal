import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
      Introducing our innovative mobile app that crafts personalized meal plans just for you! By simply entering your age, weight, height, gender, body type, and health goal, our app generates a nutrition plan tailored to your unique needs. Whether you're aiming to lose weight, build muscle, or maintain a balanced diet, our smart algorithm ensures you receive meal recommendations that align perfectly with your lifestyle and aspirations. Start your journey toward a healthier you with a meal plan designed to help you achieve your goals! 📱🍎💪
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("mealPrep")}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Get a meal plan  </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MealPlansHistory")}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Your meals history hear </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  smallLogo: {
    width: 24,
    height: 24,
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    borderColor: "#4b91e2",
    borderWidth: 1,
    margin:10
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;