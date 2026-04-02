import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { Transaction } from '../../types/transaction';
import { COLORS, SIZES } from '../../constants';
import { WalletCard } from '../../components/WalletCard';
import { TransactionItem } from '../../components/TransactionItem';
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

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    // Mock transactions - replace with API call
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'recharge',
        amount: 50,
        balance: 75,
        description: 'شحن الرصيد',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        type: 'call',
        amount: -2.5,
        balance: 25,
        description: 'مكالمة إلى +962XXXXXXXXX',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ];
    setTransactions(mockTransactions);
  };

  const handleRecharge = (amount: number) => {
    Alert.alert(
      'تأكيد الشحن',
      `هل تريد شحن رصيد بقيمة $${amount}؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'شحن',
          onPress: () => {
            const newBalance = (user?.balance || 0) + amount;
            updateBalance(newBalance);
            setShowRechargeModal(false);
            
            // Add transaction
            const newTransaction: Transaction = {
              id: Date.now().toString(),
              type: 'recharge',
              amount,
              balance: newBalance,
              description: 'شحن الرصيد',
              createdAt: new Date().toISOString(),
            };
            setTransactions([newTransaction, ...transactions]);
            
            Alert.alert('نجاح', 'تم شحن الرصيد بنجاح');
          },
        },
      ]
    );
  };

  const handleCustomRecharge = () => {
    const amount = parseFloat(rechargeAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('خطأ', 'يرجى إدخال مبلغ صحيح');
      return;
    }
    handleRecharge(amount);
    setRechargeAmount('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>المحفظة</Text>
        <TouchableOpacity style={styles.historyButton}>
          <Ionicons name="time-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <WalletCard />

      <View style={styles.rechargeSection}>
        <Text style={styles.sectionTitle}>شحن الرصيد</Text>
        <View style={styles.rechargeOptions}>
          {rechargeOptions.map((option) => (
            <TouchableOpacity
              key={option.amount}
              style={styles.rechargeOption}
              onPress={() => handleRecharge(option.amount)}
            >
              <Text style={styles.rechargeAmount}>${option.amount}</Text>
              {option.bonus > 0 && (
                <Text style={styles.rechargeBonus}>+${option.bonus} هدية</Text>
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
        <Text style={styles.sectionTitle}>آخر المعاملات</Text>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </View>

      <Modal
        visible={showRechargeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRechargeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>شحن بمبلغ مخصص</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="أدخل المبلغ"
              value={rechargeAmount}
              onChangeText={setRechargeAmount}
              keyboardType="numeric"
              placeholderTextColor={COLORS.gray}
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
                <Text style={styles.modalConfirmText}>شحن</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  historyButton: {
    padding: 8,
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
  rechargeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  rechargeOption: {
    width: '48%',
    backgroundColor: COLORS.lightGray,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  rechargeAmount: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  rechargeBonus: {
    fontSize: SIZES.body4,
    color: COLORS.success,
    marginTop: 4,
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
