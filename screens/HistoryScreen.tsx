import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Colors from '../styles/colors';

export default function HistoryScreen({}) {
  const navigation = useNavigation<any>();
  const today = new Date().toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Header type="history" />

      <Calendar
        onDayPress={day =>
          navigation.navigate('DayDetails', { date: day.dateString })
        }
        markedDates={{
          [today]: {
            selected: true,
            selectedColor: Colors.darkest,
            selectedTextColor: Colors.white,
          },
        }}
        theme={{
          textSectionTitleColor: '#A0A0A0',
          selectedDayBackgroundColor: Colors.darkest,
          todayTextColor: Colors.darkest,
          arrowColor: Colors.darkest,
          monthTextColor: Colors.darkest,
          dayTextColor: '#000',
          textDisabledColor: '#d9e1e8',
          dotColor: Colors.darkest,
          selectedDotColor: Colors.white,
        }}
        style={styles.calendar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  calendar: {
    marginTop: '20%',
  },
});
