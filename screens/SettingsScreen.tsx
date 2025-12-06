import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import { getColors } from '../styles/colors';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';
import { fetchUser } from '../api';
import Button from '../components/BasicButton';

export default function SettingsScreen() {
  const [data, setData] = useState({
    userName: 'Loading...',
    nickName: 'Loading...',
  });
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: Colors.white,
        },
        userSection: {
          alignItems: 'center',
          marginTop: '20%',
          marginBottom: 30,
          position: 'relative',
        },
        userName: {
          fontSize: 18,
          fontWeight: '700',
          marginBottom: 2,
          color: Colors.black,
        },
        editIcon: {
          backgroundColor: Colors.darkest,
          width: 22,
          height: 22,
          borderRadius: 11,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: '30%',
          top: '15%',
        },
        userHandle: {
          fontSize: 14,
          color: Colors.gray,
          marginTop: 4,
        },
        list: {
          marginHorizontal: 20,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: Colors.white,
        },
        item: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 18,
          paddingHorizontal: 10,
        },
        itemBorder: {
          borderBottomWidth: 1,
          borderBottomColor: Colors.lightGray,
        },
        itemText: {
          fontSize: 16,
          color: Colors.black,
        },
        buttonContainer: {
          marginTop: 40,
          marginHorizontal: 20,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: Colors.white,
        },
      }),
    [Colors],
  );

  useEffect(() => {
    async function load() {
      try {
        const userData = await fetchUser();
        setData(userData);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    }
    load();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header type="settings" />
      <View style={styles.userSection}>
        <Text style={styles.userName}>{data.userName}</Text>
        <View style={styles.editIcon}>
          <Icon name="edit-3" size={14} color={Colors.white} />
        </View>
        <Text style={styles.userHandle}>{data.nickName}</Text>
      </View>

      <View style={styles.list}>
        <SettingItem title="Set goal" styles={styles} Colors={Colors} />
        <SettingItem title="History" styles={styles} Colors={Colors} />
        <SettingItem title="Notifications" styles={styles} Colors={Colors} />
        <SettingItem title="Language" styles={styles} Colors={Colors} />
        <SettingItem
          title="Privacy & Security"
          isLast
          styles={styles}
          Colors={Colors}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button type="secondary" onPress={() => dispatch(toggleTheme())}>
          {theme === 'light' ? '🌞 Light mode' : '🌚 Dark mode'}
        </Button>
      </View>
    </ScrollView>
  );
}

type SettingItemProps = {
  title: string;
  isLast?: boolean;
  styles: any;
  Colors: any;
};

function SettingItem({ title, isLast, styles, Colors }: SettingItemProps) {
  return (
    <View style={[styles.item, !isLast && styles.itemBorder]}>
      <Text style={styles.itemText}>{title}</Text>
      <Icon name="chevron-right" size={24} color={Colors.gray} />
    </View>
  );
}
