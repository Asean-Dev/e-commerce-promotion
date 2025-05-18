import { IProductsCart } from "store/types";
import {
  CampaignType,
  CouponFixedParams,
  CouponPercentageParams,
  DiscountDetailType,
  FinalPriceResult,
  OnTopCategoryParams,
  OnTopPointsParams,
  SeasonalParams,
} from "./types";
import { MapTitleDes } from "./_mock";

type Campaign = CampaignType;

// ----- Coupon -----
function applyCouponDiscount(
  total: number,
  campaign: Extract<Campaign, { type: "CouponFixed" | "CouponPercentage" }>
): {
  total: number;
  amount: number;
  type: "CouponFixed" | "CouponPercentage";
  campaign: typeof campaign;
} {
  switch (campaign.type) {
    case "CouponFixed": {
      const discount = campaign.parameters.amount;
      return {
        total: total - discount,
        amount: discount,
        type: campaign.type,
        campaign,
      };
    }
    case "CouponPercentage": {
      const discount = total * (campaign.parameters.percentage / 100);
      return {
        total: total - discount,
        amount: discount,
        type: campaign.type,
        campaign,
      };
    }
  }
}

// ----- OnTop -----

function applyOnTopDiscount(
  products: IProductsCart[],
  total: number,
  campaign: Extract<Campaign, { type: "OnTopPoints" | "OnTopCategory" }>,
  coupon:
    | Extract<Campaign, { type: "CouponFixed" | "CouponPercentage" }>
    | undefined
): {
  total: number;
  amount: number;
  type: "OnTopPoints" | "OnTopCategory";
  campaign: typeof campaign;
} {
  switch (campaign.type) {
    case "OnTopCategory": {
      const { category, percentage } =
        campaign.parameters as OnTopCategoryParams;

      const matchedItems = products.filter(
        (item) => item.category === category
      );

      const cartPrice = matchedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const totalCartPrice = products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      let basePrice = cartPrice;

      console.log("debug cartPricecartPrice", cartPrice);

      if (coupon && coupon.type === "CouponFixed") {
        const proportionDiscount =
          (cartPrice / totalCartPrice) * coupon.parameters.amount;
        basePrice = Math.max(0, cartPrice - proportionDiscount);
      }

      if (coupon && coupon.type === "CouponPercentage") {
        basePrice = cartPrice * (1 - coupon.parameters.percentage / 100);
      }

      const discount = basePrice * (percentage / 100);

      return {
        total: totalCartPrice - discount,
        amount: discount,
        type: campaign.type,
        campaign,
      };
    }

    case "OnTopPoints": {
      const { points } = campaign.parameters as OnTopPointsParams;
      const maxDiscount = total * 0.2;
      const discount = Math.min(points, maxDiscount);

      return {
        total: total - discount,
        amount: discount,
        type: campaign.type,
        campaign,
      };
    }
  }
}

// ----- Seasonal -----
function applySeasonalDiscount(
  total: number,
  campaign: Extract<Campaign, { type: "Seasonal" }>
): { total: number; amount: number; type: "Seasonal" } {
  const { everyX, discountY } = campaign.parameters as SeasonalParams;
  const times = Math.floor(total / everyX);

  const discount = times * discountY;

  return {
    total: total - discount,
    amount: discount,
    type: campaign.type,
  };
}

export function calculateFinalPrice(
  cart: IProductsCart[],
  campaigns: Campaign[] | undefined,
  couponCode?: string
): FinalPriceResult {
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log("debug total", total);
  console.log("debug cart", cart);

  let DiscountDetail: DiscountDetailType[] = [];

  const coupon = campaigns?.find(
    (c) => c.type === "CouponFixed" || c.type === "CouponPercentage"
  ) as
    | Extract<Campaign, { type: "CouponFixed" | "CouponPercentage" }>
    | undefined;

  const isOnTopCategory = (c: Campaign) =>
    c.type === "OnTopCategory" &&
    cart.some((item) => item.category === c.parameters.category);

  const isOnTopPoints = (c: Campaign) => c.type === "OnTopPoints";

  const onTop = campaigns?.find(
    (c) => isOnTopCategory(c) || isOnTopPoints(c)
  ) as Extract<Campaign, { type: "OnTopCategory" | "OnTopPoints" }> | undefined;

  const seasonal = campaigns?.find((c) => c.type === "Seasonal") as
    | Extract<Campaign, { type: "Seasonal" }>
    | undefined;

  if (coupon) {
    console.log("debug coupon");
    const data = applyCouponDiscount(total, coupon);
    total = data.total;
    if (data.type == "CouponPercentage") {
      const parameter = data.campaign.parameters as CouponPercentageParams;
      DiscountDetail.push({
        type: data.type,
        amount: data.amount,
        description: `${parameter.percentage}% Discount`,
      });
    } else {
      DiscountDetail.push({
        type: data.type,
        amount: data.amount,
        description: MapTitleDes[data.type],
      });
    }
    data.campaign.parameters;
  }

  if (onTop) {
    const data = applyOnTopDiscount(cart, total, onTop, coupon);
    total = data.total;
    const parameters = data.campaign.parameters as OnTopCategoryParams;
    DiscountDetail.push({
      type: data.type,
      amount: data.amount,
      description:
        data.type == "OnTopCategory"
          ? `Category ${parameters.category} ${parameters.percentage}% ${
              MapTitleDes[data.type]
            }`
          : MapTitleDes[data.type],
    });
  }

  if (seasonal) {
    const data = applySeasonalDiscount(total, seasonal);
    total = data.total;
    DiscountDetail.push({
      type: data.type,
      amount: data.amount,
      description: MapTitleDes[data.type],
    });
  }

  return { total: Math.max(total, 0), discounts: DiscountDetail };
}
