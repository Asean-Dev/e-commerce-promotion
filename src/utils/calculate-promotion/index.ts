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
  campaign: Extract<Campaign, { type: "OnTopCategory" | "OnTopPoints" }>,
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

      let cartPrice = 0;
      matchedItems.forEach((e) => (cartPrice += e.price));

      if (matchedItems) {
        console.log("debug cartPrice", cartPrice);
        let price = cartPrice;
        if (coupon) {
          if (coupon.type == "CouponPercentage") {
            price -= cartPrice * (coupon.parameters.percentage / 100);
          } else {
            total += coupon.parameters.amount;
            console.log("debug total", total);

            const proportion = (cartPrice / total) * coupon.parameters.amount;
            console.log("debug proportion", proportion);
            console.log("debug percentage", percentage);
            price = proportion;
          }
        }
        console.log("debug price", price);

        const discount = price * (percentage / 100);
        return {
          total: total - discount,
          amount: discount,
          type: campaign.type,
          campaign,
        };
      }
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
  campaigns: Campaign[],
  couponCode?: string
): FinalPriceResult {
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  let DiscountDetail: DiscountDetailType[] = [];

  const coupon = campaigns.find(
    (c) =>
      (c.type === "CouponFixed" || c.type === "CouponPercentage") &&
      "code" in c &&
      c.code === couponCode
  ) as
    | Extract<Campaign, { type: "CouponFixed" | "CouponPercentage" }>
    | undefined;

  const isOnTopCategory = (c: Campaign) =>
    c.type === "OnTopCategory" &&
    cart.some((item) => item.category === c.parameters.category);

  const isOnTopPoints = (c: Campaign) => c.type === "OnTopPoints";

  const onTop = campaigns.find(
    (c) => isOnTopCategory(c) || isOnTopPoints(c)
  ) as Extract<Campaign, { type: "OnTopCategory" | "OnTopPoints" }> | undefined;

  const seasonal = campaigns.find((c) => c.type === "Seasonal") as
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
  console.log("DISCOUNT10", total);
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
