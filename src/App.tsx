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
            // Check if data.currency exists and is a valid string
            if (data && data.currency) {
                setForm(prev => ({
                    ...prev,
                    currencyCode: data.currency
                }));
            }
        })
        .catch(err => {
            console.log("Could not detect currency via IP, using default USD", err);
        });
}, []);
  
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [lifestyle, setLifestyle] = useState<Lifestyle>('comfortable');
  const [collapsed, setCollapsed] = useState(false);

  const homeCurrency = getCurrency(form.currencyCode);
  const yearsToRetire = Math.max(0, form.retirementAge - form.currentAge);

  const annualRate = form.annualReturnPct / 100;

// 复利终值计算公式：未来总资产 = 当前存款 * (1 + 年化收益率)^年数
  const futureSavingsUsd = form.currentSavingsUsd * Math.pow(1 + annualRate, yearsToRetire);

// 转换回用户当前选择的货币显示
  const futureSavingsLocal = futureSavingsUsd * homeCurrency.perUsd;

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
            {/* 🌟 新增的高亮对比卡片：展示复利增长与资产蜕变 */}
              <div className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-6 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-emerald-400">📈 Wealth Growth Projection</h3>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {yearsToRetire} Years to Retirement
                      </span>
                  </div>

                  <p className="text-sm text-slate-300 mb-6">
                      With your current timeline (Age {form.currentAge} to {form.retirementAge}) and <span className="text-emerald-400 font-semibold">{form.annualReturnPct}%</span> expected return:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-xs text-slate-400 uppercase tracking-wider">Starting Principal</span>
                          <div className="text-2xl font-bold text-slate-200 mt-1">
                              {homeCurrency.symbol}{form.currentSavings.toLocaleString()}
                          </div>
                          <span className="text-xs text-slate-500">{form.currencyCode}</span>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40">
                          <span className="text-xs text-emerald-400 uppercase tracking-wider">Projected at Retirement</span>
                          <div className="text-2xl font-bold text-emerald-400 mt-1">
                              {homeCurrency.symbol}{Math.round(futureSavingsLocal).toLocaleString()}
                          </div>
                          <span className="text-xs text-emerald-500">Compound Total</span>
                      </div>
                  </div>
              </div>
              {/* 🌟 对比卡片结束 */}
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
