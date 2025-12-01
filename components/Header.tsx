import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../styles/colors';

function formatDate(dateString?: string): string {
  const date = dateString ? new Date(dateString) : new Date();

  // Чтобы работало одинаково на любых устройствах, форматируем вручную
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
  const month = monthNames[date.getMonth()] ?? 'Jan';

  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

type HeaderProps = {
  type: 'main' | 'history' | 'day' | 'settings';
  day?: string;
  isToday?: boolean;
};

function Header({ type, day, isToday }: HeaderProps) {
  const navigation = useNavigation<any>();
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
        <View style={{ width: 50 }} /> {/* Placeholder for alignment */}
      </View>
    );
  } else if (type === 'history') {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#1A73E8" />
        </TouchableOpacity>
        <Text style={styles.title}>History</Text>
        <View style={{ width: 50 }} /> {/* Placeholder for alignment */}
      </View>
    );
  } else if (type === 'day') {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#1A73E8" />
        </TouchableOpacity>
        <Text style={styles.title}>{isToday ? 'Today' : formatDate(day)}</Text>
        <View style={{ width: 50 }} /> {/* Placeholder for alignment */}
      </View>
    );
  } else if (type === 'settings') {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#1A73E8" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 50 }} /> {/* Placeholder for alignment */}
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: '20%',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A73E8',
  },
});

export default Header;
