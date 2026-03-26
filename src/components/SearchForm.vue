<script setup lang="ts">
import { computed } from 'vue'
import { Search } from 'lucide-vue-next'
import { SidebarGroup, SidebarGroupContent, SidebarInput } from '@/components/ui/sidebar'
import { useUserFilterStore } from '@/stores/userFilterStore'

const userStore = useUserFilterStore()

const name = computed({
  get: () => userStore.search,
  set: (val) => userStore.setSearch(val),
})

console.log(userStore.search)
</script>

<template>
  <SidebarGroup class="py-0 mt-2">
    <SidebarGroupContent class="relative">
      <SidebarInput v-model="name" placeholder="Search users..." class="pl-9" />
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </SidebarGroupContent>
  </SidebarGroup>
</template>
