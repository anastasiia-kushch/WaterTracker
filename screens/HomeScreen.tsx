import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import ProgressCircle from '../components/ProgressCircle';
import Button from '../components/BasicButton';
import Icon from 'react-native-vector-icons/Feather';

function HomeScreen() {
  return (
    <View>
      <Header type="main" />
      <View style={styles.circle}>
        <ProgressCircle amount={1500} goal={3000} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button type="add">+100ml</Button>
        <Button type="add">+200ml</Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button type="addCustom">
          <Icon name="plus" size={28} color="white" />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    marginTop: '40%',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 48,
    marginTop: 90,
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
});

export default HomeScreen;
