import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import LoginForm from "../components/Account/LoginForm";
import UserData from "../components/Account/UserData";
import useAuth from "../hooks/useAuth";

export default function Account() {
  const { auth } = useAuth();
  return (
    <View>
      {auth ? <UserData /> : <LoginForm />}
    </View>
  );
}