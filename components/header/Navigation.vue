<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { useFavoriteStore } from '@/stores/favorite';

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
const { inCart } = storeToRefs(cartStore);
const { inFavorite } = storeToRefs(favoriteStore);

defineProps({
  isAdmin: Boolean,
});
</script>
<template>
  <nav class="headerNav">
    <LinksMain
      v-if="isAdmin"
      to="/admin"
      >Admin</LinksMain
    >
    <LinksMain
      class="relativeBlock"
      to="cart"
      >Cart
      <Transition
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__bounceIn"
      >
        <div
          :key="inCart"
          class="badge"
          v-if="inCart"
        >
          {{ inCart }}
        </div>
      </Transition>
    </LinksMain>
    <LinksMain
      class="relativeBlock"
      to="favorite"
    >
      Favorite
      <Transition
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__bounceIn"
      >
        <div
          :key="inFavorite"
          class="badge"
          v-if="inFavorite"
        >
          {{ inFavorite }}
        </div>
      </Transition>
    </LinksMain>
    <LinksMain to="login">Sign in/up</LinksMain>
  </nav>
</template>

<style scoped lang="scss">
.headerNav {
  width: 100%;

  display: flex;
  justify-content: flex-end;
  flex-grow: 1;

  gap: 20px;
}
.relativeBlock {
  display: flex;
  position: relative;
}
.badge {
  position: absolute;
  top: -20px;
  right: -20px;

  display: flex;
  width: 24px;
  height: 24px;
  padding: 2px 4px;

  justify-content: center;
  align-self: center;

  @include body2Typo;

  color: var(--on-primary);
  background: var(--primary);
  border-radius: 50%;
}
</style>
