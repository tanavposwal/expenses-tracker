import { atom } from 'recoil';

// Authentication state
export const loginState = atom({
  key: 'loginState',
  default: false,
});

export const emailState = atom({
  key: 'emailState',
  default: "",
});

// Transaction state
export const transactionState = atom({
  key: 'transactionState',
  default: [],
});

// UI state
export const loadingState = atom({
  key: 'loadingState',
  default: false,
});
