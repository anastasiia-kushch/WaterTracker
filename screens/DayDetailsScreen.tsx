import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';
import { getColors } from '../styles/colors';
import { fetchUser } from '../api';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type DayDetailsScreenProps = {
  route: {
    params: {
      date: string;
    };
  };
};

type UserData = {
  logs: {
    [key: string]: number[];
  };
};

export default function DayDetailsScreen({ route }: DayDetailsScreenProps) {
  const { date } = route.params;
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const Colors = useMemo(() => getColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          color: Colors.black,
        },
        separator: {
          height: 1,
          backgroundColor: Colors.lightGray,
          marginLeft: 20,
        },
        emptyContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        emptyText: {
          fontSize: 18,
          color: Colors.gray,
        },
      }),
    [Colors],
  );

  useEffect(() => {
    async function load() {
      try {
        const userData = (await fetchUser()) as UserData;
        const dayLogs = userData.logs?.[date] || [];
        const formattedLogs = dayLogs.map(ml => `${ml}ml`);
        setLogs(formattedLogs);
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [date]);

  const today = new Date().toISOString().split('T')[0];
  const isToday = date === today;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header type="day" day={date} isToday={isToday} />

      {logs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No added progress</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={logs}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.text}>{item}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingTop: 20 }}
        />
      )}
    </View>
  );
}
