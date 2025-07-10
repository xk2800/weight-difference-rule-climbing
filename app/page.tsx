"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { translations, type Language } from '../lib/translations';
import { deviceRecommendations, type Device } from '../lib/recommendations';
import type { Experience, Unit, ResultState, Pair } from '../lib/types';

export default function Home() {
  const [climberWeight, setClimberWeight] = useState('');
  const [belayerWeight, setBelayerWeight] = useState('');
  const [unit, setUnit] = useState<Unit>('kg');
  const [device, setDevice] = useState<Device>('grigri');
  const [experience, setExperience] = useState<Experience>('intermediate');
  const [result, setResult] = useState<ResultState | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [commonPairs, setCommonPairs] = useState<Pair[]>([]);
  // const router = useRouter();

  const t = translations[language];

  // Auto-detect browser language
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.includes('ms') || browserLang.includes('my')) {
      setLanguage('ms');
    } else if (browserLang.includes('zh') || browserLang.includes('cn')) {
      setLanguage('zh');
    } else {
      setLanguage('en');
    }

    // Load common pairs from localStorage
    const saved = localStorage.getItem('commonPairs');
    if (saved) {
      setCommonPairs(JSON.parse(saved));
    }
  }, []);

  const calculateSafety = () => {
    const climber = parseFloat(climberWeight);
    const belayer = parseFloat(belayerWeight);

    if (!climber || !belayer || climber <= 0 || belayer <= 0) return;

    const isHeavierClimber = climber > belayer;

    if (!isHeavierClimber) {
      // Belayer is heavier or same weight. Generally safe.
      const weightDiff = belayer - climber;
      const percentDiff = (weightDiff / climber) * 100;

      const safety: ResultState['safety'] = 'safe';
      let recommendation = 'Belayer is heavier than the climber. This is a safe configuration. The belayer should focus on providing a dynamic catch to prevent a hard fall for the climber.';

      if (percentDiff > 50) { // e.g., belayer is > 1.5x climber's weight
        recommendation = 'Belayer is significantly heavier. A dynamic belay is crucial to prevent a hard catch and potential injury to the climber. This remains a safe belayer-climber weight combination.';
      }

      setResult({
        safety,
        weightDiff: weightDiff.toFixed(1),
        percentDiff: percentDiff.toFixed(1),
        recommendation,
        tips: deviceRecommendations[device].tips[language] || deviceRecommendations[device].tips.en
      });
      return;
    }

    // Climber is heavier than belayer. This is where the primary risk lies.
    const weightDiff = climber - belayer;
    const percentDiff = (weightDiff / belayer) * 100; // Difference relative to belayer's weight

    const deviceConfig = deviceRecommendations[device];
    let safety: ResultState['safety'] = 'safe';
    let recommendation = '';

    // Adjust thresholds based on experience
    const experienceMultiplier: Record<Experience, number> = {
      beginner: 0.8,
      intermediate: 1.0,
      advanced: 1.2
    };

    const adjustedMaxDiff = deviceConfig.maxDiff * experienceMultiplier[experience];
    const adjustedMinDiff = deviceConfig.minDiff * experienceMultiplier[experience];

    if (percentDiff > adjustedMaxDiff) {
      safety = 'unsafe';
      recommendation = 'Climber is significantly heavier than the belayer. High risk of belayer being pulled hard into the wall or first anchor. A ground anchor is strongly recommended.';
    } else if (percentDiff > adjustedMinDiff) {
      safety = 'caution';
      recommendation = 'Climber is heavier than the belayer. Belayer must use proper technique and positioning to manage falls. Consider a ground anchor.';
    } else {
      safety = 'safe';
      recommendation = 'Weight difference is acceptable. Maintain proper belay technique and awareness.';
    }

    setResult({
      safety,
      weightDiff: weightDiff.toFixed(1),
      percentDiff: percentDiff.toFixed(1),
      recommendation,
      tips: deviceConfig.tips[language] || deviceConfig.tips.en
    });
  };

  const savePair = () => {
    if (!climberWeight || !belayerWeight) return;

    const pair = {
      climber: parseFloat(climberWeight),
      belayer: parseFloat(belayerWeight),
      unit,
      device,
      timestamp: new Date().toISOString()
    };

    const updated = [...commonPairs, pair].slice(-10); // Keep last 10
    setCommonPairs(updated);
    localStorage.setItem('commonPairs', JSON.stringify(updated));
  };

  const clearPairs = () => {
    setCommonPairs([]);
    localStorage.removeItem('commonPairs');
  };

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="en">English</option>
                <option value="ms">Bahasa Malaysia</option>
                <option value="zh">中文</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.climberWeight} ({t[unit]})
                  </label>
                  <input
                    type="number"
                    value={climberWeight}
                    onChange={(e) => setClimberWeight(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="70"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.belayerWeight} ({t[unit]})
                  </label>
                  <input
                    type="number"
                    value={belayerWeight}
                    onChange={(e) => setBelayerWeight(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="65"
                  />
                </div>

                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="kg"
                      checked={unit === 'kg'}
                      onChange={(e) => setUnit(e.target.value as Unit)}
                      className="mr-2"
                    />
                    {t.kg}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="lbs"
                      checked={unit === 'lbs'}
                      onChange={(e) => setUnit(e.target.value as Unit)}
                      className="mr-2"
                    />
                    {t.lbs}
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.device}
                  </label>
                  <select
                    value={device}
                    onChange={(e) => setDevice(e.target.value as Device)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="grigri">{t.grigri}</option>
                    <option value="atc">{t.atc}</option>
                    <option value="megajul">{t.megajul}</option>
                    <option value="reverso">{t.reverso}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.experience}
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value as Experience)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">{t.beginner}</option>
                    <option value="intermediate">{t.intermediate}</option>
                    <option value="advanced">{t.advanced}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={calculateSafety}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t.calculate}
              </button>
              <button
                onClick={savePair}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {t.save}
              </button>
            </div>
          </div>

          {result && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.results}</h2>

              <div className={`p-4 rounded-lg mb-4 ${result.safety === 'safe' ? 'bg-green-100 border-green-400' :
                result.safety === 'caution' ? 'bg-yellow-100 border-yellow-400' :
                  'bg-red-100 border-red-400'
                } border-l-4`}>
                <div className="text-lg font-semibold mb-2">
                  {result.safety === 'safe' ? t.safe :
                    result.safety === 'caution' ? t.caution : t.unsafe}
                </div>
                <div className="text-sm text-gray-600">
                  {t.weightDiff}: {result.weightDiff}{unit} ({result.percentDiff}%)
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.recommendations}</h3>
                <p className="text-gray-700">{result.recommendation}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.safetyTips}</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {result.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {commonPairs.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{t.commonPairs}</h2>
                <button
                  onClick={clearPairs}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  {t.clear}
                </button>
              </div>

              <div className="grid gap-2">
                {commonPairs.map((pair, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>
                      {t.climberWeight}: {pair.climber}{pair.unit} | {t.belayerWeight}: {pair.belayer}{pair.unit}
                    </span>
                    <span className="text-sm text-gray-500">{pair.device}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
