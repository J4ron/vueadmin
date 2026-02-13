// stores/userFilter.store.ts
import { defineStore } from 'pinia'
import { type User, UserRole } from '@/types/user.type'

type Range = { min: number; max: number }

export const useUserFilterStore = defineStore('userFilter', {
  // 1. State
  state: () => ({
    search: '', // für Search Input
    roleFilter: [] as UserRole[], // enum Array für Role Filter
    salaryFilter: [] as Range[], // min/max Gehaltsfilter
  }),

  // 2. Getters → abgeleitete State-Logik
  getters: {
    filteredUsers: (state) => (users: User[]) => {
      return users
        .filter(
          (u) =>
            u.firstname.toLowerCase().includes(state.search.toLowerCase()) ||
            u.lastname.toLowerCase().includes(state.search.toLowerCase()) ||
            u.email.toLowerCase().includes(state.search.toLowerCase()),
        )
        .filter(
          (u) =>
            state.roleFilter.length === 0 || state.roleFilter.includes(u.role ?? UserRole.GUEST),
        )
        .filter(
          (u) =>
            state.salaryFilter.length === 0 ||
            state.salaryFilter.some((r) => u.salary >= r.min && u.salary <= r.max),
        )
    },
  },

  // 3. Actions → Methoden, die den State verändern
  actions: {
    setSearch(query: string) {
      this.search = query
    },
    toggleRole(role: UserRole) {
      if (this.roleFilter.includes(role))
        this.roleFilter = this.roleFilter.filter((r) => r !== role)
      else this.roleFilter.push(role)
    },
    setSalaryFilter(ranges: Range[]) {
      this.salaryFilter = ranges
    },
    resetFilters() {
      this.search = ''
      this.roleFilter = []
      this.salaryFilter = []
    },
  },
})
