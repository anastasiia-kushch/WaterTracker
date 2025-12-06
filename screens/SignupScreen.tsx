import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState, useMemo } from 'react';
import Header from '../components/Header';
import { Text } from 'react-native-gesture-handler';
import { getColors } from '../styles/colors';
import Input from '../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/BasicButton';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function Checkbox({
  checked,
  onChange,
  Colors,
  checkboxStyle,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  Colors: any;
  checkboxStyle: any;
}) {
  return (
    <TouchableOpacity onPress={() => onChange(!checked)} style={checkboxStyle}>
      <Icon
        name={checked ? 'check-square' : 'square'}
        size={20}
        color={checked ? Colors.darkest : '#999'}
      />
    </TouchableOpacity>
  );
}

function SignupScreen() {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        mainContainer: {
          flex: 1,
          backgroundColor: Colors.white,
        },
        container: {
          paddingHorizontal: 20,
        },
        label: {
          fontSize: 14,
          fontWeight: '700',
          paddingHorizontal: 4,
          paddingBottom: 8,
          color: Colors.black,
        },
        inputGroup: {
          marginBottom: 16,
        },
        privacyContainer: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 12,
          marginVertical: 24,
        },
        checkboxContainer: {
          padding: 4,
          marginTop: 2,
        },
        passwordInputs: {
          gap: 16,
        },
        privacyText: {
          fontSize: 14,
          color: Colors.darkGray,
          flex: 1,
          lineHeight: 20,
        },
        link: {
          color: Colors.darkest,
          fontWeight: '600',
        },
      }),
    [Colors],
  );

  return (
    <View style={styles.mainContainer}>
      <Header type="signup" />
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <Input placeholder="Full Name" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <Input placeholder="name@emmail.com" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordInputs}>
            <Input placeholder="Create a password" secure={true} />
            <Input placeholder="Confirm a password" secure={true} />
          </View>
        </View>
        <View style={styles.privacyContainer}>
          <Checkbox
            checked={privacyAccepted}
            onChange={setPrivacyAccepted}
            Colors={Colors}
            checkboxStyle={styles.checkboxContainer}
          />
          <Text style={styles.privacyText}>
            I've read and agree with the
            <TouchableOpacity>
              <Text style={styles.link}> Terms and Conditions</Text>
            </TouchableOpacity>{' '}
            and the
            <TouchableOpacity>
              <Text style={styles.link}> Privacy Policy</Text>
            </TouchableOpacity>
            .
          </Text>
        </View>
        <Button type="primary">Sign Up</Button>
      </View>
    </View>
  );
}

export default SignupScreen;
