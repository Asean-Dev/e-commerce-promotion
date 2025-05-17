type Category = "Clothing" | "Accessories" | "Electronics";

export interface CouponFixedParams {
  amount: number;
}

export interface CouponPercentageParams {
  percentage: number;
}

export interface OnTopCategoryParams {
  category: Category;
  percentage: number;
}

export interface OnTopPointsParams {
  points: number;
}

export interface SeasonalParams {
  everyX: number;
  discountY: number;
}

export type CampaignType =
  | {
      type: "CouponFixed";
      code: string;
      parameters: CouponFixedParams;
    }
  | {
      type: "CouponPercentage";
      code: string;
      parameters: CouponPercentageParams;
    }
  | {
      type: "OnTopCategory";
      parameters: OnTopCategoryParams;
    }
  | {
      type: "OnTopPoints";
      parameters: OnTopPointsParams;
    }
  | {
      type: "Seasonal";
      parameters: SeasonalParams;
    };

export interface DiscountDetailType {
  type:
    | "CouponFixed"
    | "CouponPercentage"
    | "OnTopCategory"
    | "OnTopPoints"
    | "Seasonal";
  amount: number;
  description: string;
}

export interface FinalPriceResult {
  total: number;
  discounts: DiscountDetailType[];
}
