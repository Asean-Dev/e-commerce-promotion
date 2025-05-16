"use client";

import { Box, Card, Grid, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/use-redux";
import { MainContainer } from "modules/components";
import { useEffect } from "react";
import * as Action from "store/actions";

export function CheckOutView() {
  const dispatch = useAppDispatch();
  const { cartCheckOut } = useAppSelector((state) => state.products);
  console.log("cartCheckOut", cartCheckOut);
  const theme = useTheme();
  const colors = theme.palette;

  console.log("colors", colors);

  useEffect(() => {
    dispatch(Action.fetchAllCartCheckOut());
  }, [dispatch]);

  return (
    <MainContainer>
      <Grid container spacing={2}>
        <Grid size={7}>
          <Card sx={{ padding: 2 }}>
            {cartCheckOut.map((product) => {
              return (
                <Box
                  key={product.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 2,
                    backgroundColor: colors.primary.main,
                    borderRadius: "8px",
                    marginBottom: 2,
                  }}
                >
                  <h1>{product.name}</h1>
                  <h1>{product.price}</h1>
                  <h1>{product.quantity}</h1>
                </Box>
              );
            })}
          </Card>
        </Grid>
        <Grid size={5}>
          <Card sx={{ padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
                backgroundColor: colors.primary.main,
                borderRadius: "8px",
              }}
            >
              <h1>Check Out</h1>
              <h1>Total Price</h1>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </MainContainer>
  );
}
