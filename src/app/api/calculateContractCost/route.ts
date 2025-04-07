import { NextResponse } from 'next/server';

interface ContractCostRequest {
  numberOfHours: number;
  subcategory: string;
  contractType: string;
  basePay: number;
}

export async function POST(request: Request) {
  try {
    const body: ContractCostRequest = await request.json();

    // Validate required fields
    if (!body.numberOfHours || !body.subcategory || !body.contractType || !body.basePay) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate costs based on the contract type and subcategory
    const costs = calculateContractCosts(body);

    return NextResponse.json({ costs });
  } catch (error) {
    console.error('Error calculating contract costs:', error);
    return NextResponse.json(
      { error: 'Failed to calculate contract costs' },
      { status: 500 }
    );
  }
}

function calculateContractCosts(data: ContractCostRequest) {
  const { numberOfHours, subcategory, contractType, basePay } = data;

  // Base calculations
  const hourlyGrossPay = basePay;
  const monthlyGrossPay = hourlyGrossPay * numberOfHours * 4.33; // Average weeks per month

  // Worker calculations
  const workerContributionsRate = 0.093; // 9.3% for worker contributions
  const cassaColfRate = 0.05; // 5% for Cassa Colf

  // Adjust rates based on subcategory
  const employerCassaColfRate = 0.05; // Base rate 5% for employer Cassa Colf
  const roomBoardRate = contractType === 'liveIn' ? 0.20 : 0; // 20% for live-in workers
  let employerContributionsRate = 0.30; // Base rate 30% for employer contributions

  // Adjust rates based on subcategory
  switch (subcategory) {
    case 'elderly':
      employerContributionsRate = 0.32; // Higher rate for elderly care
      break;
    case 'childcare':
      employerContributionsRate = 0.31; // Slightly higher rate for childcare
      break;
    case 'domestic':
    default:
      employerContributionsRate = 0.30; // Standard rate for domestic work
      break;
  }

  const workerContributions = {
    hourly: hourlyGrossPay * workerContributionsRate,
    monthly: monthlyGrossPay * workerContributionsRate,
  };

  const workerCassaColf = {
    hourly: hourlyGrossPay * cassaColfRate,
    monthly: monthlyGrossPay * cassaColfRate,
  };

  const workerNetPay = {
    hourly: hourlyGrossPay - workerContributions.hourly - workerCassaColf.hourly,
    monthly: monthlyGrossPay - workerContributions.monthly - workerCassaColf.monthly,
  };

  // Employer calculations
  const holidaysRate = 0.1111; // 11.11% for holidays (1/9)
  const thirteenthMonthRate = 0.0833; // 8.33% for 13th month (1/12)
  const severancePayRate = 0.0691; // 6.91% for severance pay (TFR)

  const employerContributions = {
    hourly: hourlyGrossPay * employerContributionsRate,
    monthly: monthlyGrossPay * employerContributionsRate,
  };

  const employerCassaColf = {
    hourly: hourlyGrossPay * employerCassaColfRate,
    monthly: monthlyGrossPay * employerCassaColfRate,
  };

  const roomBoard = {
    hourly: hourlyGrossPay * roomBoardRate,
    monthly: monthlyGrossPay * roomBoardRate,
  };

  const holidays = {
    hourly: hourlyGrossPay * holidaysRate,
    monthly: monthlyGrossPay * holidaysRate,
  };

  const thirteenthMonth = {
    hourly: hourlyGrossPay * thirteenthMonthRate,
    monthly: monthlyGrossPay * thirteenthMonthRate,
  };

  const severancePay = {
    hourly: hourlyGrossPay * severancePayRate,
    monthly: monthlyGrossPay * severancePayRate,
  };

  const employerTotalCost = {
    hourly: hourlyGrossPay + employerContributions.hourly + employerCassaColf.hourly + 
            roomBoard.hourly + holidays.hourly + thirteenthMonth.hourly + severancePay.hourly,
    monthly: monthlyGrossPay + employerContributions.monthly + employerCassaColf.monthly + 
             roomBoard.monthly + holidays.monthly + thirteenthMonth.monthly + severancePay.monthly,
  };

  return {
    worker: {
      grossPay: { hourly: hourlyGrossPay, monthly: monthlyGrossPay },
      contributions: workerContributions,
      cassaColf: workerCassaColf,
      netPay: workerNetPay,
    },
    employer: {
      grossPay: { hourly: hourlyGrossPay, monthly: monthlyGrossPay },
      roomBoard,
      contributions: employerContributions,
      cassaColf: employerCassaColf,
      holidays,
      thirteenthMonth,
      severancePay,
      totalCost: employerTotalCost,
    },
  };
} 