// src/screens/registerpage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RegisterPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>회원가입 페이지입니다</Text>
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
  },
  text: {
    fontSize: 24, fontWeight: 'bold'
  }
});
