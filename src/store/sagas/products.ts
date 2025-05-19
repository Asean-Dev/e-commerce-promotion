import { put, takeLatest } from "redux-saga/effects";
import * as Actions from "../actions";
import { DATA_PRODUCTS } from "store/_mock/products";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IAddToCartAction,
  ICartItem,
  IProductsAction,
  IProductsCart,
} from "store/types";
import { addToCart } from "utils/local-storage";

function* fetchAllProductSaga(
  action: PayloadAction<IProductsAction>
): Generator {
  try {
    const { categoryId = "", search = "" } = action.payload;

    let filteredProducts = DATA_PRODUCTS;

    if (categoryId) {
      filteredProducts = filteredProducts.filter(
        (item) => item.categoryId === categoryId
      );
    }

    if (search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    yield put(
      Actions.fetchAllProcutSuccess({
        data: filteredProducts,
      })
    );
  } catch (error: unknown) {}
}

function* fetchAddToCartSaga(
  action: PayloadAction<IAddToCartAction>
): Generator {
  try {
    const { id } = action.payload;
    const data = yield addToCart(id);
    const cartRaw = localStorage.getItem("_cart");
    const cart = cartRaw ? JSON.parse(cartRaw) : [];

    let quantity = 0;

    cart.forEach((item: any) => {
      quantity += item.quantity;
    });

    yield put(
      Actions.fetchAddToCartSuccess({
        data: { isAactive: data, quantity: quantity },
      })
    );
  } catch (error: unknown) {}
}

function* fetchAllProductsCartSaga(): Generator {
  try {
    const cartRaw = localStorage.getItem("_cart");
    const cart: ICartItem[] = cartRaw ? JSON.parse(cartRaw) : [];

    const enrichedCartItems = cart
      .map((item) => {
        const product = DATA_PRODUCTS.find(
          (product) => product.id === item.productId
        );
        return {
          id: product?.id,
          name: product?.name,
          description: product?.description,
          image: product?.image,
          price: product?.price,
          quantity: item.quantity,
        };
      })
      .filter(Boolean) as IProductsCart[];

    yield put(
      Actions.fetchAllProductsCartSuccess({
        data: enrichedCartItems,
      })
    );
  } catch (error: unknown) {}
}

function* fetchAllCartCheckOutSaga(): Generator {
  try {
    const cartRaw = localStorage.getItem("_cart_check_out");
    const parsed = cartRaw ? JSON.parse(cartRaw) : null;

    const cart: ICartItem[] = parsed?.cart ?? [];

    const enrichedCartItems = cart
      .map((item) => {
        const product = DATA_PRODUCTS.find(
          (product) => product.id === item.productId
        );

        if (!product) return null;

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          quantity: item.quantity,
          category: product.category,
        };
      })
      .filter(Boolean) as IProductsCart[];

    yield put(
      Actions.fetchAllCartCheckOutSuccess({
        data: enrichedCartItems,
      })
    );
  } catch (error: unknown) {}
}

export function* watchProduct() {
  yield takeLatest(Actions.fetchAllProcut.type, fetchAllProductSaga);
  yield takeLatest(Actions.fetchAddToCart.type, fetchAddToCartSaga);
  yield takeLatest(Actions.fetchAllProductsCart.type, fetchAllProductsCartSaga);
  yield takeLatest(Actions.fetchAllCartCheckOut.type, fetchAllCartCheckOutSaga);
}
