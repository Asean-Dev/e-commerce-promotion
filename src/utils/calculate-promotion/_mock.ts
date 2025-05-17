import { CampaignType } from "./types";

export const campaigns: CampaignType[] = [
  {
    type: "CouponFixed",
    code: "DISCOUNT1000",
    parameters: {
      amount: 1000,
    },
  },
  {
    type: "CouponPercentage",
    code: "DISCOUNT10",
    parameters: {
      percentage: 10,
    },
  },
  {
    type: "OnTopCategory",
    parameters: {
      category: "Clothing",
      percentage: 15,
    },
  },
  {
    type: "OnTopPoints",
    parameters: {
      points: 1000,
    },
  },
  {
    type: "Seasonal",
    parameters: {
      everyX: 300,
      discountY: 40,
    },
  },
];

export const MapTitleDes = {
  CouponFixed: "Fixed Amount Discount",
  CouponPercentage: "Percentage-based Discount",
  OnTopCategory: "Discount",
  OnTopPoints: "Points Redemption Discount",
  Seasonal: "Seasonal Promotion",
};
