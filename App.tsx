import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    if (!username || !password) {
      Alert.alert('아이디와 비밀번호를 입력하세요.');
      return;
    }
    Alert.alert('로그인 시도', `아이디: ${username}, 비밀번호: ${password}`);
  };

  const onExplorePress = () => {
    console.log('둘러보기 모드로 진입합니다!');
    // 예: navigation.navigate('MainScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <StatusBar style="light" />

      {/* 로고 */}
      <Image source={require('./assets/buona-title.png')} style={styles.logo} resizeMode="contain" />

      {/* 입력 박스 */}
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* 로그인 버튼 */}
        <Pressable
          onPress={onLoginPress}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </Pressable>

        {/* 링크들 */}
        <View style={styles.linksContainer}>
          <Text style={styles.linkText}>
            회원이 아니신가요? <Text style={styles.linkAction}>회원가입</Text>
          </Text>
          <Text style={styles.linkAction}>아이디/비밀번호를 잊으셨나요?</Text>
        </View>
      </View>

      {/* 둘러보기 버튼 */}
      <Pressable
        onPress={onExplorePress}
        style={({ pressed }) => [
          styles.exploreButton,
          pressed && styles.exploreButtonPressed,
        ]}
      >
        <Text style={styles.exploreButtonText}>로그인하지 않고 둘러보기</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7386BF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 220,
    height: 80,
    marginBottom: 30,
  },
  inputBox: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
  },
  button: {
    height: 50,
    backgroundColor: '#7386BF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonPressed: {
    backgroundColor: '#5f6ea3',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  linksContainer: {
    marginTop: 30,
    alignItems: 'center',
    gap: 28,
  },
  linkText: {
    fontSize: 14,
    color: '#333',
  },
  linkAction: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#000',
  },
  exploreButton: {
    marginTop: 25,
    paddingVertical: 14,
    paddingHorizontal: 22,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  exploreButtonPressed: {
    backgroundColor: '#c0c0c0',
  },
  exploreButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
