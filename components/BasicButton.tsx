import { Pressable, StyleSheet, Text } from 'react-native';
import { getColors } from '../styles/colors';
import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type ButtonType = 'primary' | 'secondary' | 'add' | 'addCustom';

type ButtonProps = {
  type?: ButtonType;
  children?: ReactNode;
  onPress?: () => void;
};

function Button({ type = 'primary', children, onPress }: ButtonProps) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        basicButton: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          borderRadius: 12,
        },
        wideButton: {
          width: '100%',
        },
        secondaryButton: {
          backgroundColor: Colors.white,
          borderWidth: 1.5,
        },
        addButton: {
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderWidth: 2,
          borderRadius: 12,
        },
        textPrimary: {
          fontFamily: 'Inter',
          fontSize: 16,
          fontWeight: '600',
        },
        addCustomButton: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          width: 65,
          height: 65,
        },
      }),
    [Colors],
  );

  const getButtonStyle = ({ type: buttonType, pressed }: StyleArgs) => {
    switch (buttonType) {
      case 'primary':
        return [
          styles.basicButton,
          {
            paddingHorizontal: 40,
            backgroundColor: pressed ? Colors.medium : Colors.darkest,
          },
        ];
      case 'secondary':
        return [
          styles.basicButton,
          styles.secondaryButton,
          {
            paddingHorizontal: 40,
            borderColor: pressed ? Colors.medium : Colors.darkest,
          },
        ];
      case 'add':
        return [
          styles.basicButton,
          styles.addButton,
          {
            borderColor: pressed ? Colors.darkest : Colors.dark,
          },
        ];
      case 'addCustom':
        return [
          styles.addCustomButton,
          {
            backgroundColor: pressed ? Colors.dark : Colors.medium,
          },
        ];
      default:
        return styles.basicButton;
    }
  };

  const getTextStyle = ({ type: buttonType, pressed }: StyleArgs) => {
    switch (buttonType) {
      case 'primary':
        return [
          styles.textPrimary,
          {
            color: Colors.white,
          },
        ];
      case 'secondary':
        return [
          styles.textPrimary,
          {
            color: pressed ? Colors.medium : Colors.darkest,
          },
        ];
      case 'add':
        return [
          styles.textPrimary,
          {
            color: pressed ? Colors.darkest : Colors.dark,
          },
        ];
      default:
        return styles.textPrimary;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => getButtonStyle({ type, pressed })}
      onPress={onPress}
    >
      {({ pressed }) => {
        if (type === 'addCustom' || type === 'add') {
          return (
            <Text style={getTextStyle({ type, pressed })}>
              {typeof children === 'string' ? children : children}
            </Text>
          );
        }
        return <Text style={getTextStyle({ type, pressed })}>{children}</Text>;
      }}
    </Pressable>
  );
}

interface StyleArgs {
  type: ButtonType;
  pressed?: boolean;
}

export default Button;
