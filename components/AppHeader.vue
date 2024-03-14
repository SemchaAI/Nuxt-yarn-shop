<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const userStore = useUserStore();
const cartStore = useCartStore();

const { state, isAdmin } = storeToRefs(userStore);

onMounted(async () => {
  console.log('isAuth', state.value.isAuth);
  if (localStorage.getItem('auth')) {
    await userStore.checkAuth();
  }
  console.log('isAuth', state.value.isAuth);
  if (state.value.isAuth) {
    await cartStore.getCartProducts(state.value.user.id);
  }
});

const logoutHandler = async () => {
  await userStore.logout();
  cartStore.setCartProducts([]);
};
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <div class="headerContainer">
        <LinksMain
          class="logoLink headerBlock"
          to="/"
          >LOGO</LinksMain
        >
        <div
          v-if="state.isAuth && !state.isLoading"
          class="user headerBlock"
        >
          {{ state.user.name }}
          <ButtonsMainBtn
            version="contain"
            @click.prevent="logoutHandler"
            >Logout</ButtonsMainBtn
          >
        </div>
        <div
          class="loadingSpinner"
          v-if="false"
        >
          <!-- <LoadingSpinner /> -->
        </div>
        <div class=""></div>
        <HeaderNavigation :isAdmin="isAdmin" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--background-soft);
  box-shadow: var(--dp-0);
  position: sticky;
  top: 0;
  z-index: var(--header);
}

.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
.headerBlock {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
}

.loadingSpinner {
  display: flex;
  width: 80px;
  height: 160px;
}

.logoLink {
  color: var(--primary);
  justify-content: flex-start;
}

.user {
  color: var(--on-background);
  align-items: center;
  gap: 20px;
}
</style>
