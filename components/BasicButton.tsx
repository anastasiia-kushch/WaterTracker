import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../styles/colors';
import { ReactNode } from 'react';

type ButtonType = 'primary' | 'secondary' | 'add' | 'addCustom';

type ButtonProps = {
  type?: ButtonType;
  content?: string;
  children?: ReactNode;
};

function Button({ type = 'primary', children, content }: ButtonProps) {
  return (
    <Pressable style={({ pressed }) => getButtonStyle({ type, pressed })}>
      {({ pressed }) => {
        if (type === 'addCustom' || type === 'add') {
          // Apply text styles to children
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

// --------- STYLE FUNCTIONS ---------

interface StyleArgs {
  type: ButtonType;
  pressed?: boolean;
}

function getButtonStyle({ type, pressed }: StyleArgs) {
  switch (type) {
    case 'primary':
      return [
        styles.basicButton,
        styles.wideButton,
        {
          backgroundColor: pressed ? Colors.medium : Colors.darkest,
        },
      ];

    case 'secondary':
      return [
        styles.basicButton,
        styles.secondaryButton,
        styles.wideButton,
        {
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
}

function getTextStyle({ type, pressed }: StyleArgs) {
  switch (type) {
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
}

// --------- STYLE OBJECTS ---------

const styles = StyleSheet.create({
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
    borderRadius: '50%',
    width: 65,
    height: 65,
  },
});

export default Button;
