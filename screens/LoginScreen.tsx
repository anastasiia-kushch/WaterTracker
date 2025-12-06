import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/BasicButton';
import { getColors } from '../styles/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useMemo } from 'react';

function LoginScreen() {
  const navigation = useNavigation<any>();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        mainContainer: {
          flex: 1,
          backgroundColor: Colors.white,
        },
        container: {
          paddingHorizontal: 20,
        },
        welcomeText: {
          fontSize: 28,
          fontWeight: '700',
          marginTop: '40%',
          marginBottom: 24,
          color: Colors.black,
        },
        inputsContainer: {
          display: 'flex',
          gap: 16,
          marginBottom: 16,
        },
        reset: {
          color: Colors.darkest,
          marginBottom: 24,
          fontSize: 16,
          fontWeight: '600',
        },
        registerContainer: {
          marginTop: 16,
          marginBottom: 24,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 4,
        },
        text: {
          fontSize: 16,
          color: Colors.gray,
          textAlign: 'center',
        },
        separator: {
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.darkGray,
          marginBottom: 24,
        },
        googleButton: {
          backgroundColor: Colors.red,
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 16,
        },
      }),
    [Colors],
  );

  return (
    <View style={styles.mainContainer}>
      <Header type="settings" />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to WaterTrack!</Text>
        <View>
          <View style={styles.inputsContainer}>
            <Input placeholder="Email" />
            <Input placeholder="Password" />
          </View>
          <TouchableOpacity>
            <Text style={styles.reset}>Forgot password?</Text>
          </TouchableOpacity>
          <Button type="primary">Login</Button>
          <View style={styles.registerContainer}>
            <Text style={styles.text}>Not a member?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.reset}>Register now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <Text style={styles.text}>Or continue with</Text>
          <TouchableOpacity style={styles.googleButton}>
            <Icon name="google" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;
