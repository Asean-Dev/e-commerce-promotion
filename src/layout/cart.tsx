import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { UseBooleanReturn } from "hooks/use-boolean";
import { useAppDispatch, useAppSelector } from "hooks/use-redux";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import * as Action from "store/actions";
import theme from "theme/theme";
import {
  addToCart,
  addToCartCheckOut,
  getProductsQuatityFromLocalStorage,
  removeAllFromCart,
  removeFromCart,
} from "utils/local-storage";
// ----------------------------------------------------------------------
type Props = {
  onOpen: UseBooleanReturn;
  quantity: number;
  setQuantityStorageStorage: (value: number) => void;
};
// ----------------------------------------------------------------------

export function Cart({ onOpen, quantity, setQuantityStorageStorage }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const { productsCart } = useAppSelector((state) => state.products);

  console.log("productsCart", productsCart);

  useEffect(() => {
    dispatch(Action.fetchAllProductsCart());
  }, [dispatch, onOpen.value]);

  useEffect(() => {
    if (productsCart.length > 0) {
      const allIds = productsCart.map((product) => product.id);
      setSelectedProductIds(allIds);
    }
  }, [productsCart]);

  const handleDeleteAll = (id: string) => {
    const success = removeAllFromCart(id);
    if (success) {
      setQuantityStorageStorage(getProductsQuatityFromLocalStorage());
      dispatch(Action.fetchAllProductsCart());
    }
  };
  const handleDeleteProduct = (id: string) => {
    const success = removeFromCart(id);
    if (success) {
      setQuantityStorageStorage(getProductsQuatityFromLocalStorage());
      dispatch(Action.fetchAllProductsCart());
    }
  };
  const handleAddProduct = (id: string) => {
    const success = addToCart(id);
    if (success) {
      setQuantityStorageStorage(getProductsQuatityFromLocalStorage());
      dispatch(Action.fetchAllProductsCart());
    }
  };

  const handleBuyNow = () => {
    const selectedProducts = productsCart.filter((product) =>
      selectedProductIds.includes(product.id)
    );
    const products = selectedProducts.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));
    const success = addToCartCheckOut(products);
    if (success) {
      onOpen.onFalse();
      router.push("/check-out");
      dispatch(Action.fetchAllCartCheckOut());
    }
  };

  return (
    <Drawer open={onOpen.value} onClose={onOpen.onToggle} anchor="right">
      <Stack
        direction={"column"}
        justifyItems={"center"}
        width={"400px"}
        p={2}
        gap={2}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          borderBottom={(theme) => `1px solid ${theme.palette.divider}`}
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h6" fontWeight={800}>
            Cart ({quantity})
          </Typography>
          <IconButton onClick={onOpen.onFalse}>
            <CloseIcon sx={{ color: "#000" }} />
          </IconButton>
        </Stack>
        {productsCart.map((product) => (
          <Stack
            key={product.id}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              <Checkbox
                checked={selectedProductIds.includes(product.id)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectedProductIds((prev) =>
                    checked
                      ? [...prev, product.id]
                      : prev.filter((id) => id !== product.id)
                  );
                }}
              />
              <img
                loading="lazy"
                style={{
                  width: "100px",
                  height: "80px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
                src={product.image}
              />
              <Stack direction={"column"}>
                <Typography variant={"body1"} fontWeight={600}>
                  {product.name}
                </Typography>
                <Typography
                  variant={"body1"}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 190,
                  }}
                >
                  {product.description}
                </Typography>
                <Typography variant={"body1"}> {product.price} THB</Typography>
                <Stack direction={"row"} spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      color: "text.secondary",
                      width: 100,
                    }}
                  >
                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      width={1}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Typography variant={"subtitle1"}>-</Typography>
                    </Stack>
                    <Divider orientation="vertical" variant="middle" flexItem />

                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      width={1}
                    >
                      <Typography variant={"subtitle1"}>
                        {product.quantity}
                      </Typography>
                    </Stack>
                    <Divider orientation="vertical" variant="middle" flexItem />

                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      width={1}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => handleAddProduct(product.id)}
                    >
                      <Typography variant={"subtitle1"}>+</Typography>
                    </Stack>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleDeleteAll(product.id)}>
                      <DeleteIcon
                        sx={{ color: "#000", width: 15, height: 15 }}
                      />
                    </IconButton>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        borderBottom={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{
          position: " fixed",
          bottom: 0,
          width: "400px",
          p: 2,
          backgroundColor: theme.palette.background.default,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          zIndex: 100,
        }}
      >
        <Stack direction={"row"} justifyContent={"flex-end"} width={1}>
          <Button
            variant={"contained"}
            onClick={handleBuyNow}
            disabled={!selectedProductIds.length}
          >
            Buy Now
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
