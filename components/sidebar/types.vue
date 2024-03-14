<script setup lang="ts">
import { useProductsStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
const productsStore = useProductsStore()
const { state } = storeToRefs(productsStore)
</script>

<template>
  <ul class="sideBar">
    <li
      @click="productsStore.setSelectedType({ _id: null })"
      :class="{ activeType: productsStore.state.selectedType._id === null }"
      class="type"
    >
      Все
    </li>
    <li
      :class="{ activeType: productsStore.state.selectedType._id === type._id }"
      @click="productsStore.setSelectedType(type)"
      :key="type._id"
      v-for="type in state.types"
      class="type"
    >
      {{ type.name }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
.sideBar {
  position: sticky;
  top: 20px;
  padding: 20px;
  border-radius: 15px;
  background-color: var(--surface);
  height: fit-content;
  @include body1Typo;
  box-shadow: var(--dp-0);
}
.type {
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  @include transition;
}
.activeType {
  background-color: var(--primary);
  color: var(--on-surface);
}
</style>
