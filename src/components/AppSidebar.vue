<script setup lang="ts">
import SearchForm from './SearchForm.vue'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

import useFilterStore from '@/stores/useFilterStore'
import { UserRole } from '@/types/user.type'
import Slider from './ui/slider/Slider.vue'
import SidebarSeparator from './ui/sidebar/SidebarSeparator.vue'
import { Trash } from 'lucide-vue-next'

const userFilterStore = useFilterStore()

const navMain = [
  {
    title: 'Filter By Role',
    items: [
      { id: 'role-admin', title: 'Admin', role: UserRole.ADMIN },
      { id: 'role-user', title: 'User', role: UserRole.USER },
      { id: 'role-guest', title: 'Guest', role: UserRole.GUEST },
    ],
  },
]

function handleRoleClick(role?: UserRole) {
  if (!role) return
  userFilterStore.toggleRole(role)
}
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <SearchForm />
    </SidebarHeader>

    <SidebarContent class="flex flex-col h-full">
      <SidebarGroup v-for="group in navMain" :key="group.title">
        <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.items" :key="item.id">
              <SidebarMenuButton
                :isActive="userFilterStore.isRoleActive(item.role)"
                @click="handleRoleClick(item.role)"
              >
                {{ item.title }}
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarSeparator class="my-4" />

            <SidebarMenuItem class="py-5 p-2">
              <p class="text-sm text-gray-500 mb-4">
                Filter users by salary range <br />
                {{ userFilterStore.getSalaryRangeLabel }}
              </p>
              <Slider
                :min="0"
                :max="150000"
                :step="1000"
                v-model="userFilterStore.salaryFilter"
                :label="userFilterStore.getSalaryRangeLabel"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <div class="mt-auto mb-5 px-2">
        <SidebarMenuButton
          @click="userFilterStore.resetFilters()"
          class="bg-red-400 hover:bg-red-500 hover:cursor-pointer w-full"
        >
          <Trash class="ml-2" /> Reset Filters
        </SidebarMenuButton>
      </div>
    </SidebarContent>

    <SidebarRail />
  </Sidebar>
</template>
