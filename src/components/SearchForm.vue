<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search } from 'lucide-vue-next'
import { SidebarGroup, SidebarGroupContent, SidebarInput } from '@/components/ui/sidebar'

const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const localValue = ref(props.modelValue || '')

watch(localValue, (val) => emit('update:modelValue', val))

watch(
  () => props.modelValue,
  (val) => (localValue.value = val || ''),
)
</script>

<template>
  <SidebarGroup class="py-0">
    <SidebarGroupContent class="relative">
      <SidebarInput v-model="localValue" placeholder="Search users..." class="pl-9" />
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </SidebarGroupContent>
  </SidebarGroup>
</template>
