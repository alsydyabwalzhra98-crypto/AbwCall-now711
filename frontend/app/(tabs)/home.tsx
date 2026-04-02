import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, SIZES } from '../../constants';
import { WalletCard } from '../../components/WalletCard';
import { PhoneNumberInput } from '../../components/PhoneNumberInput';
import { RateDisplay } from '../../components/RateDisplay';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleMakeCall = (phoneNumber: string) => {
    router.push(`/call/${phoneNumber}`);
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

      <WalletCard />

      <View style={styles.callSection}>
        <Text style={styles.sectionTitle}>إجراء مكالمة</Text>
        <PhoneNumberInput onSubmit={handleMakeCall} />
        <RateDisplay />
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
  callSection: {
    backgroundColor: COLORS.white,
    margin: SIZES.padding,
    padding: SIZES.padding,
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
