import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

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
            selectedColor: '#1A73E8',
            selectedTextColor: '#fff',
          },
        }}
        theme={{
          textSectionTitleColor: '#A0A0A0',
          selectedDayBackgroundColor: '#1A73E8',
          todayTextColor: '#1A73E8',
          arrowColor: '#1A73E8',
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A73E8',
  },
});
