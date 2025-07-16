// src/screens/registerpage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text,useWindowDimensions ,StyleSheet, Pressable, TextInput, Alert} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { TabView, TabBar } from 'react-native-tab-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 라이브러리 사용 (expo일 경우)
import { useNavigation} from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const Page1 = ({ onNext }: { onNext: () => void }) => {
  const [checkeA, setCheckeA] = React.useState(false);
  const [checke1, setChecke1] = React.useState(false);
  const [checke2, setChecke2] = React.useState(false);
  const [checke3, setChecke3] = React.useState(false);
  const [checke4, setChecke4] = React.useState(false);

  const agreements = [
    { id: 1, label: '[필수]이용약관 동의', required: true, state: checke1, setState: setChecke1 },
    { id: 2, label: '[필수]개인정보 처리방침 동의', required: true, state: checke2, setState: setChecke2 },
    { id: 3, label: '[선택]광고성 정보 수신 동의', required: false, state: checke3, setState: setChecke3 },
    { id: 4, label: '[선택]마케팅 활용 동의', required: false, state: checke4, setState: setChecke4 },
  ];

  const isChecked = checke1 && checke2;

   // ✅ 아래 4개가 모두 체크되면 "모두 동의"도 자동 체크
  useEffect(() => {
    const allChecked = checke1 && checke2 && checke3 && checke4;
    setCheckeA(allChecked);
  }, [checke1, checke2, checke3, checke4]);

   // ✅ "모두 동의" 체크 시 나머지 4개도 모두 체크/해제
  const handleCheckAll = () => {
    const newValue = !(checke1 && checke2 && checke3 && checke4);
    setCheckeA(newValue);
    setChecke1(newValue);
    setChecke2(newValue);
    setChecke3(newValue);
    setChecke4(newValue);
  };

  // ✅ 다음 버튼 클릭 시 체크된 값 전송 -> DB로
  const agreeValue1 = checke1 ? 1 : 0; // 전송 시 변환
  const agreeValue2 = checke2 ? 1 : 0; // 전송 시 변환
  const agreeValue3 = checke3 ? 1 : 0; // 전송 시 변환
  const agreeValue4 = checke4 ? 1 : 0; // 전송 시 변환

  return (
    
    <View style={styles.container}>
      <View style={{ height: 16 }} />
      <Text style={styles.title}>이용약관에 동의해주세요.</Text>
      <View style={{ height: 16 }} />
      <View style={styles.row}>
      <Checkbox
        status={checkeA ? 'checked' : 'unchecked'}
        onPress={handleCheckAll}
      />
      <Text style={styles.text}>모두 동의(선택 정보 포함)</Text>
      </View>
      <View style={styles.hr} />
       <>
        {agreements.map(({ id, label, state, setState }) => (
          <View key={id} style={styles.row}>
            <Checkbox
              status={state ? 'checked' : 'unchecked'}
              onPress={() => setState(!state)}
            />
            <Text style={styles.text}>{label}</Text>
          </View>
        ))}
      </>
      
      <View style={styles.bottomContainer}>
      <Pressable style={[styles.button, !isChecked && styles.buttonDisabled]}
        onPress={onNext}
        disabled={!isChecked}>
        <Text style={styles.buttonText}>다음</Text>
      </Pressable>
      </View>
    </View>
  );
};
const Page2 = ({ onNext }: { onNext: () => void }) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const isForm = name.trim() !== '' && phone.length === 11;

  // 이름: 영문/한글만 허용
  const handleName = (text: string) => {
    const filtered = text.replace(/[^ㄱ-ㅎ가-힣a-zA-Z\s]/g, '');
    setName(filtered);
  };

   // 전화번호: 숫자만 받고 자동 하이픈
  const handlePhone = (text: string) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '').slice(0, 11); // 11자리 제한
    setPhone(onlyNumbers);
  };

  // 화면 표시용 포맷팅 함수
  const formatPhone = (phone: string) => {
    if (phone.length < 4) return phone;
    if (phone.length < 8) return `${phone.slice(0, 3)}-${phone.slice(3)}`;
    return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 16 }} />
      <Text style={styles.title}>서비스 이용 및 본인확인을 위한 정보를 입력해주세요.</Text>
      <View style={{ height: 16 }} />
      <TextInput
        style={styles.input}
        placeholder="이름 입력"
        value={name}
        onChangeText={setName}
      />
      <View style={{ height: 16 }} />
      <TextInput
        style={styles.input}
        placeholder="전화번호 입력"
        value={formatPhone(phone)} // 표시할 때만 하이픈
        onChangeText={handlePhone}
        keyboardType="numeric"
        maxLength={13} // 010-1234-5678 기준
      />
      <View style={styles.bottomContainer}>
      <Pressable style={[styles.button, !isForm && styles.buttonDisabled]}
        onPress={onNext}
        disabled={!isForm}>
        <Text style={styles.buttonText}>다음</Text>
      </Pressable>
      </View>
    </View>
  );
};
const Page3 = ({ onNext }: { onNext: () => void }) => {
  const [id, setId] = useState('');

  const isForm = id.trim() !== '';

  return (
    <View style={styles.container}>
      <View style={{ height: 16 }} />
      <Text style={styles.title}>로그인에 사용할{'\n'}아이디를 입력해주세요.</Text>
      <View style={{ height: 16 }} />
      <TextInput
        style={styles.input}
        placeholder="아이디 (이메일) 입력"
        value={id}
        onChangeText={setId}
      />
      <View style={styles.bottomContainer}>
      <Pressable style={[styles.button, !isForm && styles.buttonDisabled]}
        onPress={onNext}
        disabled={!isForm}>
        <Text style={styles.buttonText}>다음</Text>
      </Pressable>
      </View>
    </View>
  );
};
const Page4 = () => {
  //페이지 이동을 위해
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [pwRe, setPwRe] = useState('');
  const [showPwRe, setShowPwRe] = useState(false);

  //여러 동작
   const handleSignUp = () => {
    //회원가입 완료 알림
    Alert.alert('회원가입이 완료되었습니다!');

    //로그인 페이지로 이동
    navigation.navigate('Login'); // 로그인 페이지로 이동
  };

  // 조건 검사
  const hasLetter = /[a-zA-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasMinLength = pw.length >= 8&& pwRe.length <= 20;

  const isForm =  hasLetter && hasNumber && hasMinLength&& pw==pwRe;

  return (
    <View style={styles.container}>
      <View style={{ height: 16 }} />
      <Text style={styles.title}>로그인에 사용할{'\n'}비밀번호를 입력해주세요.</Text>
      <View style={{ height: 16 }} />
      <View style={styles.inputWrapper}>
      <TextInput
        style={styles.inputpw}
        placeholder="비밀번호 입력"
        value={pw}
        onChangeText={setPw}
        secureTextEntry={!showPw}
      />
      <Pressable onPress={() => setShowPw(!showPw)}>
          <Ionicons
            name={showPw ? 'eye' : 'eye-off'}
            size={24}
            color="#666"
          />
        </Pressable>
      </View>
      <View style={styles.row}>
        <Text style={[styles.condition, hasLetter && styles.success]}>
          • 영문자 포함
        </Text>
        <Text style={[styles.condition, hasNumber && styles.success]}>
          • 숫자 포함
        </Text>
        <Text style={[styles.condition, hasMinLength && styles.success]}>
          • 8-20자 내외
        </Text>
      </View>
      <View style={{ height: 16 }} />
      <View style={styles.inputWrapper}>
      <TextInput
        style={styles.inputpw}
        placeholder="비밀번호 확인"
        value={pwRe}
        onChangeText={setPwRe}
        secureTextEntry={!showPwRe}
      />
      <Pressable onPress={() => setShowPwRe(!showPwRe)}>
          <Ionicons
            name={showPwRe ? 'eye' : 'eye-off'}
            size={24}
            color="#666"
          />
        </Pressable>
      </View>
      <View style={styles.bottomContainer}>
      <Pressable style={[styles.button, !isForm && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={!isForm}>
        <Text style={styles.buttonText}>다음</Text>
      </Pressable>
      </View>
    </View>
  );
};

export default function Memberaddpage() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'page1', title: '1' },
    { key: 'page2', title: '2' },
    { key: 'page3', title: '3' },
    { key: 'page4', title: '4' },
  ];

   const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'page1':
        return <Page1 onNext={() => setIndex(1)} />;
      case 'page2':
        return <Page2 onNext={() => setIndex(2)} />;
      case 'page3':
        return <Page3 onNext={() => setIndex(3)} />;
      case 'page4':
        return <Page4/>;
      default:
        return null;
    }
  };


  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      swipeEnabled={false}         // 스와이프 막기
      renderTabBar={(props) => (
        <TabBar
          {...props as any}
          onTabPress={(e) => {
            e.preventDefault(); // 🚫 탭 클릭 시 전환 막기
          }}
          indicatorStyle={{ backgroundColor: '#7386BF', height: 3 }}
          style={{ backgroundColor: 'white' }}
          labelStyle={{ color: '#7386BF', fontSize: 14 }}
        />
      )}
    />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#fff',
    paddingLeft: wp('5%'),paddingRight: wp('5%'),
  },
  title: {
    fontSize: 24, fontWeight: '600'
  },
  text:{
    fontSize: 18, color: '#333', fontWeight: '500'
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#7386BF',
    paddingVertical: hp('2%'),
    width: wp('80%'),            // 화면 너비의 80%
    alignSelf: 'center',         // 가운데 정렬
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',   // 텍스트 수직 중앙
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  bottomContainer: {
    marginTop: 'auto',          // 아래로 붙이기
    paddingBottom: hp('5%'),    // 하단 여백
    alignItems: 'center',       // ✅ 버튼을 가운데 정렬
    width: '100%',              // 💡 가운데 정렬을 위해 전체 너비 보장
  },
  row: {
    paddingBlockStart: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hr: {
    height: 2,
    backgroundColor: '#ccc', // 선 색
    width: '100%',
    marginVertical: 16,       // 위아래 간격
  },
  input: {
    width: '100%', // 또는 예: 300, 또는 flex: 1
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 20,
  },
   inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  inputpw: {
    flex: 1,
    height: 56,
    fontSize: 20,
  },
  condition: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
    paddingRight: 10,
  },
  success: {
    color: 'green',
    fontWeight: 'bold',
  },

});