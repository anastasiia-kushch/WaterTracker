import { Text, View, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Colors from '../styles/colors';

type ProgressCircleProps = {
  amount?: number;
  goal?: number;
};

function getFillPercentage(amount: number = 0, goal: number = 1): number {
  if (goal <= 0 || amount < 0) {
    return 0;
  }

  const pct = (amount / goal) * 100;

  return Math.min(Math.round(pct), 100);
}

function toLiters(value: number = 0): string {
  if (value < 0) return '0L';

  return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + 'L';
}

function ProgressCircle({ amount, goal }: ProgressCircleProps) {
  return (
    <View>
      <AnimatedCircularProgress
        size={240}
        width={8}
        fill={getFillPercentage(amount, goal)}
        tintColor={Colors.medium}
        backgroundColor={Colors.light}
        rotation={0}
      >
        {() => (
          <View style={styles.container}>
            <Text style={styles.amountText}>{toLiters(amount)}</Text>
            <Text style={styles.percentageText}>
              {getFillPercentage(amount, goal)}%
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  amountText: {
    fontFamily: 'Inter',
    fontSize: 42,
    fontWeight: 600,
    color: Colors.darkest,
  },
  percentageText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 600,
    color: Colors.darkest,
  },
});

export default ProgressCircle;
