import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Contact } from '../types/contact';
import { ContactItem } from './ContactItem';
import { COLORS, SIZES } from '../constants/colors';

interface ContactListProps {
  contacts: Contact[];
  loading: boolean;
  onDeleteContact?: (contactId: string) => void;
  onContactPress?: (contact: Contact) => void;
  showDeleteButton?: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  loading,
  onDeleteContact,
  onContactPress,
  showDeleteButton = false,
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>جاري التحميل...</Text>
      </View>
    );
  }

  if (contacts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>لا توجد جهات اتصال</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={contacts}
      renderItem={({ item }) => (
        <ContactItem
          contact={item}
          onPress={onContactPress}
          onDelete={onDeleteContact}
          showDeleteButton={showDeleteButton}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: SIZES.padding,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  loadingText: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  emptyText: {
    fontSize: SIZES.body3,
    color: COLORS.gray,
  },
});
