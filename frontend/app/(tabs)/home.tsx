import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, SIZES } from '../../constants';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleMakeCall = (phoneNumber?: string) => {
    if (phoneNumber) {
      router.push(`/call/${phoneNumber}`);
    }
  };

  const quickActions = [
    {
      id: 'recharge',
      title: 'شحن الرصيد',
      icon: 'add-circle-outline',
      onPress: () => router.push('/(tabs)/wallet'),
    },
    {
      id: 'history',
      title: 'سجل المكالمات',
      icon: 'time-outline',
      onPress: () => router.push('/(tabs)/calls'),
    },
    {
      id: 'contacts',
      title: 'جهات الاتصال',
      icon: 'people-outline',
      onPress: () => router.push('/(tabs)/contacts'),
    },
    {
      id: 'settings',
      title: 'الإعدادات',
      icon: 'settings-outline',
      onPress: () => console.log('Settings'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.welcome}>مرحباً، {user?.name || 'المستخدم'}</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={40} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Ionicons name="wallet" size={24} color={COLORS.white} />
          <Text style={styles.cardTitle}>المحفظة</Text>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>الرصيد الحالي</Text>
          <Text style={styles.balanceAmount}>${user?.balance.toFixed(2) || '0.00'}</Text>
        </View>
      </View>

      <View style={styles.callSection}>
        <Text style={styles.sectionTitle}>إجراء مكالمة</Text>
        <TouchableOpacity style={styles.dialButton}>
          <Ionicons name="call" size={32} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>إجراءات سريعة</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionCard}
              onPress={action.onPress}
            >
              <Ionicons name={action.icon} size={32} color={COLORS.primary} />
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding,
  },
  welcome: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileButton: {
    padding: 4,
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
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: SIZES.base,
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
  callSection: {
    backgroundColor: COLORS.white,
    margin: SIZES.padding,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
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
  dialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsSection: {
    padding: SIZES.padding,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginBottom: SIZES.padding,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: SIZES.body4,
    color: COLORS.text,
    marginTop: 8,
    textAlign: 'center',
  },
});
