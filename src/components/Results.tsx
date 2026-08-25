import { TrendingUp, PiggyBank, Wallet, CircleCheck, TriangleAlert } from 'lucide-react';
import type { PlanResult } from '@/lib/retirement';
import type { Country } from '@/data/countries';
import {
  convertFromUsd,
  formatMoney,
  getCurrency,
  type Currency,
} from '@/data/currencies';

type Props = {
  result: PlanResult;
  homeCurrency: Currency;
  country: Country;
  yearsToRetire: number;
};

function Stat({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? 'border-brand-200 bg-brand-50' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-2 text-slate-500">
        <span className={accent ? 'text-brand-600' : 'text-slate-400'}>{icon}</span>
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p
        className={`mt-2 text-2xl font-semibold ${
          accent ? 'text-brand-700' : 'text-slate-900'
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

export function Results({ result, homeCurrency, country, yearsToRetire }: Props) {
  const local = getCurrency(country.currencyCode);
  const conv = (usd: number) =>
    formatMoney(convertFromUsd(usd, homeCurrency), homeCurrency);

  const localMonthlyToday = formatMoney(
    convertFromUsd(result.monthlyCostToday, local),
    local,
  );

  return (
    <div className="space-y-6">
      <div
        className={`flex items-center gap-3 rounded-2xl border p-4 ${
          result.onTrack
            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
            : 'border-amber-200 bg-amber-50 text-amber-800'
        }`}
      >
        {result.onTrack ? (
          <CircleCheck className="h-5 w-5 shrink-0" />
        ) : (
          <TriangleAlert className="h-5 w-5 shrink-0" />
        )}
        <p className="text-sm font-medium">
          {result.onTrack
            ? 'Your current savings are already on track to fund this retirement.'
            : `To retire comfortably in ${country.name}, save about ${conv(
                result.monthlySavingRequired,
              )} each month.`}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Stat
          accent
          icon={<PiggyBank className="h-4 w-4" />}
          label="Save each month"
          value={conv(result.monthlySavingRequired)}
          sub={`For the next ${yearsToRetire} years`}
        />
        <Stat
          icon={<Wallet className="h-4 w-4" />}
          label="Total nest egg needed"
          value={conv(result.nestEggNeeded)}
          sub="Amount needed the day you retire"
        />
        <Stat
          icon={<TrendingUp className="h-4 w-4" />}
          label="Monthly cost at retirement"
          value={conv(result.monthlyCostAtRetirement)}
          sub={`In ${country.name}, adjusted for inflation`}
        />
        <Stat
          icon={<Wallet className="h-4 w-4" />}
          label="That cost today"
          value={conv(result.monthlyCostToday)}
          sub={`Around ${localMonthlyToday} in local currency`}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-800">
          {country.name} at a glance
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              GDP per person
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {formatMoney(convertFromUsd(country.gdpPerCapita, homeCurrency), homeCurrency)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Avg. yearly inflation
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {(country.avgInflation * 100).toFixed(1)}%
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{country.blurb}</p>
      </div>
    </div>
  );
}
