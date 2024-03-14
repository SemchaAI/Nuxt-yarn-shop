<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

// defineProps<{
//   title?: string
// }>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1>Добавить тип</h1>
    <form>
      <div class="field">
        <div><label for="type">Брэнд продукта:</label></div>
        <input placeholder="Введите название типа" type="еу" id="type" required />
      </div>
    </form>
    <div class="ModalControls">
      <button @click="emit('confirm')">Добавить</button>
      <button @click="emit('confirm')">Закрыть</button>
    </div>
  </VueFinalModal>
</template>
