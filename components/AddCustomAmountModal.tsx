import React, { useState, useMemo } from 'react';
import { Modal, View, Text, TextInput, StyleSheet } from 'react-native';
import { getColors } from '../styles/colors';
import Button from './BasicButton';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type AddCustomAmountModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (amount: number) => void;
};

function AddCustomAmountModal({
  visible,
  onClose,
  onAdd,
}: AddCustomAmountModalProps) {
  const [value, setValue] = useState('');
  const theme = useSelector((state: RootState) => state.theme.theme);
  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flex: 1,
          backgroundColor: Colors.overlay,
          justifyContent: 'center',
          alignItems: 'center',
        },
        modalContent: {
          width: '80%',
          backgroundColor: Colors.white,
          padding: 20,
          borderRadius: 16,
        },
        title: {
          fontSize: 18,
          marginBottom: 10,
          color: Colors.black,
        },
        input: {
          borderWidth: 1,
          borderColor: Colors.lightGray,
          borderRadius: 10,
          padding: 10,
          marginBottom: 20,
          fontSize: 18,
          color: Colors.black,
        },
        buttonsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      }),
    [Colors],
  );

  const handleAdd = () => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      onAdd(num);
      setValue('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.wrapper}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Enter custom amount (ml)</Text>

          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="e.g. 150"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor={Colors.gray}
          />

          <View style={styles.buttonsContainer}>
            <Button type="secondary" onPress={onClose}>
              Cancel
            </Button>
            <Button type="primary" onPress={handleAdd}>
              Add
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddCustomAmountModal;
