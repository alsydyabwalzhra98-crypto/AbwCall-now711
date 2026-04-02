import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { COLORS, SIZES } from '../constants/colors';

export const WalletCard: React.FC = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="wallet" size={24} color={COLORS.white} />
        </View>
        <Text style={styles.cardTitle}>المحفظة</Text>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>الرصيد الحالي</Text>
        <Text style={styles.balanceAmount}>${user?.balance.toFixed(2) || '0.00'}</Text>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle" size={16} color={COLORS.white} />
          <Text style={styles.actionText}>شحن</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="arrow-down-circle" size={16} color={COLORS.white} />
          <Text style={styles.actionText}>سحب</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="swap-horizontal" size={16} color={COLORS.white} />
          <Text style={styles.actionText}>تحويل</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: SIZES.padding,
    padding: SIZES.padding * 1.5,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius * 1.5,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  balanceContainer: {
    marginBottom: SIZES.padding * 2,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius,
  },
  actionText: {
    fontSize: SIZES.body4,
    color: COLORS.white,
    marginLeft: SIZES.base / 2,
    fontWeight: '500',
  },
});
