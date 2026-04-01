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
  if (password.length < 8) {
    return 'كلمة المرور يجب أن تكون على الأقل 8 أحرف';
  }
  return null;
};

export const validatePhoneNumber = (phone: string): string | null => {
  if (!phone) {
    return 'رقم الهاتف مطلوب';
  }
  const cleanedPhone = phone.replace(/\D/g, '');
  if (cleanedPhone.length < 10) {
    return 'رقم الهاتف يجب أن يكون على الأقل 10 أرقام';
  }
  return null;
};
