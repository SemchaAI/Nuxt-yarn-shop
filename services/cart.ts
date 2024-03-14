import type { IProduct } from '@/models/IProduct';
import { CART_ROUTE } from '@/utils/consts';

export type TProductDTO = Omit<IProduct, '_id'>;

export const CartService = {
  async getAll(userId: string) {
    const http = server();
    const tmp = await http(CART_ROUTE, {
      params: {
        userId,
      },
    });
    console.log(tmp);
    return tmp;
  },
  async addOne(userId: string, productId: string) {
    const http = server();
    const tmp = await http(CART_ROUTE + '/add', {
      method: 'POST',
      body: {
        userId,
        productId,
      },
    });
    console.log(tmp);
    return tmp;
  },
  async deleteOne(userId: string, productId: string) {
    const http = server();
    const tmp = await http(CART_ROUTE + '/delete', {
      method: 'DELETE',
      body: {
        userId,
        productId,
      },
    });
    console.log(tmp);
    return tmp;
  },
};
