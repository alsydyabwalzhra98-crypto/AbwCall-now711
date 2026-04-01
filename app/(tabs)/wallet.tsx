import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/index';

export default function WalletScreen() {
  const [balance] = useState(0);

  const rechargeOptions = [
    { amount: 10, bonus: 0 },
    { amount: 25, bonus: 2 },
    { amount: 50, bonus: 5 },
    { amount: 100, bonus: 15 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>المحفظة</Text>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>الرصيد الحالي</Text>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.rechargeSection}>
        <Text style={styles.sectionTitle}>خيارات الشحن</Text>
        {rechargeOptions.map((option, index) => (
          <TouchableOpacity key={index} style={styles.rechargeOption}>
            <View style={styles.optionInfo}>
              <Text style={styles.optionAmount}>${option.amount}</Text>
              {option.bonus > 0 && (
                <Text style={styles.optionBonus}>+ ${option.bonus} مكافأة</Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  balanceCard: {
    margin: SIZES.padding,
    padding: SIZES.padding * 1.5,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius * 1.5,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: SIZES.body4,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: SIZES.base / 2,
  },
  balanceAmount: {
    fontSize: SIZES.h1 * 1.5,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  rechargeSection: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  rechargeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  optionInfo: {
    flex: 1,
  },
  optionAmount: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  optionBonus: {
    fontSize: SIZES.body4,
    color: COLORS.success,
    marginTop: 4,
  },
});
