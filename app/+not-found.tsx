import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/index';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={80} color={COLORS.gray} />
      <Text style={styles.title}>صفحة غير موجودة</Text>
      <Text style={styles.message}>عذراً، الصفحة التي تبحث عنها غير موجودة</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(tabs)/home')}
      >
        <Text style={styles.buttonText}>العودة للرئيسية</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.padding,
  },
  message: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
    marginTop: SIZES.base,
    marginBottom: SIZES.padding * 2,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
});
