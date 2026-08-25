import type { Country, Lifestyle } from '@/data/countries';

export type PlanInputs = {
  currentAge: number;
  retirementAge: number;
  yearsInRetirement: number;
  currentSavingsUsd: number;
  annualReturn: number; // decimal, e.g. 0.05
  country: Country;
  lifestyle: Lifestyle;
};

export type PlanResult = {
  monthlyCostToday: number;
  monthlyCostAtRetirement: number;
  annualCostAtRetirement: number;
  nestEggNeeded: number;
  futureValueOfSavings: number;
  shortfall: number;
  monthlySavingRequired: number;
  onTrack: boolean;
};

// All money values are in USD. Conversion to the user's currency happens in the UI.
export function computePlan(inputs: PlanInputs): PlanResult {
  const {
    currentAge,
    retirementAge,
    yearsInRetirement,
    currentSavingsUsd,
    annualReturn,
    country,
    lifestyle,
  } = inputs;

  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  const inflation = country.avgInflation;
  const monthlyCostToday = country.monthlyCost[lifestyle];

  // Inflate today's local cost of living out to the retirement date.
  const monthlyCostAtRetirement =
    monthlyCostToday * Math.pow(1 + inflation, yearsToRetire);
  const annualCostAtRetirement = monthlyCostAtRetirement * 12;

  // Nest egg required at the start of retirement: present value of an
  // inflation-growing annual withdrawal over the retirement years, using the
  // real return earned on invested savings during retirement.
  const realReturn = (1 + annualReturn) / (1 + inflation) - 1;
  const n = Math.max(1, yearsInRetirement);
  let nestEggNeeded: number;
  if (Math.abs(realReturn) < 1e-6) {
    nestEggNeeded = annualCostAtRetirement * n;
  } else {
    nestEggNeeded =
      annualCostAtRetirement * ((1 - Math.pow(1 + realReturn, -n)) / realReturn);
  }

  // What today's savings will grow to by retirement.
  const futureValueOfSavings =
    currentSavingsUsd * Math.pow(1 + annualReturn, yearsToRetire);

  const shortfall = Math.max(0, nestEggNeeded - futureValueOfSavings);

  // Monthly contribution needed to close the shortfall (future value of a series).
  const months = yearsToRetire * 12;
  const monthlyRate = annualReturn / 12;
  let monthlySavingRequired: number;
  if (months <= 0) {
    monthlySavingRequired = shortfall;
  } else if (Math.abs(monthlyRate) < 1e-9) {
    monthlySavingRequired = shortfall / months;
  } else {
    monthlySavingRequired =
      (shortfall * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
  }

  return {
    monthlyCostToday,
    monthlyCostAtRetirement,
    annualCostAtRetirement,
    nestEggNeeded,
    futureValueOfSavings,
    shortfall,
    monthlySavingRequired,
    onTrack: shortfall <= 0,
  };
}
