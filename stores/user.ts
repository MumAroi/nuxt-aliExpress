import { defineStore } from 'pinia';
import { User } from '~/types';

export const useUserStore = defineStore('user', {
  state: (): User => {
    return {
      isMenuOverlay: false,
      isLoading: false,
      cart: [],
      checkout: []
    }
  },
  persist: true
})