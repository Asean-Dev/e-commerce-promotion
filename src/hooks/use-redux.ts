import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState } from "store/reducers";
import type { store } from "store";

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
