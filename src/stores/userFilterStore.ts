import { defineStore } from 'pinia'
import { type User, UserRole } from '@/types/user.type'

export const useUserFilterStore = defineStore('userFilter', {
  state: () => ({
    search: '',
    roleFilter: [] as UserRole[],
    salaryFilter: [0, 500000] as [number, number],
  }),

  getters: {
    isRoleActive: (state) => (role?: UserRole) => {
      if (!role) return false
      return state.roleFilter.includes(role)
    },

    getSalaryRangeLabel(): string {
      const [min, max] = this.salaryFilter
      if (max === Infinity) {
        return `$${min / 1000}k+`
      }
      return `$${min / 1000}k - $${max / 1000}k`
    },

    filteredUsers: (state) => (users: User[]) => {
      return users
        .filter(
          (u) =>
            u.firstname.toLowerCase().includes(state.search.toLowerCase()) ||
            u.lastname.toLowerCase().includes(state.search.toLowerCase()) ||
            u.email.toLowerCase().includes(state.search.toLowerCase()) ||
            u.jobTitle.toLowerCase().includes(state.search.toLowerCase()),
        )
        .filter(
          (u) =>
            state.roleFilter.length === 0 || state.roleFilter.includes(u.role ?? UserRole.GUEST),
        )
        .filter((u) => u.salary >= state.salaryFilter[0] && u.salary <= state.salaryFilter[1])
    },
  },

  actions: {
    setSearch(query: string) {
      this.search = query
    },

    toggleRole(role: UserRole) {
      if (this.roleFilter.includes(role)) {
        this.roleFilter = this.roleFilter.filter((r) => r !== role)
      } else {
        this.roleFilter.push(role)
      }
    },

    setSalaryFilter(range: [number, number]) {
      this.salaryFilter = range
    },

    resetFilters() {
      this.search = ''
      this.roleFilter = []
      this.salaryFilter = [0, 500000]
    },
  },
})
