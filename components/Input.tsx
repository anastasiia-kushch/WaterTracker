import { TextInput, StyleSheet } from 'react-native';
import Colors from '../styles/colors';
import { useState } from 'react';

type InputProps = {
  placeholder?: string;
  secure?: boolean;
};

function Input({ placeholder, secure = false }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={Colors.gray}
      style={[styles.input, isFocused && styles.inputFocused]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      secureTextEntry={secure}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 15,

    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 12,

    fontFamily: 'Inter',
    fontSize: 16,
  },
  inputFocused: {
    borderColor: Colors.darkest,
  },
});

export default Input;
