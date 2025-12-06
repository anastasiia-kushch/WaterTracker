import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { getColors } from '../styles/colors';
import Button from './BasicButton';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useMemo } from 'react';

function LogoutModal({ onClose }: { onClose: () => void }) {
  const navigation = useNavigation<any>();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: Colors.overlay,
          justifyContent: 'center',
          alignItems: 'center',
        },
        modal: {
          width: '80%',
          backgroundColor: Colors.white,
          borderRadius: 16,
          padding: 24,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 10,
        },
        title: {
          fontSize: 16,
          fontWeight: '700',
          color: Colors.black,
          marginBottom: 8,
        },
        message: {
          fontSize: 14,
          color: Colors.gray,
          textAlign: 'center',
          marginBottom: 28,
        },
        buttonsContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 12,
          width: '100%',
        },
      }),
    [Colors],
  );

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableOpacity onPress={e => e.stopPropagation()} activeOpacity={1}>
          <View style={styles.modal}>
            <Text style={styles.title}>Log out</Text>
            <Text style={styles.message}>
              Are you sure you want to log out? You'll need to login again to
              use the app.
            </Text>
            <View style={styles.buttonsContainer}>
              <Button type="secondary" onPress={onClose}>
                Cancel
              </Button>
              <Button
                type="primary"
                onPress={() => {
                  onClose();
                  navigation.navigate('Login');
                }}
              >
                Log Out
              </Button>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

export default LogoutModal;
