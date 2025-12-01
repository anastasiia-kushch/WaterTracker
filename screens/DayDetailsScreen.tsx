import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import Colors from '../styles/colors';

type DayDetailsScreenProps = {
  route: {
    params: {
      date: string;
    };
  };
};

export default function DayDetailsScreen({ route }: DayDetailsScreenProps) {
  const { date } = route.params;

  const today = new Date().toISOString().split('T')[0];
  const isToday = date === today;

  const data = ['100ml', '200ml', '150ml', '80ml', '200ml'];

  return (
    <View style={styles.container}>
      <Header type="day" day={date} isToday={isToday} />

      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  list: {
    flex: 1,
    marginTop: '20%',
  },
  row: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 20,
  },
});
