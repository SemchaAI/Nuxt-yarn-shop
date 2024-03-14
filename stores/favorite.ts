import type { IProduct } from '@/models/IProduct';

export const useFavoriteStore = defineStore('favorite', () => {
  const state = ref({
    items: [] as IProduct[],
  });
  const inFavorite = computed(() => state.value.items.length);
  function init() {
    const favoriteItem = localStorage.getItem('favorite');
    if (favoriteItem !== null) {
      state.value.items = JSON.parse(favoriteItem);
    } else {
      localStorage.setItem('favorite', '[]');
    }
  }
  function addFavorite(product: IProduct) {
    console.log('addFavorite');
    const items = state.value.items;
    items.push(product);
    localStorage.setItem('favorite', JSON.stringify(items));
  }
  function removeFavorite(product: IProduct) {
    console.log('removeFavorite');
    state.value.items = state.value.items.filter(
      (item) => item._id !== product._id
    );
    localStorage.setItem('favorite', JSON.stringify(state.value.items));
  }
  function isFavorite(product: IProduct) {
    const items = state.value.items;
    return items.some((e) => e._id === product._id);
  }

  function favoriteHandler(product: IProduct) {
    console.log('here', product);
    if (localStorage.getItem('favorite')) {
      console.log('here x2');
      isFavorite(product) ? removeFavorite(product) : addFavorite(product);
    }
  }

  return {
    state,
    inFavorite,
    init,
    isFavorite,
    removeFavorite,
    favoriteHandler,
  };
});
