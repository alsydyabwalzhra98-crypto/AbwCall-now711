import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCall } from '../../hooks/useCall';
import { CallRecord } from '../../types/call';
import { COLORS, SIZES } from '../../constants';
import { formatDuration, formatDate } from '../../utils/formatting';

export default function CallsScreen() {
  const { getCallHistory, callHistory, loading } = useCall();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCallHistory();
  }, []);

  const loadCallHistory = async () => {
    try {
      await getCallHistory();
    } catch (error) {
      console.error('Error loading call history:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCallHistory();
    setRefreshing(false);
  };

  const renderCallItem = ({ item }: { item: CallRecord }) => (
    <View style={styles.callItem}>
      <View style={styles.callInfo}>
        <View style={styles.callIcon}>
          <Ionicons
            name={item.status === 'completed' ? 'call' : 'call-missed'}
            size={20}
            color={item.status === 'completed' ? COLORS.success : COLORS.error}
          />
        </View>
        <View style={styles.callDetails}>
          <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
          <Text style={styles.callMeta}>
            {formatDate(item.createdAt)} • {formatDuration(item.duration)}
          </Text>
        </View>
      </View>
      <View style={styles.callAmount}>
        <Text style={styles.amount}>${item.cost.toFixed(2)}</Text>
        <Text style={styles.duration}>{formatDuration(item.duration)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>سجل المكالمات</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={callHistory}
        renderItem={renderCallItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="call-outline" size={48} color={COLORS.gray} />
            <Text style={styles.emptyText}>لا توجد مكالمات بعد</Text>
          </View>
        }
      />
    </View>
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
  filterButton: {
    padding: 8,
  },
  list: {
    padding: SIZES.padding,
  },
  callItem: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  callInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  callIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  callDetails: {
    flex: 1,
  },
  phoneNumber: {
    fontSize: SIZES.body3,
    fontWeight: '600',
    color: COLORS.text,
  },
  callMeta: {
    fontSize: SIZES.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  callAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: SIZES.body3,
    fontWeight: '600',
    color: COLORS.primary,
  },
  duration: {
    fontSize: SIZES.body4,
    color: COLORS.gray,
    marginTop: 2,
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
});
