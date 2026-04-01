import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/index';
import { validatePhoneNumber } from '../utils/validation';

interface PhoneNumberInputProps {
  onSubmit: (phoneNumber: string) => void;
  placeholder?: string;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  onSubmit,
  placeholder = 'أدخل رقم الهاتف',
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const validationError = validatePhoneNumber(phoneNumber);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    onSubmit(phoneNumber);
    setPhoneNumber('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder={placeholder}
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            if (error) setError('');
          }}
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.gray}
        />
        <TouchableOpacity style={styles.callButton} onPress={handleSubmit}>
          <Ionicons name="call" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.padding,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    padding: SIZES.padding,
    fontSize: SIZES.body3,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  callButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  errorText: {
    fontSize: SIZES.body4,
    color: COLORS.error,
    marginTop: SIZES.base / 2,
  },
});
