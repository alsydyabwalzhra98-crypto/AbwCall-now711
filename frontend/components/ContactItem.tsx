import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Contact } from '../types/contact';
import { COLORS, SIZES } from '../constants/colors';

interface ContactItemProps {
  contact: Contact;
  onPress?: (contact: Contact) => void;
  onDelete?: (contactId: string) => void;
  showDeleteButton?: boolean;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  onPress,
  onDelete,
  showDeleteButton = false,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress(contact);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(contact.id);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {contact.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        
        {showDeleteButton && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash" size={20} color={COLORS.error} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  avatarText: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontSize: SIZES.body3,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  phone: {
    fontSize: SIZES.body4,
    color: COLORS.gray,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.base,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.base,
  },
});
