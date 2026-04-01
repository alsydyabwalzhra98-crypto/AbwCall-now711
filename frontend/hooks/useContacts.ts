import { useState, useEffect } from 'react';
import { Contact } from '../types/contact';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      setContacts([]);
    } catch (err: any) {
      setError(err.message || 'فشل في جلب جهات الاتصال');
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact: { name: string; phone: string }) => {
    try {
      const newContact: Contact = {
        id: Math.random().toString(36),
        name: contact.name,
        phone: contact.phone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setContacts([...contacts, newContact]);
    } catch (err: any) {
      setError(err.message || 'فشل في إضافة جهة الاتصال');
      throw err;
    }
  };

  const deleteContact = async (id: string) => {
    try {
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
      setContacts(contacts.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.phone.includes(query)
      ));
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
    deleteContact,
    searchContacts,
  };
};
