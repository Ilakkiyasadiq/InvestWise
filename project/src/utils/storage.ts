// Local Storage Keys
export const STORAGE_KEYS = {
  CURRENT_USER: 'currentUserEmail',
  USER_PREFIX: 'user_',
  CREDENTIALS_PREFIX: 'credentials_',
};

// Helper functions for local storage operations
export const storage = {
  // Get user data by email
  getUser: (email: string) => {
    const data = localStorage.getItem(`${STORAGE_KEYS.USER_PREFIX}${email}`);
    return data ? JSON.parse(data) : null;
  },

  // Get credentials by email
  getCredentials: (email: string) => {
    const data = localStorage.getItem(`${STORAGE_KEYS.CREDENTIALS_PREFIX}${email}`);
    return data ? JSON.parse(data) : null;
  },

  // Get current user email
  getCurrentUserEmail: () => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Clear all auth related data
  clearAuth: () => {
    const currentUserEmail = storage.getCurrentUserEmail();
    if (currentUserEmail) {
      localStorage.removeItem(`${STORAGE_KEYS.USER_PREFIX}${currentUserEmail}`);
      localStorage.removeItem(`${STORAGE_KEYS.CREDENTIALS_PREFIX}${currentUserEmail}`);
    }
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};