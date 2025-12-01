import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import Colors from '../styles/colors';
import { fetchUser } from '../api';

export default function SettingsScreen() {
  const [data, setData] = useState({
    userName: 'Loading...',
    nickName: 'Loading...',
  });

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
        <SettingItem title="Set goal" />
        <SettingItem title="History" />
        <SettingItem title="Notifications" />
        <SettingItem title="Appearance" />
        <SettingItem title="Language" />
        <SettingItem title="Privacy & Security" isLast />
      </View>
    </ScrollView>
  );
}

type SettingItemProps = {
  title: string;
  isLast?: boolean;
};

function SettingItem({ title, isLast }: SettingItemProps) {
  return (
    <View style={[styles.item, !isLast && styles.itemBorder]}>
      <Text style={styles.itemText}>{title}</Text>
      <Icon name="chevron-right" size={24} color={Colors.gray} />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
