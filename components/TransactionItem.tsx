import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/index';
import { formatDate } from '../utils/formatting';

interface Transaction {
  type: 'recharge' | 'call' | 'withdraw' | 'transfer';
  amount: number;
  balance: number;
  description: string;
  createdAt: string;
}

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isCredit = transaction.type === 'recharge';
  const icon = isCredit ? 'add-circle' : 'remove-circle';
  const iconColor = isCredit ? COLORS.success : COLORS.error;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color={iconColor} />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text style={styles.date}>{formatDate(transaction.createdAt)}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: iconColor }]}>
          {isCredit ? '+' : ''}${transaction.amount.toFixed(2)}
        </Text>
        <Text style={styles.balance}>الرصيد: ${transaction.balance.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base,
    borderRadius: SIZES.radius,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: SIZES.body3,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  date: {
    fontSize: SIZES.body4,
    color: COLORS.gray,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  balance: {
    fontSize: SIZES.body4,
    color: COLORS.gray,
  },
});
