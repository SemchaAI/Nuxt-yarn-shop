<script setup lang="ts">
import ModalType from '@/components/modal/type.vue';
import ModalBrand from '@/components/modal/brand.vue';
import ModalProduct from '@/components/modal/product.vue';
import { useModal } from 'vue-final-modal';

const ModalTypeInstance = useModal({
  component: ModalType,
  attrs: {
    onConfirm() {
      ModalTypeInstance.close();
    },
  },
});
const ModalBrandInstance = useModal({
  component: ModalBrand,
  attrs: {
    onConfirm() {
      ModalBrandInstance.close();
    },
  },
});
const ModalProductInstance = useModal({
  component: ModalProduct,
  attrs: {
    onConfirm() {
      ModalProductInstance.close();
    },
  },
});
</script>

<template>
  <section class="admin">
    <div class="wrapper">
      <div class="adminContainer">
        <h1 class="adminTitle">Admin Panel</h1>
        <div class="adminContent">
          <div class="adminBlock">
            <ButtonsMainBtn
              version="contain"
              @click="ModalTypeInstance.open"
              >Add type
            </ButtonsMainBtn>
          </div>
          <div class="adminBlock">
            <ButtonsMainBtn
              disabled
              version="contain"
              @click="ModalBrandInstance.open"
              >Add Brand</ButtonsMainBtn
            >
          </div>
          <div class="adminBlock">
            <ButtonsMainBtn
              version="contain"
              @click="ModalProductInstance.open"
              >Add Product</ButtonsMainBtn
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.admin {
  margin-top: 40px;
}
.adminTitle {
  text-align: center;
}
.adminContent {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.adminBlock {
  display: flex;
}
</style>
