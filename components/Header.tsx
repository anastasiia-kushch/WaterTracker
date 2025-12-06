import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { getColors } from '../styles/colors';
import LogoutModal from './LogoutModal';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function formatDate(dateString?: string): string {
  const date = dateString ? new Date(dateString) : new Date();

  const day = String(date.getDate()).padStart(2, '0');

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];

  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

type HeaderProps = {
  type: 'main' | 'history' | 'day' | 'settings' | 'signup';
  day?: string;
  isToday?: boolean;
};

function Header({ type, day, isToday }: HeaderProps) {
  const navigation = useNavigation<any>();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          marginTop: '18%',
          marginBottom: 20,
        },
        title: {
          fontSize: 18,
          fontWeight: '600',
          color: Colors.darkest,
        },
      }),
    [Colors],
  );

  if (type === 'main') {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Icon name="trending-up" size={24} color={Colors.darkest} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DayDetails', {
              date: new Date().toISOString().split('T')[0],
              isToday: true,
            })
          }
        >
          <Text style={styles.title}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={24} color={Colors.darkest} />
        </TouchableOpacity>
      </View>
    );
  } else if (type === 'history') {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color={Colors.darkest} />
        </TouchableOpacity>
        <Text style={styles.title}>History</Text>
        <View style={{ width: 20 }} />
      </View>
    );
  } else if (type === 'day') {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color={Colors.darkest} />
        </TouchableOpacity>
        <Text style={styles.title}>{isToday ? 'Today' : formatDate(day)}</Text>
        <View style={{ width: 20 }} />
      </View>
    );
  } else if (type === 'settings') {
    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={28} color={Colors.darkest} />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity onPress={() => setShowLogoutModal(true)}>
            <Icon name="log-out" size={24} color={Colors.darkest} />
          </TouchableOpacity>
        </View>
        {showLogoutModal && (
          <LogoutModal onClose={() => setShowLogoutModal(false)} />
        )}
      </>
    );
  } else if (type === 'signup') {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color={Colors.darkest} />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
        <View style={{ width: 20 }} />
      </View>
    );
  }
  return null;
}

export default Header;
