import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import ProgressCircle from '../components/ProgressCircle';
import Button from '../components/BasicButton';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../styles/colors';

import { useState, useEffect, useRef } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import AddCustomAmountModal from '../components/AddCustomAmountModal';
import { useUser } from '../hooks/useUser';

function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, isLoading, addLog } = useUser();
  const prevDrunk = useRef(user.drunk);

  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    if (user.drunk !== prevDrunk.current) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      prevDrunk.current = user.drunk;
    }
  }, [user.drunk]);

  const handleAdd = async (amount: number) => {
    await addLog(amount);
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
        <Button type="add" onPress={async () => await handleAdd(100)}>
          +100ml
        </Button>
        <Button type="add" onPress={async () => await handleAdd(200)}>
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
        onAdd={async amount => {
          await handleAdd(amount);
          setModalVisible(false);
        }}
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
