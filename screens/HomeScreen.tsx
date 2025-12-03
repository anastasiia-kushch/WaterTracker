import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import ProgressCircle from '../components/ProgressCircle';
import Button from '../components/BasicButton';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../styles/colors';
import { useEffect, useState } from 'react';
import { addLog, fetchUser } from '../api';
import AddCustomAmountModal from '../components/AddCustomAmountModal';

function HomeScreen() {
  const [data, setData] = useState({ drunk: 0, goal: 3000 });
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function load() {
      const userData = await fetchUser();
      setData(userData);
      setLoading(false);
    }
    load();
  }, []);

  async function handleAdd(amount: number) {
    try {
      const updatedUser = await addLog(amount);
      setData(updatedUser);
    } catch (e) {
      console.error('Failed to update:', e);
    }
  }

  if (loading) {
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
        <ProgressCircle amount={data.drunk} goal={data.goal} />
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
