<script lang="ts" setup>
import type { IProduct } from '~/models/IProduct';

const favoriteStore = useFavoriteStore();

const url = import.meta.env.VITE_BASE_URL_BD;

const favoriteArr = ref([]) as Ref<IProduct[]>;

const removeHandler = (item: IProduct) => {
  favoriteStore.removeFavorite(item);
  favoriteArr.value = JSON.parse(localStorage.getItem('favorite') || '[]');
};

onMounted(() => {
  favoriteArr.value = JSON.parse(localStorage.getItem('favorite') || '[]');
});
</script>

<template>
  <section class="favorite">
    <div class="wrapper">
      <div class="favoriteContainer">
        <h1 class="favoriteTitle">Избранное</h1>
        <div
          v-if="favoriteArr.length > 0"
          class="favoriteBlock"
        >
          <ul
            v-auto-animate
            class="favoriteItems"
          >
            <li
              class="favoriteItem"
              v-for="item in favoriteArr"
              :key="item._id"
            >
              <div class="favoriteItemContainer">
                <LinksMain
                  class="productLink"
                  :to="`/product/${item._id}`"
                >
                  <img
                    width="200"
                    height="200"
                    class="favoriteItemImg"
                    :src="url + '/' + item.img"
                    :alt="item.title"
                  />
                </LinksMain>
                <div class="favoriteItemInfo">
                  <div class="favoriteItemTitle">{{ item.title }}</div>
                  <div class="favoriteItemDescription">
                    {{ item.description }}
                  </div>
                  <div class="favoriteControls">
                    <div class="favoriteItemPrice">
                      <span>Цена:</span>{{ item.price }}<b>MDL</b>
                    </div>
                    <ButtonsMainBtn
                      @click="removeHandler(item)"
                      version="outline"
                      :icon="true"
                      class="favoriteItemBtn"
                    >
                      <IconsClose
                        width="24"
                        height="24"
                        class="favoriteItemBtnIcon"
                      />
                    </ButtonsMainBtn>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div
          v-else
          class="emptyFavorite"
        >
          Избранного нет
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.favorite {
  margin-top: 40px;
}
.favoriteContainer {
}
.favoriteTitle {
  @include headline3Typo;
}
.favoriteBlock {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}
.favoriteItems {
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}
.favoriteItem {
  width: fit-content;
  max-width: 360px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background-color: var(--tertiary);
  box-shadow: var(--dp-0);
}
.favoriteItemContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.favoriteItemImg {
  border-radius: 8px;
  @include transition;
  &:hover {
    transform: scale(1.2);
  }
}
.favoriteItemInfo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--surface);
}
.favoriteItemTitle {
  max-width: 300px;
}
.favoriteItemDescription {
  max-width: 300px;
  @include smartText(5lh);
  @include body2Typo;
  color: var(--on-primary-medium-accent);
}
.favoriteControls {
  display: flex;
  justify-content: space-between;
}
.favoriteItemPrice {
  display: flex;
  align-items: center;
  gap: 5px;
  & b {
    font-weight: bold;
  }
}

.favoriteItemBtn {
  display: flex;
}
.favoriteItemBtnIcon {
}
.emptyFavorite {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
