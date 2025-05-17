"use client";

import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/use-redux";
import { MainContainer } from "modules/components";
import { useCallback, useEffect, useState } from "react";
import * as Action from "store/actions";
import ProductsList from "./products-list";

import { campaigns } from "utils/calculate-promotion/_mock";
import { calculateFinalPrice } from "utils/calculate-promotion";
import { FinalPriceResult } from "utils/calculate-promotion/types";
import { useRouter } from "next/navigation";

export function CheckOutView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();

  const { cartCheckOut } = useAppSelector((state) => state.products);
  const [finalTotal, setFinalTotal] = useState<FinalPriceResult>();
  const [couponCode, setCoupinCode] = useState("");

  let totalQuantity = 0;
  let totalSummary = 0;
  cartCheckOut.forEach((e) => {
    totalQuantity += e.quantity;
    totalSummary += e.price * e.quantity;
  });

  const hadleCouponCode = useCallback(() => {
    const filnalData = calculateFinalPrice(cartCheckOut, campaigns, couponCode);
    setFinalTotal(filnalData);
  }, [couponCode]);

  useEffect(() => {
    if (cartCheckOut) {
      const filnalData = calculateFinalPrice(cartCheckOut, campaigns, "");
      setFinalTotal(filnalData);
    }
  }, [cartCheckOut]);

  useEffect(() => {
    dispatch(Action.fetchAllCartCheckOut());
  }, [dispatch]);

  const hasCouponCode = !!couponCode;
  return (
    <MainContainer>
      <Grid container spacing={2}>
        <Grid size={7}>
          <Card sx={{ padding: 2 }}>
            <Stack direction={"column"} spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Check Out
              </Typography>
              <Divider />
              {cartCheckOut.map((product, index) => {
                return (
                  <Stack
                    direction={"column"}
                    spacing={2}
                    key={`${product.id}-${index}`}
                  >
                    <ProductsList product={product} />
                    {cartCheckOut.length != index + 1 && <Divider />}
                  </Stack>
                );
              })}
            </Stack>
          </Card>
          <Stack width={1} justifyContent={"flex-end"} mt={2}>
            <Button variant={"outlined"} onClick={() => router.push("/")}>
              Back to shop
            </Button>
          </Stack>
        </Grid>
        <Grid size={5} spacing={2}>
          <Card sx={{ padding: 2 }}>
            <Stack direction={"column"} spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Payment Summary
              </Typography>
              <Divider />
              <Stack
                direction={"row"}
                spacing={2}
                width={1}
                flex={1}
                justifyContent={"space-between"}
              >
                <TextField
                  fullWidth
                  variant={"outlined"}
                  size={"small"}
                  label={"Coupon code"}
                  onChange={(e) => setCoupinCode(e.target.value)}
                />
                <Button
                  sx={{ width: 0.5 }}
                  variant={"contained"}
                  size={"small"}
                  disabled={!hasCouponCode}
                  onClick={hadleCouponCode}
                >
                  Apply now
                </Button>
              </Stack>
              <Divider />
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={1}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Quantity
                </Typography>
                <Typography variant="body1">{totalQuantity}</Typography>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={1}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Order Summary
                </Typography>
                <Typography variant="body1">
                  {totalSummary.toLocaleString()} THB
                </Typography>
              </Stack>
              {finalTotal?.discounts.map(
                (item, index) =>
                  item.amount != 0 && (
                    <Stack
                      key={index.toString()}
                      direction={"row"}
                      justifyContent={"space-between"}
                      width={1}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {item.description}
                      </Typography>
                      <Typography variant="body1" color="primary">
                        - {item.amount.toLocaleString()}
                      </Typography>
                    </Stack>
                  )
              )}
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={1}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Total Summary
                </Typography>
                <Typography variant="body1">
                  {finalTotal?.total.toLocaleString()} THB
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </MainContainer>
  );
}
