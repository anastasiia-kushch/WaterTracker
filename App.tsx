import { StyleSheet, View, Text } from 'react-native';
import BasicButton from './components/BasicButton';
import Icon from 'react-native-vector-icons/Feather';
import Input from './components/Input';
import ProgressCircle from './components/ProgressCircle';

function App() {
  return (
    <View style={styles.container}>
      <BasicButton type="primary">
        <Text>Login</Text>
      </BasicButton>

      <BasicButton type="secondary">
        <Text>Login</Text>
      </BasicButton>

      <BasicButton type="add">
        <Text>+100ml</Text>
      </BasicButton>

      <BasicButton type="addCustom">
        <Icon name="plus" size={22} color="#FFFFFF" />
      </BasicButton>

      <Input placeholder="Email" />
      <Input placeholder="Password" />

      <ProgressCircle amount={2500} goal={3000} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 150,
    padding: 16,
  },
});

export default App;
