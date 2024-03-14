<script lang="ts" setup>
import type { IErrors } from '@/models/IError';
const props = defineProps<IErrors>();
console.log(props.errors, 'props');
</script>

<template>
  <div class="errorContainer">
    <div
      :key="error.id"
      v-for="error in props.errors"
      class="errorComponent"
    >
      <div class="">{{ error.message }}</div>
      <div class="">Попробуйте обновить страницу</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.errorContainer {
  // background: var(--background-soft);
  position: fixed;
  top: 20px;
  right: 20px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  // width: fit-content;
  // height: fit-content;

  // padding: 20px;
  border-radius: 8px;
  color: var(--tertiary);
  z-index: var(--z-error);
}
.errorComponent {
  padding: 10px 20px;
  border-radius: 8px;
  background: var(--background-soft);
  box-shadow: var(--dp-1);
}
</style>
