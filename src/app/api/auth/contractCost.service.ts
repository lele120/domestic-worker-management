import axios from "axios";

export interface ContractCostRequest {
  numberOfHours: number;
  subcategory: string;
  contractType: string;
  basePay: number;
}

export interface Response {
  costs: CostBreakdown | null;
  errors: ErrorCost | null;
}

export interface ErrorCost {
  [key: string]: string;
}

export interface CostBreakdown {
  worker: {
    grossPay: { hourly: number; monthly: number };
    contributions: { hourly: number; monthly: number };
    cassaColf: { hourly: number; monthly: number };
    netPay: { hourly: number; monthly: number };
  };
  employer: {
    grossPay: { hourly: number; monthly: number };
    roomBoard: { hourly: number; monthly: number };
    contributions: { hourly: number; monthly: number };
    cassaColf: { hourly: number; monthly: number };
    holidays: { hourly: number; monthly: number };
    thirteenthMonth: { hourly: number; monthly: number };
    severancePay: { hourly: number; monthly: number };
    totalCost: { hourly: number; monthly: number };
  };
}

export async function calculateContractCost(request: ContractCostRequest, token: string): 
              Promise<Response> {
  try {
    const response = await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "calculateContractCost/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: request,
    });
    return response.data;
  } catch (error) {
    console.error("Error calculating contract cost:", error);
    return { costs: null, errors: { error: "An unknown error occurred" } };
  }
} 