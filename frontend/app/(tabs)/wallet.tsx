import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { Transaction } from '../../types/payment';
import { COLORS, SIZES } from '../../constants';
import { formatDate } from '../../utils/formatting';

export default function WalletScreen() {
  const { user, updateBalance } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');

  const rechargeOptions = [
    { amount: 10, bonus: 0 },
    { amount: 25, bonus: 2 },
    { amount: 50, bonus: 5 },
    { amount: 100, bonus: 15 },
  ];

  const handleQuickRecharge = (amount: number, bonus: number) => {
    const totalAmount = amount + bonus;
    const newBalance = (user?.balance || 0) + totalAmount;
    
    const transaction: Transaction = {
      id: Math.random().toString(36),
      type: 'recharge',
      amount: totalAmount,
      balance: newBalance,
      description: `شحن الرصيد - ${amount} دولار + مكافأة ${bonus} دولار`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };

    setTransactions([transaction, ...transactions]);
    updateBalance(newBalance);
    Alert.alert('نجح', `تم شحن ${totalAmount} دولار بنجاح`);
  };

  const handleCustomRecharge = () => {
    if (!rechargeAmount || isNaN(parseFloat(rechargeAmount))) {
      Alert.alert('خطأ', 'يرجى إدخال مبلغ صحيح');
      return;
    }

    const amount = parseFloat(rechargeAmount);
    const newBalance = (user?.balance || 0) + amount;

    const transaction: Transaction = {
      id: Math.random().toString(36),
      type: 'recharge',
      amount,
      balance: newBalance,
      description: `شحن رصيد مخصص - ${amount} دولار`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };

    setTransactions([transaction, ...transactions]);
    updateBalance(newBalance);
    setRechargeAmount('');
    setShowRechargeModal(false);
    Alert.alert('نجح', `تم شحن ${amount} دولار بنجاح`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
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
      </View>

      <View style={styles.rechargeSection}>
        <Text style={styles.sectionTitle}>اختر مبلغاً للشحن</Text>
        <View style={styles.optionsGrid}>
          {rechargeOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={() => handleQuickRecharge(option.amount, option.bonus)}
            >
              <Text style={styles.optionAmount}>${option.amount}</Text>
              {option.bonus > 0 && (
                <Text style={styles.optionBonus}>+ ${option.bonus} مكافأة</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.customRechargeButton}
          onPress={() => setShowRechargeModal(true)}
        >
          <Ionicons name="add-circle-outline" size={20} color={COLORS.primary} />
          <Text style={styles.customRechargeText}>مبلغ مخصص</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>السجل</Text>
        {transactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={48} color={COLORS.gray} />
            <Text style={styles.emptyText}>لا توجد عمليات بعد</Text>
          </View>
        ) : (
          transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <Ionicons name="add-circle" size={24} color={COLORS.success} />
              <View style={styles.transactionInfo}>
                <Text style={styles.description}>{transaction.description}</Text>
                <Text style={styles.date}>{formatDate(transaction.createdAt)}</Text>
              </View>
              <Text style={[styles.amount, { color: COLORS.success }]}>
                +${transaction.amount.toFixed(2)}
              </Text>
            </View>
          ))
        )}
      </View>

      <Modal
        visible={showRechargeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRechargeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>أدخل المبلغ</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="$0.00"
              keyboardType="decimal-pad"
              value={rechargeAmount}
              onChangeText={setRechargeAmount}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowRechargeModal(false)}
              >
                <Text style={styles.modalCancelText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleCustomRecharge}
              >
                <Text style={styles.modalConfirmText}>تأكيد</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  balanceCard: {
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
  rechargeSection: {
    margin: SIZES.padding,
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  optionCard: {
    width: '48%',
    padding: SIZES.padding,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  optionAmount: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.base / 2,
  },
  optionBonus: {
    fontSize: SIZES.body4,
    color: COLORS.success,
  },
  customRechargeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  customRechargeText: {
    fontSize: SIZES.body3,
    color: COLORS.primary,
    marginLeft: SIZES.base,
  },
  transactionsSection: {
    margin: SIZES.padding,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.base,
    borderRadius: SIZES.radius,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionInfo: {
    flex: 1,
    marginLeft: SIZES.padding,
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
  amount: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding * 4,
  },
  emptyText: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
    marginTop: SIZES.base,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    width: '80%',
  },
  modalTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.padding,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    fontSize: SIZES.body3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SIZES.base,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
  },
  modalConfirmButton: {
    flex: 1,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  modalConfirmText: {
    fontSize: SIZES.body3,
    color: COLORS.white,
    fontWeight: '600',
  },
});
