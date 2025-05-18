import { CampaignType } from "./types";

export const campaigns: CampaignType[] = [
  {
    id: "1",
    type: "CouponFixed",
    code: "DISCOUNT1000",
    parameters: {
      amount: 1000,
    },
  },
  {
    id: "2",
    type: "CouponFixed",
    code: "DISCOUNT200",
    parameters: {
      amount: 200,
    },
  },
  {
    id: "3",
    type: "CouponPercentage",
    code: "DISCOUNT10",
    parameters: {
      percentage: 10,
    },
  },
  {
    id: "4",
    type: "OnTopPoints",
    parameters: {
      points: 100,
    },
  },
  {
    id: "5",
    type: "OnTopCategory",
    parameters: {
      category: "Electronics",
      percentage: 20,
    },
  },
  {
    id: "6",
    type: "OnTopCategory",
    parameters: {
      category: "Clothing",
      percentage: 15,
    },
  },
  {
    id: "7",
    type: "Seasonal",
    parameters: {
      everyX: 300,
      discountY: 40,
    },
  },
];
export const renderCampaignDescription = (campaign: CampaignType) => {
  const { type, parameters } = campaign;

  switch (type) {
    case "CouponFixed":
      return `Fixed discount of ${parameters.amount} THB. Code: ${campaign.code}`;

    case "CouponPercentage":
      return `Discount of ${parameters.percentage}% on total price. Code: ${campaign.code}`;

    case "OnTopPoints":
      return `Use ${parameters.points} points for additional discount`;

    case "OnTopCategory":
      return `Get ${parameters.percentage}% off on ${parameters.category} category`;

    case "Seasonal":
      return `Get ${parameters.discountY} THB off for every ${parameters.everyX} THB spent`;

    default:
      return "Unknown campaign type";
  }
};

export const MapTitleDes = {
  CouponFixed: "Fixed Amount Discount",
  CouponPercentage: "Percentage-based Discount",
  OnTopCategory: "Discount",
  OnTopPoints: "Points Redemption Discount",
  Seasonal: "Seasonal Promotion",
};
