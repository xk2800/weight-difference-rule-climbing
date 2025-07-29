"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, type FormData } from "@/lib/schema";
import { translations, type Language } from "../lib/translations";
import { deviceRecommendations } from '../lib/recommendations';
import type { Experience, ResultState, Pair } from '../lib/types';
import Heading from '@/components/Header/Heading';
import LanguageSelector from '@/components/LanguageSelector';
import ClimberInputs from '@/components/ClimberInputs';
// import Buttons from '@/components/Buttons';
import Results from '@/components/Results';
import CommonPairs from '@/components/CommonPairs';
import InstallPrompt from '@/components/Install/InstallPrompt';
import Link from 'next/link';
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      climberWeight: undefined,
      belayerWeight: undefined,
      unit: "kg",
      device: "manual",
      experience: "intermediate",
      useOhm: false,
    },
  });

  const [result, setResult] = useState<ResultState | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [commonPairs, setCommonPairs] = useState<Pair[]>([]);

  const t = translations[language];

  const climberWeight = form.watch("climberWeight");
  const belayerWeight = form.watch("belayerWeight");
  const unit = form.watch("unit");
  const device = form.watch("device");
  const experience = form.watch("experience");
  const useOhm = form.watch("useOhm");

  const calculateSafety = useCallback((data: FormData) => {
    const climber = data.climberWeight;
    let belayer = data.belayerWeight;

    if (!climber || !belayer || climber <= 0 || belayer <= 0) {
      setResult(null);
      return;
    };

    // Add 25kg to belayer weight if using Ohm (regardless of unit - Ohm effect is constant)
    if (data.useOhm) {
      if (data.unit === "lbs") {
        // Convert 25kg to lbs (25kg ≈ 55lbs)
        belayer += 55;
      } else {
        belayer += 25;
      }
    }

    const isHeavierClimber = climber > belayer;

    if (!isHeavierClimber) {
      const weightDiff = belayer - climber;
      const percentDiff = (weightDiff / climber) * 100;

      const safety: ResultState['safety'] = 'safe';
      let recommendation = t.belayerHeavierSafe;

      if (percentDiff > 50) {
        recommendation = t.belayerSignificantlyHeavierSafe;
      }

      setResult({
        safety,
        weightDiff: weightDiff.toFixed(1),
        percentDiff: percentDiff.toFixed(1),
        recommendation,
        tips:
          deviceRecommendations[data.device].tips[language] ||
          deviceRecommendations[data.device].tips.en,
        isHeavierClimber,
      });
      return;
    }

    const weightDiff = climber - belayer;
    const percentDiff = (weightDiff / belayer) * 100;

    const deviceConfig = deviceRecommendations[data.device];
    let safety: ResultState['safety'] = 'safe';
    let recommendation = '';

    const experienceMultiplier: Record<Experience, number> = {
      beginner: 0.8,
      intermediate: 1.0,
      advanced: 1.2
    };

    // Use Ohm-specific thresholds if Ohm is being used
    const maxDiff = data.useOhm ? deviceConfig.maxDiffWithOhm : deviceConfig.maxDiff;
    const minDiff = data.useOhm ? deviceConfig.minDiffWithOhm : deviceConfig.minDiff;

    const adjustedMaxDiff = maxDiff * experienceMultiplier[data.experience];
    let adjustedMinDiff = minDiff * experienceMultiplier[data.experience];

    if (data.device === 'assistedActive' && (data.experience === 'intermediate' || data.experience === 'advanced')) {
      adjustedMinDiff = adjustedMaxDiff;
    }

    if (percentDiff > adjustedMaxDiff) {
      safety = 'unsafe';
      recommendation = t.climberSignificantlyHeavierUnsafe;
    } else if (percentDiff > adjustedMinDiff) {
      safety = 'caution';
      recommendation = t.climberHeavierCaution;
    } else {
      safety = 'safe';
      recommendation = t.weightDifferenceAcceptable;
    }

    setResult({
      safety,
      weightDiff: weightDiff.toFixed(1),
      percentDiff: percentDiff.toFixed(1),
      recommendation,
      tips: deviceConfig.tips[language] || deviceConfig.tips.en,
      isHeavierClimber,
    });
  }, [t, language]);

  useEffect(() => {
    const formData = { climberWeight, belayerWeight, unit, device, experience, useOhm };
    if (climberWeight && belayerWeight) {
      calculateSafety(formData as FormData);
    } else {
      setResult(null);
    }
  }, [climberWeight, belayerWeight, unit, device, experience, useOhm, calculateSafety]);

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.includes('ms') || browserLang.includes('my')) {
      setLanguage('ms');
    } else if (browserLang.includes('zh') || browserLang.includes('cn')) {
      setLanguage('zh');
    } else {
      setLanguage('en');
    }
    const saved = localStorage.getItem('commonPairs');
    if (saved) {
      setCommonPairs(JSON.parse(saved));
    }
  }, []);

  // Update result text when language changes
  useEffect(() => {
    if (result) {
      const formData = form.getValues();
      const deviceConfig = deviceRecommendations[formData.device];

      let recommendation = '';

      if (!result.isHeavierClimber) {
        // Belayer is heavier
        const climber = formData.climberWeight || 0;
        const belayer = formData.belayerWeight || 0;
        const percentDiff = ((belayer - climber) / climber) * 100;

        if (percentDiff > 50) {
          recommendation = t.belayerSignificantlyHeavierSafe;
        } else {
          recommendation = t.belayerHeavierSafe;
        }
      } else {
        // Climber is heavier
        if (result.safety === 'unsafe') {
          recommendation = t.climberSignificantlyHeavierUnsafe;
        } else if (result.safety === 'caution') {
          recommendation = t.climberHeavierCaution;
        } else {
          recommendation = t.weightDifferenceAcceptable;
        }
      }

      // Only update if the recommendation or tips have changed
      const newTips = deviceConfig.tips[language] || deviceConfig.tips.en;
      if (result.recommendation !== recommendation || result.tips !== newTips) {
        setResult(prevResult => ({
          ...prevResult!,
          recommendation,
          tips: newTips,
        }));
      }
    }
  }, [language, t, result, form]);

  // const savePair = () => {
  //   form.trigger().then((isValid) => {
  //     if (isValid) {
  //       const { climberWeight, belayerWeight, unit, device, useOhm } = form.getValues();
  //       const pair = {
  //         climber: climberWeight,
  //         belayer: belayerWeight,
  //         unit,
  //         device,
  //         useOhm,
  //         timestamp: new Date().toISOString()
  //       };

  //       const updated = [...commonPairs, pair].slice(-10);
  //       setCommonPairs(updated);
  //       localStorage.setItem('commonPairs', JSON.stringify(updated));
  //     }
  //   });
  // };

  const clearPairs = () => {
    setCommonPairs([]);
    localStorage.removeItem('commonPairs');
  };

  return (
    <>
      <Heading key={language} t={t} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 dark:from-gray-700 dark:to-gray-950">
        <div className="max-w-4xl mx-auto">
          <LanguageSelector language={language} setLanguage={setLanguage} t={t} />
          <h1 className="text-3xl font-bold text-center mb-5 max-md:order-2">{t.title}</h1>
          <Card className="mb-6"> {/* bg-white rounded-lg shadow-lg p-6 mb-6 */}
            <CardContent>

              <form>
                <ClimberInputs
                  form={form}
                  t={t}
                />
                {/* <Buttons savePair={savePair} t={t} /> */}
              </form>
            </CardContent>
          </Card>

          {result && <Results result={result} unit={unit} t={t} formData={form.getValues()} />}

          {commonPairs.length > 0 && (
            <CommonPairs
              commonPairs={commonPairs}
              clearPairs={clearPairs}
              t={t}
            />
          )}

          <footer className="text-center mt-6 text-sm text-gray-500">
            <p>
              {t.disclaimer}
            </p>
            <p className='flex items-center justify-center gap-x-2 mt-2'>
              <Link href="https://github.com/xk2800/weight-difference-rule-climbing" target='_blank'><GitHubLogoIcon /></Link>
              Made by me, <Link href="https://www.instagram.com/ibecameamonkey/" className='underline' target='_blank'>@ibecameamonkey</Link> in Malaysia
            </p>
          </footer>
        </div>
      </div>

      <InstallPrompt language={language} t={t} />
    </>
  );
}
