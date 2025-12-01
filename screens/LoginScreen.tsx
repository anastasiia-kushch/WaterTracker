import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/BasicButton';
import Colors from '../styles/colors';
import Icon from 'react-native-vector-icons/AntDesign';

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Header type="settings" />
      <Text>Welcome to WaterTrack!</Text>
      <View>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <TouchableOpacity>Forgot password?</TouchableOpacity>
        <Button type="primary">Login</Button>
        <Text>
          Not a member?
          <TouchableOpacity>
            <Text>Register now</Text>
          </TouchableOpacity>
        </Text>
        <View style={styles.separator} />
        <Text>Or continue with</Text>
        <Button type="addCustom">
          <Icon name="google" size={24} color="white" />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
});

export default LoginScreen;
