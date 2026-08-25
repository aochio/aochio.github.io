import { Check, ChevronDown } from 'lucide-react';
import {
  COUNTRIES,
  LIFESTYLES,
  REGIONS,
  type Country,
  type Lifestyle,
  type Region,
} from '@/data/countries';

type Props = {
  selectedCountryId: string;
  onSelectCountry: (country: Country) => void;
  lifestyle: Lifestyle;
  onSelectLifestyle: (lifestyle: Lifestyle) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

const selectClass =
  'w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';

export function CountryGrid({
  selectedCountryId,
  onSelectCountry,
  lifestyle,
  onSelectLifestyle,
  collapsed,
  onToggleCollapse,
}: Props) {
  const selectedCountry = COUNTRIES.find((c) => c.id === selectedCountryId) ?? COUNTRIES[0];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Where do you want to retire?
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Pick a destination to base your plan on.
        </p>
      </div>

      {/* Quick-select dropdown */}
      <div className="relative mb-8 max-w-sm">
        <select
          className={selectClass}
          value={selectedCountryId}
          onChange={(e) => {
            const next = COUNTRIES.find((c) => c.id === e.target.value);
            if (next) onSelectCountry(next);
          }}
        >
          {REGIONS.map((region) => {
            const inRegion = COUNTRIES.filter((c) => c.region === region);
            return (
              <optgroup key={region} label={region}>
                {inRegion.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.city}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      {collapsed ? (
        <div>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="group relative block w-full max-w-sm overflow-hidden rounded-2xl text-left ring-2 ring-brand-500 shadow-lg shadow-brand-500/10 transition-all duration-300"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={selectedCountry.image}
                alt={`${selectedCountry.city}, ${selectedCountry.name}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">
                <Check className="h-4 w-4" />
              </span>
              <div className="absolute bottom-2 left-3 text-white">
                <p className="text-base font-semibold leading-tight">
                  {selectedCountry.name}
                </p>
                <p className="text-sm text-white/80">{selectedCountry.city}</p>
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Show all countries
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {REGIONS.map((region) => {
            const inRegion = COUNTRIES.filter((c) => c.region === region);
            if (inRegion.length === 0) return null;
            return (
              <div key={region}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  {region}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {inRegion.map((country) => {
                    const selected = country.id === selectedCountryId;
                    return (
                      <button
                        key={country.id}
                        type="button"
                        onClick={() => {
                          onSelectCountry(country);
                          onToggleCollapse();
                        }}
                        className={`group relative overflow-hidden rounded-2xl text-left ring-1 transition-all duration-300 ${
                          selected
                            ? 'ring-2 ring-brand-500 shadow-lg shadow-brand-500/10'
                            : 'ring-slate-200 hover:ring-brand-300 hover:shadow-md'
                        }`}
                      >
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={country.image}
                            alt={`${country.city}, ${country.name}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                          {selected && (
                            <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">
                              <Check className="h-4 w-4" />
                            </span>
                          )}
                          <div className="absolute bottom-2 left-3 text-white">
                            <p className="text-sm font-semibold leading-tight">
                              {country.name}
                            </p>
                            <p className="text-xs text-white/80">{country.city}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-sm font-medium text-slate-700">Lifestyle</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {LIFESTYLES.map((option) => {
            const selected = option.id === lifestyle;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectLifestyle(option.id)}
                className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                  selected
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-slate-200 bg-white hover:border-brand-300'
                }`}
              >
                <p
                  className={`text-sm font-semibold ${
                    selected ? 'text-brand-700' : 'text-slate-800'
                  }`}
                >
                  {option.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export type { Region };
