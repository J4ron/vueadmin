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
import { ref } from 'vue'

const versions = ref(['1.0.1', '1.1.0-alpha', '2.0.0-beta1'])

const navMain = ref([
  {
    title: 'Filter By Salary',
    items: [
      { id: 'salary-1', title: '< 50k', isActive: false },
      { id: 'salary-2', title: '50k - 100k', isActive: false },
      { id: 'salary-3', title: '> 100k', isActive: false },
    ],
  },
  {
    title: 'Filter By Role',
    items: [
      { id: 'role-admin', title: 'Admin Only', isActive: false },
      { id: 'role-user', title: 'User Only', isActive: false },
      { id: 'role-guest', title: 'Guest Only', isActive: false },
    ],
  },
  {
    title: 'Visibility',
    items: [
      { id: 'visibility-id', title: 'ID' },
      { id: 'visibility-email', title: 'Email' },
      { id: 'visibility-name', title: 'Name' },
      { id: 'visibility-last-name', title: 'Last Name' },
      { id: 'visibility-role', title: 'Role' },
      { id: 'visibility-title', title: 'Title' },
      { id: 'visibility-salary', title: 'Salary' },
    ],
  },
])

defineProps<{ modelValue: string }>()
defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <Sidebar>
    <SidebarHeader>
      <VersionSwitcher :versions="versions" :defaultVersion="versions[0]" />
      <SearchForm
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup v-for="group in navMain" :key="group.title">
        <SidebarGroupLabel>{{ group.title }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.items" :key="item.title">
              <SidebarMenuButton>
                {{ item.title }}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarRail />
  </Sidebar>
</template>
