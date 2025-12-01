import { Text, View } from 'react-native';
import Header from '../components/Header';
import ProgressCircle from '../components/ProgressCircle';
import Button from '../components/BasicButton';

function HomeScreen() {
  return (
    <View>
      {/* ВСТАВЛЯЕМ ЗАГОЛОВОК */}
      <Header type="main" />

      <ProgressCircle amount={1500} goal={3000} />
      <View>
        <Button type="add">
          <Text>+100ml</Text>
        </Button>
        <Button type="add">
          <Text>+200ml</Text>
        </Button>
      </View>
      <Button type="addCustom">
        <Text>+Custom</Text>
      </Button>
    </View>
  );
}

export default HomeScreen;
