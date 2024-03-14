<script lang="ts" setup>
const url = import.meta.env.VITE_BASE_URL_BD;

const cartStore = useCartStore();
const userStore = useUserStore();
const { state } = storeToRefs(userStore);
const { items, total } = storeToRefs(cartStore);

const removeHandler = async (id: string): Promise<void> => {
  await cartStore.deleteOne(state.value.user.id, id);
};
</script>

<template>
  <section class="cart">
    <div class="wrapper">
      <div class="cartContainer">
        <h1 class="cartTitle">Cart</h1>
        <div
          v-if="items.length > 0"
          class="cartBlock"
        >
          <ul
            v-auto-animate
            class="cartItems"
          >
            <li
              class="cartItem"
              v-for="item in items"
              :key="item._id"
            >
              <div class="cartItemContainer">
                <img
                  width="200"
                  height="200"
                  class="cartItemImg"
                  :src="url + '/' + item.img"
                  :alt="item.title"
                />
                <div class="cartItemInfo">
                  <div class="cartItemTitle">{{ item.title }}</div>
                  <div class="cartItemDescription">{{ item.description }}</div>
                  <div class="cartItemPrice">
                    <span>Цена:</span>{{ item.price }}<b>MDL</b>
                  </div>
                </div>
              </div>
              <ButtonsMainBtn
                version="outline"
                :icon="true"
                class="cartItemBtn"
                @click="removeHandler(item._id)"
              >
                <IconsClose
                  width="24"
                  height="24"
                  class="cartItemBtnIcon"
                />
              </ButtonsMainBtn>
            </li>
          </ul>
          <div class="cartOrder">
            <h3 class="cartTotalTitle">Итого</h3>
            <div class="cartTotal">{{ total }} MDL</div>
            <div class="cartDelivery">Доставка <span>бесплатно</span></div>
            <p class="cartPolicy">
              <span class="asterisk">*</span>Покупая у настовары вы соглашаетесь
              с политикой конфиденциальности
            </p>
            <LinksMain
              class="cartLink"
              to="order"
              >Order Now (temporal to home)</LinksMain
            >
          </div>
        </div>
        <div
          v-else-if="items.length === 0"
          class="emptyCart"
        >
          Корзина пуста
        </div>
        <div
          class="cartError"
          v-else
        >
          Ошибка. Корзина не была загружена
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cart {
  margin-top: 40px;
}
.cartContainer {
}
.cartTitle {
  @include headline3Typo;
}
.cartBlock {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}
.cartItems {
  width: 50%;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cartItem {
  width: 100%;
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background-color: var(--tertiary);
  box-shadow: var(--dp-0);
}
.cartItemContainer {
  display: flex;
  gap: 20px;
}
.cartItemTitle {
  max-width: 300px;
}
.cartItemDescription {
  max-width: 300px;
  @include smartText(5lh);
  @include body2Typo;
  color: var(--on-primary-medium-accent);
}
.cartItemImg {
  border-radius: 8px;
}
.cartItemInfo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--surface);
}
.cartItemPrice {
  display: flex;
  gap: 5px;
  & b {
    font-weight: bold;
  }
}
.cartItemBtn {
  display: flex;
}
.cartError {
}
.cartOrder {
  padding: 20px;
  max-height: 240px;
  // height: fit-content;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  border-radius: 8px;

  color: var(--tertiary);
  background-color: var(--background-soft);
  box-shadow: var(--dp-0);
}
.cartTotalTitle {
  @include headline4Typo;
  color: var(--primary);
}
.cartTotal {
  margin-top: 20px;
}
.cartDelivery {
}
.cartPolicy {
}
.asterisk {
  color: var(--error);
}
.cartLink {
}
.cartTotal {
}
.cartLink {
  margin-top: 20px;

  @include transition;

  color: var(--primary);
  &:hover,
  &:focus {
    color: var(--primary-focused);
  }
}

.emptyCart {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
