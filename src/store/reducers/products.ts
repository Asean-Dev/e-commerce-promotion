import { createReducer } from "@reduxjs/toolkit";
import * as Actions from "../actions";
import { IProductsState } from "store/types";

const initialState: IProductsState = {
  products: [],
  productsCart: [],
  cartCheckOut: [],
  addToCart: {
    isAactive: false,
  },
  loading: false,
};

const adminReducer = createReducer(initialState, (builder) => {
  builder.addCase(Actions.fetchAllProcutSuccess, (state, action) => {
    state.products = action.payload.data;
  });
  builder.addCase(Actions.fetchAddToCartSuccess, (state, action) => {
    state.addToCart = action.payload.data;
  });
  builder.addCase(Actions.fetchAllProductsCartSuccess, (state, action) => {
    state.productsCart = action.payload.data;
  });
  builder.addCase(Actions.fetchAllCartCheckOutSuccess, (state, action) => {
    state.cartCheckOut = action.payload.data;
  });
});

export default adminReducer;
