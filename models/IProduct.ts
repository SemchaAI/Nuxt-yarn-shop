export interface IProduct {
  _id: string;
  title: string;
  price: number;
  // rating: number
  img: string;
  typeId: string;
  // brandId: string
  description: string;
  cnt: number;
  info: IInfo[];
  thumbnails: IThumbnails;
}
export interface IType {
  _id: string;
  name: string;
}
export interface ITypeDTO extends Omit<IType, '_id'> {}
export type TTypes = {
  options: IType[];
};

export interface IBrand {
  _id: string;
  name: string;
}

export interface IInfo {
  _id: string;
  title: string;
  description: string;
  productId: string;
}
export interface IThumbnails {
  _id: string;
  img: string[];
  productId: string;
}

export enum EStatus {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS,
}

export interface IProductList {
  products: IProduct[];
  total: number;
  page: number;
}
export type OmittedProductList = Omit<IProductList, 'total' | 'page'>;
