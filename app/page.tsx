"use client";

import { useState, useEffect } from 'react';
import { translations, type Language } from '../lib/translations';
import { deviceRecommendations, type Device } from '../lib/recommendations';
import type { Experience, Unit, ResultState, Pair } from '../lib/types';
import Heading from '@/components/Header/Heading';
import LanguageSelector from '@/components/LanguageSelector';
import ClimberInputs from '@/components/ClimberInputs';
import Buttons from '@/components/Buttons';
import Results from '@/components/Results';
import CommonPairs from '@/components/CommonPairs';

export default function Home() {
  // --- State Management ---
  // Input state for climber and belayer weights
  const [climberWeight, setClimberWeight] = useState('');
  const [belayerWeight, setBelayerWeight] = useState('');
  // Unit for weight (kg or lbs)
  const [unit, setUnit] = useState<Unit>('kg');
  // Selected belay device
  const [device, setDevice] = useState<Device>('grigri');
  // Belayer's experience level
  const [experience, setExperience] = useState<Experience>('intermediate');
  // Stores the result of the safety calculation
  const [result, setResult] = useState<ResultState | null>(null);
  // Current language for translations
  const [language, setLanguage] = useState<Language>('en');
  // List of recently saved climber-belayer pairs
  const [commonPairs, setCommonPairs] = useState<Pair[]>([]);

  // Memoize translations object based on the current language
  const t = translations[language];

  // --- Side Effects ---
  // Runs once on component mount
  useEffect(() => {
    // Auto-detect user's browser language and set it as default
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.includes('ms') || browserLang.includes('my')) {
      setLanguage('ms');
    } else if (browserLang.includes('zh') || browserLang.includes('cn')) {
      setLanguage('zh');
    } else {
      setLanguage('en');
    }

    // Load previously saved pairs from localStorage
    const saved = localStorage.getItem('commonPairs');
    if (saved) {
      setCommonPairs(JSON.parse(saved));
    }
  }, []);

  // --- Core Logic ---
  /**
   * Calculates climbing safety based on climber and belayer weights,
   * belay device, and belayer experience.
   */
  const calculateSafety = () => {
    const climber = parseFloat(climberWeight);
    const belayer = parseFloat(belayerWeight);

    // Abort if weights are invalid
    if (!climber || !belayer || climber <= 0 || belayer <= 0) return;

    const isHeavierClimber = climber > belayer;

    // Scenario 1: Belayer is heavier than or equal to the climber.
    // This is generally the safest configuration.
    if (!isHeavierClimber) {
      const weightDiff = belayer - climber;
      const percentDiff = (weightDiff / climber) * 100;

      const safety: ResultState['safety'] = 'safe';
      let recommendation = 'Belayer is heavier than the climber. This is a safe configuration. The belayer should focus on providing a dynamic catch to prevent a hard fall for the climber.';

      // Provide additional advice if the weight difference is very large.
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

    // Scenario 2: Climber is heavier than the belayer.
    // This introduces risk that needs to be managed.
    const weightDiff = climber - belayer;
    const percentDiff = (weightDiff / belayer) * 100; // Risk is relative to belayer's weight.

    const deviceConfig = deviceRecommendations[device];
    let safety: ResultState['safety'] = 'safe';
    let recommendation = '';

    // Adjust safety thresholds based on the belayer's experience level.
    const experienceMultiplier: Record<Experience, number> = {
      beginner: 0.8, // Less experience, smaller safe weight difference
      intermediate: 1.0,
      advanced: 1.2  // More experience, can handle larger weight difference
    };

    const adjustedMaxDiff = deviceConfig.maxDiff * experienceMultiplier[experience];
    const adjustedMinDiff = deviceConfig.minDiff * experienceMultiplier[experience];

    // Determine safety level based on adjusted thresholds.
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

  /**
   * Saves the current climber-belayer pair to localStorage.
   * Keeps a maximum of 10 pairs.
   */
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

  /**
   * Clears all saved pairs from state and localStorage.
   */
  const clearPairs = () => {
    setCommonPairs([]);
    localStorage.removeItem('commonPairs');
  };

  return (
    <>
      {/* Renders the dynamic browser tab title and meta description. */}
      <Heading key={language} t={t} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {/* Renders the page title and language selector dropdown. */}
            <LanguageSelector language={language} setLanguage={setLanguage} t={t} />

            {/* Renders all the inputs for climber/belayer weights, units, device, and experience. */}
            <ClimberInputs
              climberWeight={climberWeight}
              setClimberWeight={setClimberWeight}
              belayerWeight={belayerWeight}
              setBelayerWeight={setBelayerWeight}
              unit={unit}
              setUnit={setUnit}
              device={device}
              setDevice={setDevice}
              experience={experience}
              setExperience={setExperience}
              t={t}
            />

            {/* Renders the 'Calculate' and 'Save' buttons. */}
            <Buttons
              calculateSafety={calculateSafety}
              savePair={savePair}
              t={t}
            />
          </div>

          {/* Renders the safety assessment results after calculation. */}
          <Results result={result} unit={unit} t={t} />

          {/* Renders the list of recently saved pairs. */}
          <CommonPairs commonPairs={commonPairs} clearPairs={clearPairs} t={t} />
        </div>
      </div>
    </>
  );
}
