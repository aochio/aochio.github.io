import { CURRENCIES } from '@/data/currencies';

export type FormState = {
  currencyCode: string;
  currentAge: number;
  retirementAge: number;
  yearsInRetirement: number;
  currentSavings: number;
  annualReturnPct: number;
};

type Props = {
  value: FormState;
  onChange: (next: FormState) => void;
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {hint && <span className="ml-1 text-xs text-slate-400">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';

export function PlannerForm({ value, onChange }: Props) {
  function set<K extends keyof FormState>(key: K, v: FormState[K]) {
    onChange({ ...value, [key]: v });
  }

  function num(v: string): number {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  return (
    <div className="space-y-5">
      <Field label="Your currency">
        <select
          className={inputClass}
          value={value.currencyCode}
          onChange={(e) => set('currencyCode', e.target.value)}
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} — {c.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Current age">
          <input
            type="number"
            min={18}
            max={90}
            className={inputClass}
            value={value.currentAge}
            onChange={(e) => set('currentAge', num(e.target.value))}
          />
        </Field>
        <Field label="Retirement age">
          <input
            type="number"
            min={value.currentAge + 1}
            max={90}
            className={inputClass}
            value={value.retirementAge}
            onChange={(e) => set('retirementAge', num(e.target.value))}
          />
        </Field>
      </div>

      <Field label="Years in retirement" hint="how long your savings must last">
        <input
          type="number"
          min={1}
          max={60}
          className={inputClass}
          value={value.yearsInRetirement}
          onChange={(e) => set('yearsInRetirement', num(e.target.value))}
        />
      </Field>

      <Field label="Current savings" hint="in your currency">
        <input
          type="number"
          min={0}
          step={1000}
          className={inputClass}
          value={value.currentSavings}
          onChange={(e) => set('currentSavings', num(e.target.value))}
        />
      </Field>

      <Field label="Expected yearly investment return" hint="%">
        <input
          type="number"
          min={0}
          max={20}
          step={0.5}
          className={inputClass}
          value={value.annualReturnPct}
          onChange={(e) => set('annualReturnPct', num(e.target.value))}
        />
      </Field>
    </div>
  );
}
