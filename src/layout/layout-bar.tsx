"use client";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, Container, IconButton, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Cart } from "./cart";
import { useBoolean } from "hooks/use-boolean";
import { useAppDispatch, useAppSelector } from "hooks/use-redux";
import * as Action from "store/actions";
import { getProductsQuatityFromLocalStorage } from "utils/local-storage";

export function LayoutBar() {
  const onOpen = useBoolean(false);
  const ripple = useBoolean(false);

  const [quantityStorage, setQuantityStorageStorage] = useState(0);

  const dispatch = useAppDispatch();

  const { isAactive, quantity } = useAppSelector(
    (state) => state.products.addToCart
  );

  const handleAddCart = () => {
    ripple.onTrue();
    setTimeout(() => ripple.onFalse(), 500);
  };

  const handleOpenCart = useCallback(() => {
    onOpen.onTrue();
  }, [onOpen]);

  useEffect(() => {
    if (isAactive) {
      handleAddCart();
    }
    setQuantityStorageStorage(getProductsQuatityFromLocalStorage());
    setTimeout(() => {
      dispatch(
        Action.fetchAddToCartSuccess({
          data: { isAactive: false, quantity: quantity || quantityStorage },
        })
      );
    }, 1000);
  }, [isAactive, onOpen.value]);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        boxShadow: (theme) => `0px 4px 20px ${theme.palette.divider}`,
        width: "100%",
        backgroundColor: "white",
        height: "60px",
        display: "flex",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: 1,
          }}
        >
          <Typography variant="h6" fontWeight={800}>
            Assignment #1
          </Typography>
          <Box position="relative" onClick={handleOpenCart}>
            <AnimatePresence>
              {ripple.value && (
                <motion.div
                  key="ripple"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "red",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                />
              )}
            </AnimatePresence>

            <IconButton>
              <Badge badgeContent={quantityStorage} color="primary">
                <ShoppingCartIcon sx={{ color: "#000" }} />
              </Badge>
            </IconButton>
          </Box>
        </Box>
        <Cart
          onOpen={onOpen}
          quantity={quantityStorage}
          setQuantityStorageStorage={setQuantityStorageStorage}
        />
      </Container>
    </Box>
  );
}
