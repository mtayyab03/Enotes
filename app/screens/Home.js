import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { db } from "../../config";

//screen
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import Header from "../components/Header";
//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

export default function Home(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.collection("notes").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { note, title } = doc.data();
        users.push({
          id: doc.id,
          note,
          title,
        });
      });
      setUsers(users);
    });
  }, []);
  return (
    <Screen
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.white,
      }}
    >
      <Header name="Notes" />
      <View style={{ marginTop: RFPercentage(2) }} />
      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          {users.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("EditNote", { item });
              }}
              activeOpacity={0.7}
              style={{
                width: "90%",
                backgroundColor: Colors.lightWhite,
                paddingVertical: RFPercentage(2),
                borderRadius: RFPercentage(1),
                alignItems: "center",
                justifyContent: "center",
                marginTop: RFPercentage(2),
              }}
              key={index}
            >
              <Text
                style={{
                  color: Colors.blue,
                  fontFamily: FontFamily.semiBold,
                  fontSize: RFPercentage(2.2),
                }}
              >
                {item.title}
              </Text>
              <View style={{ marginTop: RFPercentage(1) }} />
              <Text
                style={{
                  color: Colors.textcolor,
                  fontFamily: FontFamily.medium,
                  fontSize: RFPercentage(1.6),
                }}
              >
                {item.note}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginTop: RFPercentage(4) }} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("AddNote");
        }}
        style={styles.loginbutton}
        activeOpacity={0.7}
      >
        <AppButton title="Add" buttonColor={Colors.blue} />
      </TouchableOpacity>
    </Screen>
  );
}
const styles = StyleSheet.create({
  loginbutton: {
    width: "100%",
    position: "absolute",
    bottom: RFPercentage(5),
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFPercentage(1),
  },
});
