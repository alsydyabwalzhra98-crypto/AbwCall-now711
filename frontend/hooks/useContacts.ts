import { useState, useEffect } from 'react';
import { Contact } from '../types/contact';
import { contactAPI } from '../lib/api';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await contactAPI.getContacts();
      setContacts(response.data);
    } catch (err: any) {
      setError(err.message || 'فشل في جلب جهات الاتصال');
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (data: { name: string; phone: string }) => {
    try {
      const response = await contactAPI.addContact(data.name, data.phone);
      setContacts([...contacts, response.data]);
    } catch (err: any) {
      setError(err.message || 'فشل في إضافة جهة الاتصال');
      throw err;
    }
  };

  const updateContact = async (id: string, data: Partial<Contact>) => {
    try {
      const response = await contactAPI.updateContact(id, data);
      setContacts(contacts.map(contact => 
        contact.id === id ? response.data : contact
      ));
    } catch (err: any) {
      setError(err.message || 'فشل في تحديث جهة الاتصال');
      throw err;
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await contactAPI.deleteContact(id);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (err: any) {
      setError(err.message || 'فشل في حذف جهة الاتصال');
      throw err;
    }
  };

  const searchContacts = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contactAPI.searchContacts(query);
      setContacts(response.data);
    } catch (err: any) {
      setError(err.message || 'فشل في البحث عن جهات الاتصال');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    getContacts,
    addContact,
    updateContact,
    deleteContact,
    searchContacts,
  };
};
