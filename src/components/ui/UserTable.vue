<script setup lang="ts">
import type { User } from '@/types/user.type'
import { useVueTable, getCoreRowModel } from '@tanstack/vue-table'
import { computed } from 'vue'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table'

const props = defineProps<{
  users: User[]
  isLoading: boolean
}>()

const columns = [
  { header: 'ID', accessorKey: 'id' },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Name', accessorKey: 'firstname' },
  { header: 'Last Name', accessorKey: 'lastname' },
  { header: 'Role', accessorKey: 'role' },
  { header: 'Title', accessorKey: 'jobTitle' },
  { header: 'Salary', accessorKey: 'salary' },
]

const usersData = computed(() => props.users ?? [])

const table = useVueTable({
  get data() {
    return usersData.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div>
    <Table v-if="!props.isLoading">
      <TableHeader>
        <TableRow>
          <TableHead v-for="col in columns" :key="col.accessorKey">
            {{ col.header }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in table.getRowModel().rows" :key="row.original.id">
          <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
            <template v-if="cell.column.id === 'role'">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium text-white"
                :class="{
                  'bg-red-500/40 border border-red-600 p-2': cell.getValue() === 'admin',
                  'bg-blue-500/40 border border-blue-600 p-2': cell.getValue() === 'user',
                  'bg-gray-400/40 border border-gray-600 p-2': cell.getValue() === 'guest',
                }"
              >
                {{ cell.getValue() }}
              </span>
            </template>
            <template v-else-if="cell.column.id === 'jobTitle'">
              <span
                class="px-2 py-1 rounded-full bg-purple-200/40 text-light border border-purple-300 text-xs p-2"
              >
                {{ cell.getValue() }}
              </span>
            </template>
            <template v-else>
              {{ cell.getValue() }}
            </template>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <p v-else>Loading...</p>
  </div>
</template>
