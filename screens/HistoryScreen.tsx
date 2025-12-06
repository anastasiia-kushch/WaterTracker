import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { getColors } from '../styles/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function HistoryScreen({}) {
  const navigation = useNavigation<any>();
  const today = new Date().toISOString().split('T')[0];
  const theme = useSelector((state: RootState) => state.theme.theme);
  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: Colors.white,
        },
        calendar: {
          marginTop: '20%',
        },
      }),
    [Colors],
  );

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
          dayTextColor: Colors.black,
          textDisabledColor: '#d9e1e8',
          dotColor: Colors.darkest,
          selectedDotColor: Colors.white,
          calendarBackground: Colors.white,
        }}
        style={styles.calendar}
      />
    </View>
  );
}
