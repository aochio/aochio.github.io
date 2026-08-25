import { useEffect, useMemo, useState } from 'react';
import { Compass } from 'lucide-react';
import { PlannerForm, type FormState } from '@/components/PlannerForm';
import { CountryGrid } from '@/components/CountryGrid';
import { Results } from '@/components/Results';
import { AdSlot } from '@/components/AdSlot';
import { COUNTRIES, type Country, type Lifestyle } from '@/data/countries';
import { computePlan } from '@/lib/retirement';
import { getCurrency } from '@/data/currencies';

const HERO_IMAGE =
  'https://images.pexels.com/photos/4603354/pexels-photo-4603354.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

function App() {
  // Load the AdSense script once. It only activates ads once you set your
  // publisher ID in AdSlot.tsx and add real slot IDs.
  useEffect(() => {
    if (document.getElementById('adsense-script')) return;
    const s = document.createElement('script');
    s.id = 'adsense-script';
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }, []);

  const [form, setForm] = useState<FormState>({
    currencyCode: 'USD',
    currentAge: 20,
    retirementAge: 60,
    yearsInRetirement: 25,
    currentSavings: 20000,
    annualReturnPct: 5,
  });

  // 核心：页面加载时通过 IP 自动检测并设置货币
useEffect(() => {
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            const supportedCurrencies = ['USD', 'CAD', 'EUR', 'GBP', 'CNY', 'AUD', 'SGD', 'JPY'];
            if (data && data.currency && supportedCurrencies.includes(data.currency)) {
                setForm(prev => ({
                    ...prev,
                    currencyCode: data.currency
                }));
            }
        })
        .catch(() => {
            // 失败时保持默认
        });
}, []);
  
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [lifestyle, setLifestyle] = useState<Lifestyle>('comfortable');
  const [collapsed, setCollapsed] = useState(false);

  const homeCurrency = getCurrency(form.currencyCode);
  const yearsToRetire = Math.max(0, form.retirementAge - form.currentAge);

  const result = useMemo(
    () =>
      computePlan({
        currentAge: form.currentAge,
        retirementAge: form.retirementAge,
        yearsInRetirement: form.yearsInRetirement,
        currentSavingsUsd: form.currentSavings / homeCurrency.perUsd,
        annualReturn: form.annualReturnPct / 100,
        country,
        lifestyle,
      }),
    [form, country, lifestyle, homeCurrency.perUsd],
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="relative isolate overflow-hidden">
        <img
          src={collapsed ? country.image : HERO_IMAGE}
          alt={collapsed ? country.city : 'Palm-lined tropical beach'}
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/70 via-slate-900/55 to-slate-900/80" />
        <div className={`mx-auto max-w-5xl px-6 transition-all duration-500 ${collapsed ? 'py-14 sm:py-16' : 'py-24 sm:py-32'}`}>
          <div className="flex items-center gap-2 text-brand-300">
            <Compass className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Haven
            </span>
            {collapsed && (
              <span className="ml-1 text-sm font-medium normal-case tracking-normal text-white/90">
                — {country.name}
              </span>
            )}
          </div>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            {collapsed ? `Retire in ${country.name}` : 'Plan the retirement you want, anywhere'}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200">
            {collapsed
              ? country.blurb
              : 'See how much to save today to live comfortably tomorrow — across Southeast Asia, Europe, the Americas and beyond, based on local costs, economic strength and years of inflation, in any currency you choose.'}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <CountryGrid
          selectedCountryId={country.id}
          onSelectCountry={setCountry}
          lifestyle={lifestyle}
          onSelectLifestyle={setLifestyle}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />

        <AdSlot className="mt-10 min-h-[90px]" format="horizontal" />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-8">
              <h2 className="text-lg font-semibold text-slate-900">Your details</h2>
              <p className="mt-1 mb-5 text-sm text-slate-500">
                Tell us about your timeline and savings.
              </p>
              <PlannerForm value={form} onChange={setForm} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <Results
              result={result}
              homeCurrency={homeCurrency}
              country={country}
              yearsToRetire={yearsToRetire}
            />
          </div>
        </div>

        <AdSlot className="mt-10 min-h-[120px]" format="auto" />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="text-xs leading-relaxed text-slate-400">
            Cost-of-living, GDP and inflation figures are planning estimates based
            on public economic data and typical expat reports. Exchange rates are
            approximate references. This tool is for guidance only and is not
            financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
