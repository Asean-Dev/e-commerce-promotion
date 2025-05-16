import { all, fork } from "redux-saga/effects";

import { watchProduct } from "./products";

export default function* rootSaga() {
  yield all([fork(watchProduct)]);
}
