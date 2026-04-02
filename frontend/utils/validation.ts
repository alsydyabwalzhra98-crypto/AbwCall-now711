import { CONFIG } from '../constants/config';

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'البريد الإلكتروني مطلوب';
  }
  if (!emailRegex.test(email)) {
    return 'البريد الإلكتروني غير صحيح';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'كلمة المرور مطلوبة';
  }
  if (password.length < CONFIG.VALIDATION.MIN_PASSWORD_LENGTH) {
    return `كلمة المرور يجب أن تكون على الأقل ${CONFIG.VALIDATION.MIN_PASSWORD_LENGTH} أحرف`;
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، ورقم';
  }
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) {
    return 'الاسم مطلوب';
  }
  if (name.length < CONFIG.VALIDATION.MIN_NAME_LENGTH) {
    return `الاسم يجب أن يكون على الأقل ${CONFIG.VALIDATION.MIN_NAME_LENGTH} أحرف`;
  }
  if (name.length > CONFIG.VALIDATION.MAX_NAME_LENGTH) {
    return `الاسم يجب أن لا يزيد عن ${CONFIG.VALIDATION.MAX_NAME_LENGTH} حرف`;
  }
  return null;
};

export const validatePhoneNumber = (phone: string): string | null => {
  if (!phone) {
    return 'رقم الهاتف مطلوب';
  }
  
  // Remove all non-numeric characters
  const cleanedPhone = phone.replace(/\D/g, '');
  
  if (cleanedPhone.length < 10) {
    return 'رقم الهاتف يجب أن يكون على الأقل 10 أرقام';
  }
  
  if (cleanedPhone.length > CONFIG.VALIDATION.MAX_PHONE_LENGTH) {
    return `رقم الهاتف يجب أن لا يزيد عن ${CONFIG.VALIDATION.MAX_PHONE_LENGTH} رقم`;
  }
  
  return null;
};

export const validateAmount = (amount: string, balance: number): string | null => {
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) {
    return 'المبلغ غير صحيح';
  }
  
  if (numAmount <= 0) {
    return 'المبلغ يجب أن يكون أكبر من صفر';
  }
  
  if (numAmount > balance) {
    return 'المبلغ يتجاوز الرصيد المتاح';
  }
  
  return null;
};
