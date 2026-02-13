<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import UserTable from './components/ui/UserTable.vue'
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { fetchUsers } from '@/queries/users.queries'
import { computed } from 'vue'

const { data: users, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})

const searchQuery = ref('')

const filteredUsers = computed(() => {
  return (
    users.value?.filter(
      (u) =>
        u.firstname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        u.lastname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.value.toLowerCase()),
    ) ?? []
  )
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar v-model="searchQuery" />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">Users</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <UserTable :users="filteredUsers" :isLoading="isLoading" />
    </SidebarInset>
  </SidebarProvider>
</template>
