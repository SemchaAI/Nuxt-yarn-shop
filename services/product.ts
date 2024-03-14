import type {
  ITypeDTO,
  IType,
  IProduct,
  IProductList,
} from '@/models/IProduct';
import { PRODUCT_ROUTE, PRODUCT_ROUTE_TYPE } from '@/utils/consts';

export type TProductDTO = Omit<IProduct, '_id'>;

export const ProductService = {
  async getAll(
    brandId: string,
    typeId: string,
    page: number,
    limit = 6,
    title: string
  ) {
    const http = server();
    const tmp = await http<IProductList>(PRODUCT_ROUTE, {
      params: {
        brandId,
        typeId,
        limit,
        page,
        title,
      },
    });
    console.log(tmp);
    return tmp;
  },
  async create(body: TProductDTO) {
    const http = server();
    return http<TProductDTO>(PRODUCT_ROUTE, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('auth')}`,
      },
    });
  },
  async getOne(id: string) {
    const http = server();
    return await http<IProduct>(PRODUCT_ROUTE + '/' + id);
  },
  // TYPES

  async createType(type: ITypeDTO) {
    const http = server();
    return await http<ITypeDTO>(PRODUCT_ROUTE_TYPE, {
      method: 'POST',
      body: type,
    });
  },
  async getTypes() {
    const http = server();
    return await http<IType[]>(PRODUCT_ROUTE_TYPE);
  },
  // INFOS
};
