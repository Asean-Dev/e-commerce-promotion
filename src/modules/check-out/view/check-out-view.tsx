"use client";

import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/use-redux";
import { MainContainer } from "modules/components";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Action from "store/actions";
import ProductsList from "../products-list";

import { useRouter } from "next/navigation";
import { calculateFinalPrice } from "utils/calculate-promotion";
import {
  campaigns,
  renderCampaignDescription,
} from "utils/calculate-promotion/_mock";
import {
  CampaignType,
  FinalPriceResult,
} from "utils/calculate-promotion/types";
import { CouponCard } from "../coupon-card";
import { usePopover } from "hooks/use-popover";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CloseIcon from "@mui/icons-material/Close";

export function CheckOutView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();
  const popover = usePopover();

  const { cartCheckOut } = useAppSelector((state) => state.products);
  const [finalTotal, setFinalTotal] = useState<FinalPriceResult>();
  const [couponCode, setCoupinCode] = useState("");
  const [myCampaigns, setMyCampaigns] = useState<CampaignType[] | undefined>();

  console.log("debug myCampaigns", myCampaigns);

  const { totalQuantity, totalSummary } = useMemo(() => {
    return cartCheckOut.reduce(
      (acc, item) => {
        acc.totalQuantity += item.quantity;
        acc.totalSummary += item.price * item.quantity;
        return acc;
      },
      { totalQuantity: 0, totalSummary: 0 }
    );
  }, [cartCheckOut]);

  const handleCouponCode = useCallback(() => {
    const findType = campaigns.filter(
      (item) => item.type == "CouponFixed" || item.type == "CouponPercentage"
    );
    const findCoupon = findType.find((e) => e.code === couponCode);
    setMyCampaigns((prev: CampaignType[] | undefined) => {
      if (!findCoupon) return prev ?? [];

      const safePrev = prev ?? [];

      const filtered = safePrev.filter(
        (c) => c.type !== "CouponFixed" && c.type !== "CouponPercentage"
      );

      return [...filtered, findCoupon];
    });
  }, [couponCode]);

  useEffect(() => {
    if (cartCheckOut) {
      const Seasonal = campaigns.find((e) => e.type === "Seasonal");

      setMyCampaigns((prev: CampaignType[] | undefined) => {
        if (!Seasonal) return prev ?? [];

        const safePrev = prev ?? [];

        const exists = safePrev.some((c) => c.type === Seasonal.type);

        return exists ? safePrev : [...safePrev, Seasonal];
      });
    }
  }, [cartCheckOut]);

  useEffect(() => {
    if (cartCheckOut && myCampaigns) {
      const finalData = calculateFinalPrice(cartCheckOut, myCampaigns, "");
      setFinalTotal(finalData);
    }
  }, [cartCheckOut, myCampaigns]);

  useEffect(() => {
    dispatch(Action.fetchAllCartCheckOut());
  }, [dispatch]);

  const hasCouponCode = !!couponCode;

  return (
    <MainContainer>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
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
        <Grid size={{ xs: 12, md: 5 }} spacing={2}>
          <Card sx={{ padding: 2 }}>
            <Stack direction={"column"} spacing={2}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Payment Summary
                </Typography>
                <IconButton onClick={popover.onOpen}>
                  <PriorityHighIcon sx={{ color: "primary.main" }} />
                </IconButton>
              </Stack>
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
                  onClick={handleCouponCode}
                >
                  Apply now
                </Button>
              </Stack>
              <CouponCard
                campaigns={campaigns}
                setMyCampaigns={setMyCampaigns}
              />
              {/* ////// */}
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
      <Popover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h6" gutterBottom>
              Available Campaigns
            </Typography>
            <IconButton onClick={popover.onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          {campaigns.map((e, idx) => (
            <Stack key={e.id}>
              <Typography variant="body1">
                {idx + 1} {renderCampaignDescription(e)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Popover>
    </MainContainer>
  );
}
