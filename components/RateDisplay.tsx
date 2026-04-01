import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/index';

export const RateDisplay: React.FC = () => {
  const rates = [
    { country: 'الأردن', rate: 0.05, flag: '🇯🇴' },
    { country: 'مصر', rate: 0.08, flag: '🇪🇬' },
    { country: 'السعودية', rate: 0.06, flag: '🇸🇦' },
    { country: 'الإمارات', rate: 0.07, flag: '🇦🇪' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="pricetag" size={20} color={COLORS.primary} />
        <Text style={styles.title}>أسعار المكالمات</Text>
      </View>
      <View style={styles.ratesList}>
        {rates.map((rate, index) => (
          <View key={index} style={styles.rateItem}>
            <Text style={styles.flag}>{rate.flag}</Text>
            <Text style={styles.country}>{rate.country}</Text>
            <Text style={styles.rate}>${rate.rate}/دقيقة</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.padding,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  title: {
    fontSize: SIZES.body3,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SIZES.base,
  },
  ratesList: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.base,
  },
  rateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.base / 2,
  },
  flag: {
    fontSize: 20,
    marginRight: SIZES.base,
  },
  country: {
    flex: 1,
    fontSize: SIZES.body4,
    color: COLORS.text,
  },
  rate: {
    fontSize: SIZES.body4,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
