<script setup>
// import 'animate.css';

import { ModalsContainer } from 'vue-final-modal';

useSeoMeta({
  title: 'Nuxt ts shop',
  description: 'test home page',
});

const errorStore = useErrorStore();
const favoriteStore = useFavoriteStore();

const { state, isCritical, isError } = storeToRefs(errorStore);

onMounted(() => {
  favoriteStore.init();
});
</script>

<template>
  <div id="app">
    <AppHeader />
    <main class="main">
      <NuxtPage />
    </main>
    <AppFooter />
    <ModalsContainer />
    <ErrorComponent
      v-if="isError"
      :errors="state.errors"
    />
  </div>
</template>

<style scoped lang="scss">
.main {
  flex-grow: 1;
}
</style>
