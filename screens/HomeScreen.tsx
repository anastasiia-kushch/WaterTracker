import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import ProgressCircle from '../components/ProgressCircle';
import Button from '../components/BasicButton';
import Icon from 'react-native-vector-icons/Feather';
import { getColors } from '../styles/colors';
import AddCustomAmountModal from '../components/AddCustomAmountModal';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useUser } from '../hooks/useUser';

const MemoProgressCircle = React.memo(ProgressCircle);

function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const drunk = useSelector((state: RootState) => state.user.drunk);
  const goal = useSelector((state: RootState) => state.user.goal);
  const isLoading = useSelector(
    (state: RootState) => state.user.status === 'loading',
  );
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { addLog } = useUser();

  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        loading: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.white,
        },
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
      }),
    [Colors],
  );

  const handleAdd = useCallback(
    async (amount: number) => {
      await addLog(amount);
    },
    [addLog],
  );

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header type="main" />
      <View style={styles.circle}>
        <MemoProgressCircle amount={drunk} goal={goal} />
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
        onAdd={async amount => {
          await handleAdd(amount);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

export default HomeScreen;
