import type { IProduct } from '@/models/IProduct';
import { CartService } from '~/services/cart';

export const useCartStore = defineStore('cart', () => {
  const state = ref({
    _id: null as null | string,
    items: [] as IProduct[],
  });
  // const userId = computed(() => user.state.user.id)
  const items = computed(() => state.value.items);
  const inCart = computed(() => state.value.items.length);
  const total = computed(() =>
    state.value.items.map((item) => item.price).reduce((a, b) => a + b, 0)
  );

  function setCartProducts(arr: IProduct[]) {
    state.value.items = arr;
  }
  function isInCart(_id: string) {
    const event = (item: IProduct) => item._id === _id;
    return state.value.items.some(event);
  }

  async function getCartProducts(userId: string) {
    try {
      const response = await CartService.getAll(userId);
      setCartProducts(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  async function addOne(userId: string, productId: string) {
    try {
      const response = await CartService.addOne(userId, productId);
      const products = await CartService.getAll(userId);
      setCartProducts(products);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  async function deleteOne(userId: string, productId: string) {
    try {
      console.log('-----------', userId, productId);
      const response = await CartService.deleteOne(userId, productId);
      const products = await CartService.getAll(userId);
      setCartProducts(products);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  return {
    state,
    items,
    total,
    inCart,
    isInCart,
    getCartProducts,
    setCartProducts,
    addOne,
    deleteOne,
  };
});
