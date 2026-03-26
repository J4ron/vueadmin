import { ref, computed } from 'vue'
import { type User, UserRole } from '@/types/user.type'

const search = ref<string>('')
const roleFilter = ref([] as UserRole[])
const salaryFilter = ref([0, 500000] as [number, number])

export default function useFilterStore() {
  const isRoleActive = (role?: UserRole) => {
    if (!role) return false
    return roleFilter.value.includes(role)
  }

  const getSalaryRangeLabel = computed(() => {
    const [min, max] = salaryFilter.value
    if (max === Infinity) {
      return `$${min / 1000}k+`
    }
    return `$${min / 1000}k - $${max / 1000}k`
  })

  const filteredUsers = (users: User[]) => {
    return users
      .filter(
        (u) =>
          u.firstname.toLowerCase().includes(search.value.toLowerCase()) ||
          u.lastname.toLowerCase().includes(search.value.toLowerCase()) ||
          u.email.toLowerCase().includes(search.value.toLowerCase()) ||
          u.jobTitle.toLowerCase().includes(search.value.toLowerCase()),
      )
      .filter(
        (u) => roleFilter.value.length === 0 || roleFilter.value.includes(u.role ?? UserRole.GUEST),
      )
      .filter((u) => u.salary >= salaryFilter.value[0] && u.salary <= salaryFilter.value[1])
  }

  const setSearch = (query: string) => {
    search.value = query
  }

  const toggleRole = (role: UserRole) => {
    if (roleFilter.value.includes(role)) {
      roleFilter.value = roleFilter.value.filter((r) => r !== role)
    } else {
      roleFilter.value.push(role)
    }
  }

  const setSalaryFilter = (range: [number, number]) => {
    salaryFilter.value = range
  }

  const resetFilters = () => {
    search.value = ''
    roleFilter.value = []
    salaryFilter.value = [0, 500000]
  }

  return {
    search,
    roleFilter,
    salaryFilter,
    isRoleActive,
    getSalaryRangeLabel,
    filteredUsers,
    setSearch,
    toggleRole,
    setSalaryFilter,
    resetFilters,
  }
}
