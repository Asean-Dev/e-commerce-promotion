export interface IProductsAction {
  categoryId?: string;
  search?: string;
}

export interface IAddToCartAction {
  id: string;
}

export interface IProducts {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  stock: number;
}

export interface IProductsCart {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IProductsState {
  products: IProducts[];
  productsCart: IProductsCart[];
  cartCheckOut: IProductsCart[];
  addToCart: {
    isAactive: boolean;
    quantity?: number;
  };
  loading: boolean;
}

export interface ICartItem {
  productId: string;
  quantity: number;
}
