<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/product';
import { EStatus } from '@/models/IProduct';

const productsStore = useProductsStore();
const { page, total, state } = storeToRefs(productsStore);
const nextPage = () => {
  if (total.value > page.value) {
    productsStore.setPage(Number(page.value) + 1);
  }
};
const prevPage = () => {
  if (page.value > 1) {
    productsStore.setPage(Number(page.value) - 1);
  }
};
const toPage = (page: number) => {
  if (page <= total.value && page > 0) {
    productsStore.setPage(page);
  }
};
console.log(state.value.status === EStatus.SUCCESS);
</script>
<template>
  <div
    v-if="state.status === EStatus.SUCCESS"
    class="paginationContainer"
  >
    <button
      class="paginationListBtn"
      @click.prevent="prevPage"
    >
      <IconsChevronLeft />
    </button>
    <ul class="paginationList">
      <li
        :key="i"
        v-for="i in total"
      >
        <button
          class="paginationListBtn"
          :class="page === i ? 'active' : ''"
          @click.prevent="toPage(i)"
        >
          {{ i }}
        </button>
      </li>
    </ul>
    <button
      class="paginationListBtn"
      @click.prevent="nextPage"
    >
      <IconsChevronRight />
    </button>
  </div>
  <div
    v-else
    class="fakePagination skeleton"
  >
    No products
  </div>
</template>

<style scoped lang="scss">
.paginationContainer {
  display: flex;
  justify-content: center;
  color: var(--on-background);

  @include btnTypo;
}
.paginationList {
  display: flex;
  gap: 5px;
  padding: 0 10px;
}
.paginationListBtn {
  @include flexCentered;
  @include transition;
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 50%;
  @include colorMix(primary);
  &:hover,
  &:focus {
    background-color: var(--primary-focused);
  }
}
.active {
  @include colorMix(secondary);
}

.skeleton {
  width: 100%;
  background-color: var(--on-white-skeleton);
  color: var(--on-white-skeleton);
  cursor: none;
  border-radius: 20px;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    var(--on-white-skeleton);
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}
.fakePagination {
  padding: 5px 20px;
  width: 300px;
  height: 35px;
  margin: 0 auto;
}
</style>
