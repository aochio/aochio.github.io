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
  const annualRate = (form.annualReturnPct || 0) / 100;

  // 🌟 直接用当前货币进行复利计算，不再绕弯子折腾 USD 汇率
  const currentSav = Number(form.currentSavings || 0);
  const futureSavingsLocal = currentSav * Math.pow(1 + annualRate, yearsToRetire);

  // 同时也保留给 computePlan 用的 USD 版本
  const currentSavingsUsd = currentSav / (homeCurrency.perUsd || 1);

  const result = useMemo(
    () =>
      computePlan({
        currentAge: form.currentAge,
        retirementAge: form.retirementAge,
        yearsInRetirement: form.yearsInRetirement,
        currentSavingsUsd: currentSavingsUsd,
        annualReturn: annualRate,
        country,
        lifestyle,
      }),
    [form, country, lifestyle, homeCurrency.perUsd, currentSavingsUsd, annualRate],
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

      <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-8 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Your details</h2>
                <p className="mt-1 mb-5 text-sm text-slate-500">
                  Tell us about your timeline and savings.
                </p>
                <PlannerForm value={form} onChange={setForm} />
              </div>

              {/* 📊 严格内嵌在白色大方框内部最底部的市场参考 */}
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 bg-slate-50/50 p-4 rounded-xl border border-slate-200/60 space-y-2">
                <span className="font-bold text-slate-700 block">💡 Historical Market Returns:</span>
                <div className="flex justify-between"><span>🇺🇸 S&P 500:</span> <span className="font-semibold text-slate-700">~10% (7% adj.)</span></div>
                <div className="flex justify-between"><span>🚀 Nasdaq 100 (QQQ):</span> <span className="font-semibold text-slate-700">~13%</span></div>
                <div className="flex justify-between"><span>🇪🇺 Europe Stoxx 600:</span> <span className="font-semibold text-slate-700">~8%</span></div>
                <div className="flex justify-between"><span>🌏 Asia Emerging:</span> <span className="font-semibold text-slate-700">~7%</span></div>
              </div>
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
            
<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span>🎯</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Retirement Gap & Wealth Projection</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
                  {yearsToRetire} Years to Go
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                
                {/* 1. 当前起点 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Starting Principal</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">
                    {homeCurrency.symbol}{currentSav.toLocaleString()}
                  </div>
                  <span className="text-xs text-slate-500 mt-0.5 block">At age {form.currentAge}</span>
                </div>

                {/* 2. 预计复利终点 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Projected Wealth</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">
                    {homeCurrency.symbol}{Math.round(futureSavingsLocal).toLocaleString()}
                  </div>
                  <span className="text-xs text-emerald-600 font-medium mt-0.5 block">At age {form.retirementAge} ({form.annualReturnPct}% return)</span>
                </div>

                {/* 3. 真实差额对比 (Projected Wealth - Total Nest Egg Needed) */}
                {(() => {
                  const perUsd = homeCurrency.perUsd || 1;
                  
                  // 获取上方组件算出来的总目标 Nest Egg (USD)
                  const targetUsd = result 
                    ? (typeof (result as any).nestEggUsd === 'number' ? (result as any).nestEggUsd 
                        : typeof (result as any).nestEgg === 'number' ? (result as any).nestEgg 
                        : typeof (result as any).targetUsd === 'number' ? (result as any).targetUsd 
                        : 0)
                    : 0;
                  
                  const targetLocal = targetUsd * perUsd;
                  // 🌟 核心修正：用“预计复利终点”减去“目标总资金”才是真正的盈余或缺口！
                  const diffLocal = futureSavingsLocal - targetLocal;
                  const isSurplus = diffLocal >= 0;

                  return (
                    <div className={`p-4 rounded-xl border ${isSurplus ? 'bg-emerald-50/60 border-emerald-200' : 'bg-amber-50/60 border-amber-200'}`}>
                      <span className={`text-[11px] font-semibold uppercase tracking-wider ${isSurplus ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {isSurplus ? 'Surplus / Ahead' : 'Remaining Gap'}
                      </span>
                      <div className={`text-xl font-bold mt-1 ${isSurplus ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {homeCurrency.symbol}{Math.abs(Math.round(diffLocal)).toLocaleString()}
                      </div>
                      <span className={`text-xs font-medium mt-0.5 block ${isSurplus ? 'text-emerald-600/90' : 'text-amber-600/90'}`}>
                        {isSurplus ? '🎉 Above target nest egg' : '⚠️ Need more to reach goal'}
                      </span>
                    </div>
                  );
                })()}

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
