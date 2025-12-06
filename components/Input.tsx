import { TextInput, StyleSheet } from 'react-native';
import { getColors } from '../styles/colors';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type InputProps = {
  placeholder?: string;
  secure?: boolean;
};

function Input({ placeholder, secure = false }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        input: {
          width: '100%',
          padding: 15,
          borderWidth: 1,
          borderColor: Colors.gray,
          borderRadius: 12,
          fontFamily: 'Inter',
          fontSize: 16,
          color: Colors.black,
        },
        inputFocused: {
          borderColor: Colors.darkest,
        },
      }),
    [Colors],
  );

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

export default Input;
