import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../components/Header';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header type="settings" />
      <View style={styles.userSection}>
        <Text style={styles.userName}>Lucas Scott</Text>
        <View style={styles.editIcon}>
          <Icon name="edit-3" size={12} color="white" />
        </View>
        <Text style={styles.userHandle}>@lucasscott3</Text>
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
      <Icon name="arrow-right" size={20} color="#888" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A73E8',
  },

  // USER
  userSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  editIcon: {
    position: 'absolute',
    right: -25,
    top: 0,
    backgroundColor: '#1A73E8',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userHandle: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },

  // LIST
  list: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
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
    borderBottomColor: '#e6e6e6',
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
});
