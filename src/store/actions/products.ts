import { createAction } from "@reduxjs/toolkit";
import {
  IAddToCartAction,
  IProducts,
  IProductsAction,
  IProductsCart,
} from "store/types";

export const fetchAllProcut =
  createAction<IProductsAction>("FETCH_ALL_PRODUCT");

export const fetchAllProcutSuccess = createAction<{
  data: IProducts[];
}>("FETCH_ALL_PRODUCT_SUCCESS");

export const fetchAddToCart =
  createAction<IAddToCartAction>("FETCH_ADD_TO_CART");

export const fetchAddToCartSuccess = createAction<{
  data: {
    isAactive: boolean;
    quantity: number;
  };
}>("FETCH_ADD_TO_CART_SUCCESS");

export const fetchAllProductsCart = createAction("FETCH_ALL_PRODUCTS_CART");

export const fetchAllProductsCartSuccess = createAction<{
  data: IProductsCart[];
}>("FETCH_ALL_PRODUCTS_CART_SUCCESS");

export const fetchAllCartCheckOut = createAction("FETCH_ALL_CART_CHECK_OUT");

export const fetchAllCartCheckOutSuccess = createAction<{
  data: IProductsCart[];
}>("FETCH_ALL_CART_CHECK_OUT_SUCCESS");
