import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import ProgressCircle from '../components/ProgressCircle';
import Button from '../components/BasicButton';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../styles/colors';

import { useState } from 'react';
import AddCustomAmountModal from '../components/AddCustomAmountModal';
import { useUser } from '../hooks/useUser';

function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, isLoading, addLog } = useUser();

  const handleAdd = (amount: number) => {
    addLog(amount);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header type="main" />
      <View style={styles.circle}>
        <ProgressCircle amount={user.drunk} goal={user.goal} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button type="add" onPress={() => handleAdd(100)}>
          +100ml
        </Button>
        <Button type="add" onPress={() => handleAdd(200)}>
          +200ml
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button type="addCustom" onPress={() => setModalVisible(true)}>
          <Icon name="plus" size={28} color="white" />
        </Button>
      </View>
      <AddCustomAmountModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
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
