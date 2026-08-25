export type Lifestyle = 'modest' | 'comfortable' | 'luxury';

export type Region =
  | 'Southeast Asia'
  | 'East Asia'
  | 'South Asia'
  | 'Europe'
  | 'Americas'
  | 'Middle East & North Africa'
  | 'Sub-Saharan Africa'
  | 'Oceania';

export type Country = {
  id: string;
  name: string;
  city: string;
  region: Region;
  currencyCode: string;
  // GDP per capita in USD (approximate, recent estimate).
  gdpPerCapita: number;
  // Average annual inflation over roughly the past decade (as a decimal).
  avgInflation: number;
  // Estimated monthly cost of living for a single retiree, in USD.
  monthlyCost: Record<Lifestyle, number>;
  image: string;
  blurb: string;
};

// Figures are planning estimates drawn from public economic data
// (GDP per capita, historical inflation) and typical expat cost-of-living
// reports. They are baselines, not guarantees.
export const COUNTRIES: Country[] = [
  {
    id: 'thailand',
    name: 'Thailand',
    city: 'Chiang Mai',
    region: 'Southeast Asia',
    currencyCode: 'THB',
    gdpPerCapita: 7300,
    avgInflation: 0.019,
    monthlyCost: { modest: 1100, comfortable: 1900, luxury: 3400 },
    image:
      'https://images.pexels.com/photos/5988448/pexels-photo-5988448.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'A long-time favourite for retirees, with modern healthcare, a warm climate and a well-established expat community.',
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    city: 'Penang',
    region: 'Southeast Asia',
    currencyCode: 'MYR',
    gdpPerCapita: 12500,
    avgInflation: 0.021,
    monthlyCost: { modest: 1200, comfortable: 2100, luxury: 3800 },
    image:
      'https://images.pexels.com/photos/19562477/pexels-photo-19562477.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'English is widely spoken, private hospitals are excellent and the long-stay visa programme is popular with retirees.',
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    city: 'Da Nang',
    region: 'Southeast Asia',
    currencyCode: 'VND',
    gdpPerCapita: 4300,
    avgInflation: 0.032,
    monthlyCost: { modest: 900, comfortable: 1600, luxury: 2900 },
    image:
      'https://images.pexels.com/photos/8775598/pexels-photo-8775598.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'One of the most affordable options, with beautiful coastlines, fast-improving infrastructure and vibrant food.',
  },
  {
    id: 'philippines',
    name: 'Philippines',
    city: 'Cebu',
    region: 'Southeast Asia',
    currencyCode: 'PHP',
    gdpPerCapita: 3900,
    avgInflation: 0.034,
    monthlyCost: { modest: 950, comfortable: 1700, luxury: 3100 },
    image:
      'https://images.pexels.com/photos/4603354/pexels-photo-4603354.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'English is an official language and the retiree visa is one of the easiest in the region to obtain.',
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    city: 'Bali',
    region: 'Southeast Asia',
    currencyCode: 'IDR',
    gdpPerCapita: 4900,
    avgInflation: 0.033,
    monthlyCost: { modest: 1000, comfortable: 1850, luxury: 3600 },
    image:
      'https://images.pexels.com/photos/12001661/pexels-photo-12001661.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Bali blends a low cost of living with a relaxed lifestyle, a large expat scene and year-round tropical weather.',
  },
  {
    id: 'cambodia',
    name: 'Cambodia',
    city: 'Siem Reap',
    region: 'Southeast Asia',
    currencyCode: 'KHR',
    gdpPerCapita: 1900,
    avgInflation: 0.029,
    monthlyCost: { modest: 850, comfortable: 1500, luxury: 2700 },
    image:
      'https://images.pexels.com/photos/31200077/pexels-photo-31200077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'The US dollar is used everywhere and long-stay visas are simple to renew, making day-to-day life easy for newcomers.',
  },
  {
    id: 'china',
    name: 'China',
    city: 'Kunming',
    region: 'East Asia',
    currencyCode: 'CNY',
    gdpPerCapita: 12700,
    avgInflation: 0.02,
    monthlyCost: { modest: 1200, comfortable: 2200, luxury: 4200 },
    image:
      'https://images.pexels.com/photos/30685872/pexels-photo-30685872.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Modern infrastructure, world-class healthcare in major cities and a very low crime rate. Visas for retirees are limited but long-term stays are possible.',
  },
  {
    id: 'taiwan',
    name: 'Taiwan',
    city: 'Taipei',
    region: 'East Asia',
    currencyCode: 'TWD',
    gdpPerCapita: 33500,
    avgInflation: 0.013,
    monthlyCost: { modest: 1800, comfortable: 2800, luxury: 4800 },
    image:
      'https://images.pexels.com/photos/5149096/pexels-photo-5149096.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Universal national healthcare ranked among the best in the world, extremely safe streets, and excellent public transport.',
  },
  {
    id: 'japan',
    name: 'Japan',
    city: 'Fukuoka',
    region: 'East Asia',
    currencyCode: 'JPY',
    gdpPerCapita: 34000,
    avgInflation: 0.008,
    monthlyCost: { modest: 2200, comfortable: 3400, luxury: 5800 },
    image:
      'https://images.pexels.com/photos/30641513/pexels-photo-30641513.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Top-tier healthcare, very low crime and a long-stay "designated activities" visa for retirees with sufficient means.',
  },
  {
    id: 'southkorea',
    name: 'South Korea',
    city: 'Busan',
    region: 'East Asia',
    currencyCode: 'KRW',
    gdpPerCapita: 33000,
    avgInflation: 0.017,
    monthlyCost: { modest: 2000, comfortable: 3100, luxury: 5200 },
    image:
      'https://images.pexels.com/photos/25396055/pexels-photo-25396055.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Excellent healthcare, fast internet and a rich cultural scene. A retirement visa is available for those over 55 with qualifying income.',
  },
  {
    id: 'india',
    name: 'India',
    city: 'Goa',
    region: 'South Asia',
    currencyCode: 'INR',
    gdpPerCapita: 2700,
    avgInflation: 0.048,
    monthlyCost: { modest: 700, comfortable: 1300, luxury: 2500 },
    image:
      'https://images.pexels.com/photos/14845309/pexels-photo-14845309.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'One of the lowest costs of living anywhere, quality private healthcare in cities, and an OCI card makes long stays easy for those of Indian origin.',
  },
  {
    id: 'srianka',
    name: 'Sri Lanka',
    city: 'Galle',
    region: 'South Asia',
    currencyCode: 'LKR',
    gdpPerCapita: 3300,
    avgInflation: 0.065,
    monthlyCost: { modest: 800, comfortable: 1400, luxury: 2600 },
    image:
      'https://images.pexels.com/photos/8410981/pexels-photo-8410981.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Tropical coastline, very affordable living and a "my dream home" visa programme for retirees over 55.',
  },
  {
    id: 'portugal',
    name: 'Portugal',
    city: 'Lisbon',
    region: 'Europe',
    currencyCode: 'EUR',
    gdpPerCapita: 27500,
    avgInflation: 0.018,
    monthlyCost: { modest: 1900, comfortable: 2900, luxury: 4800 },
    image:
      'https://images.pexels.com/photos/15743293/pexels-photo-15743293.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'A top European retirement pick: mild weather, affordable healthcare, a welcoming visa programme and English widely spoken.',
  },
  {
    id: 'spain',
    name: 'Spain',
    city: 'Valencia',
    region: 'Europe',
    currencyCode: 'EUR',
    gdpPerCapita: 32000,
    avgInflation: 0.02,
    monthlyCost: { modest: 2100, comfortable: 3200, luxury: 5200 },
    image:
      'https://images.pexels.com/photos/27397529/pexels-photo-27397529.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Excellent public healthcare, a relaxed Mediterranean lifestyle and a non-lucrative visa that suits retirees well.',
  },
  {
    id: 'greece',
    name: 'Greece',
    city: 'Athens',
    region: 'Europe',
    currencyCode: 'EUR',
    gdpPerCapita: 23000,
    avgInflation: 0.017,
    monthlyCost: { modest: 1700, comfortable: 2600, luxury: 4300 },
    image:
      'https://images.pexels.com/photos/28000942/pexels-photo-28000942.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Low living costs by European standards, a warm climate and a growing expat community on the islands and mainland.',
  },
  {
    id: 'croatia',
    name: 'Croatia',
    city: 'Split',
    region: 'Europe',
    currencyCode: 'EUR',
    gdpPerCapita: 21500,
    avgInflation: 0.026,
    monthlyCost: { modest: 1800, comfortable: 2700, luxury: 4500 },
    image:
      'https://images.pexels.com/photos/18301156/pexels-photo-18301156.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Stunning Adriatic coastline, EU membership and a digital-nomad permit that can lead to longer-term residency.',
  },
  {
    id: 'mexico',
    name: 'Mexico',
    city: 'San Miguel de Allende',
    region: 'Americas',
    currencyCode: 'MXN',
    gdpPerCapita: 13500,
    avgInflation: 0.042,
    monthlyCost: { modest: 1300, comfortable: 2200, luxury: 4000 },
    image:
      'https://images.pexels.com/photos/20181325/pexels-photo-20181325.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Close to the US, with a generous temporary-resident visa, affordable private healthcare and vibrant colonial towns.',
  },
  {
    id: 'costarica',
    name: 'Costa Rica',
    city: 'Guanacaste',
    region: 'Americas',
    currencyCode: 'USD',
    gdpPerCapita: 16500,
    avgInflation: 0.028,
    monthlyCost: { modest: 1600, comfortable: 2600, luxury: 4500 },
    image:
      'https://images.pexels.com/photos/6198925/pexels-photo-6198925.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'A stable democracy with no army, excellent healthcare and a dedicated "pensionado" retiree residency programme.',
  },
  {
    id: 'panama',
    name: 'Panama',
    city: 'Panama City',
    region: 'Americas',
    currencyCode: 'USD',
    gdpPerCapita: 18500,
    avgInflation: 0.022,
    monthlyCost: { modest: 1500, comfortable: 2500, luxury: 4300 },
    image:
      'https://images.pexels.com/photos/20323097/pexels-photo-20323097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Uses the US dollar, has a famous pensionado retiree visa with discounts, and modern infrastructure in the capital.',
  },
  {
    id: 'colombia',
    name: 'Colombia',
    city: 'Medell\u00EDn',
    region: 'Americas',
    currencyCode: 'COP',
    gdpPerCapita: 7100,
    avgInflation: 0.038,
    monthlyCost: { modest: 1000, comfortable: 1800, luxury: 3300 },
    image:
      'https://images.pexels.com/photos/19675604/pexels-photo-19675604.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Spring-like weather year-round in the highlands, affordable private healthcare and a straightforward retiree visa.',
  },
  {
    id: 'argentina',
    name: 'Argentina',
    city: 'Buenos Aires',
    region: 'Americas',
    currencyCode: 'ARS',
    gdpPerCapita: 12500,
    avgInflation: 0.045,
    monthlyCost: { modest: 1200, comfortable: 2100, luxury: 3800 },
    image:
      'https://images.pexels.com/photos/28155412/pexels-photo-28155412.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'European-style architecture, rich culture and very low costs for those earning in a foreign currency, though inflation is high.',
  },
  {
    id: 'morocco',
    name: 'Morocco',
    city: 'Marrakech',
    region: 'Middle East & North Africa',
    currencyCode: 'MAD',
    gdpPerCapita: 3900,
    avgInflation: 0.025,
    monthlyCost: { modest: 900, comfortable: 1600, luxury: 3000 },
    image:
      'https://images.pexels.com/photos/30124130/pexels-photo-30124130.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'A blend of African, Arab and European influences, warm weather, very affordable living and easy long-term residency.',
  },
  {
    id: 'turkey',
    name: 'Turkey',
    city: 'Istanbul',
    region: 'Middle East & North Africa',
    currencyCode: 'TRY',
    gdpPerCapita: 10500,
    avgInflation: 0.055,
    monthlyCost: { modest: 1100, comfortable: 1900, luxury: 3500 },
    image:
      'https://images.pexels.com/photos/8518777/pexels-photo-8518777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Rich history, a mild Mediterranean coast and a short-term residency permit that is easy to renew, though inflation is high.',
  },
  {
    id: 'southafrica',
    name: 'South Africa',
    city: 'Cape Town',
    region: 'Sub-Saharan Africa',
    currencyCode: 'ZAR',
    gdpPerCapita: 6900,
    avgInflation: 0.052,
    monthlyCost: { modest: 1100, comfortable: 2000, luxury: 3700 },
    image:
      'https://images.pexels.com/photos/136721/pexels-photo-136721.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Stunning scenery, excellent private healthcare, and a low cost of living in a beautiful, diverse setting.',
  },
  {
    id: 'newzealand',
    name: 'New Zealand',
    city: 'Auckland',
    region: 'Oceania',
    currencyCode: 'NZD',
    gdpPerCapita: 48000,
    avgInflation: 0.024,
    monthlyCost: { modest: 2800, comfortable: 4200, luxury: 6800 },
    image:
      'https://images.pexels.com/photos/29015656/pexels-photo-29015656.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    blurb:
      'Breathtaking landscapes, a peaceful lifestyle and strong healthcare. A temporary retirement visa is available for those with family or sufficient funds.',
  },
];

export const REGIONS: Region[] = [
  'Southeast Asia',
  'East Asia',
  'South Asia',
  'Europe',
  'Americas',
  'Middle East & North Africa',
  'Sub-Saharan Africa',
  'Oceania',
];

export const LIFESTYLES: { id: Lifestyle; label: string; description: string }[] =
  [
    {
      id: 'modest',
      label: 'Modest',
      description: 'A simple, local lifestyle with a small home and home cooking.',
    },
    {
      id: 'comfortable',
      label: 'Comfortable',
      description: 'A nice apartment, regular dining out, travel and healthcare.',
    },
    {
      id: 'luxury',
      label: 'Luxury',
      description: 'Premium housing, help at home, frequent travel and top care.',
    },
  ];
