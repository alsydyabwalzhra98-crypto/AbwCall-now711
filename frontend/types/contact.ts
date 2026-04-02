export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactRequest {
  name: string;
  phone: string;
  email?: string;
}

export interface UpdateContactRequest {
  name?: string;
  phone?: string;
  email?: string;
  isFavorite?: boolean;
}
