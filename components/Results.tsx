import type { ResultState, Unit } from "@/lib/types";
import type { FormData } from "@/lib/schema";
import { Card, CardContent } from "@/components/ui/card";

import IconCaution from './Icons/IconCaution';
import IconSafe from './Icons/IconSafe'

interface ResultsProps {
  result: ResultState | null;
  unit: Unit;
  t: { [key: string]: string };
  formData: FormData;
}

/**
 * Renders the safety assessment results after a calculation is performed.
 * It shows the safety level, weight difference, recommendations, and tips.
 * Returns null if no result is available.
 * @param {object} props - The component props.
 * @param {ResultState | null} props.result - The result object from the calculation.
 * @param {Unit} props.unit - The currently selected weight unit.
 * @param {object} props.t - The translation object.
 */
const Results = ({ result, unit, t, formData }: ResultsProps) => {
  if (!result) {
    return null;
  }

  return (
    // TODO: make this whole model follow the color of the result
    <>
      <div
        className={`p-4 rounded-lg mb-4 border-1
          ${result.safety === "safe"
            ? "bg-bg-green border-border-green dark:bg-bg-green_dark/30 dark:border-border-green_dark/85"
            : result.safety === "caution"
              ? "bg-bg-yellow border-border-yellow dark:bg-bg-yellow_dark/30 dark:border-border-yellow_dark/85"
              : "bg-lighter-red border-darker-red dark:bg-even-darker-red_dark/30 dark:border-brighter-red_dark/85"
          }`}
      >
        <div>
          <div className="flex gap-3">
            <div className="text-3xl">
              {result.safety === "safe"
                ? <IconSafe className="h-[32px] w-[32px] text-icon-green dark:text-icon-green_dark" />
                : result.safety === "caution"
                  ? <IconCaution className="h-[32px] w-[32px] text-icon-yellow dark:text-icon-yellow_dark" />
                  : <IconCaution className="h-[32px] w-[32px] text-icon-red dark:text-icon-red_dark" />
              }
            </div>
            <div>
              <div className="flex flex-col">
                {/* Displaying the safety level with appropriate styling */}
                <div className={`text-lg font-bold mb-2 text-black
                ${result.safety === "safe"
                    ? "text-text-green dark:text-text-green_dark"
                    : result.safety === "caution"
                      ? "text-text-yellow dark:text-text-yellow_dark"
                      : "text-even-darker-red dark:text-even-brighter-red_dark"
                  }`}
                >
                  {result.safety === "safe"
                    ? t.safe
                    : result.safety === "caution"
                      ? t.caution
                      : t.unsafe}
                </div>
                {/* Displaying the weight difference and percentage difference */}
                <div className="flex gap-4 max-sm:flex-col mb-2">
                  <Card className="p-3 block border-0 shadow-none">
                    <p className="font-medium">{t.weightDiff}</p>
                    <p className="font-semibold">{result.weightDiff} {unit}</p>
                  </Card>
                  <Card className="p-3 block border-0 shadow-none">
                    <p className="font-medium">{t.weightDiffPercentage}</p>
                    <p className="font-semibold">({result.percentDiff}%)</p>
                  </Card>
                </div>
                {/* Displaying whether the climber or belayer is heavier */}
                {/* ! TODO: BUG: even with OHM checked, warning shows climber heavier even when untrue */}
                <div className="font-medium">
                  {parseFloat(result.weightDiff) === 0
                    ? <p className="text-text-green dark:text-text-green_dark">{t.equalWeight}</p>
                    : result.isHeavierClimber
                      ? <p className={
                        result.safety === "caution"
                          ? "text-text-yellow dark:text-text-yellow_dark"
                          : "text-even-darker-red dark:text-even-brighter-red_dark"
                      }>
                        {t.climberHeavier}
                      </p>
                      : <p className="text-text-green dark:text-text-green_dark">{t.belayerHeavier}</p>
                  }
                </div>
              </div>
              {/* Displaying the use of Ohm device if applicable */}
              {formData.useOhm && (
                <div className="text-sm text-blue-600 font-medium mt-1">
                  ✓ {t.useOhm}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Displaying the use of Ohm device if applicable */}
      {/* {formData.useOhm && (
        <div className="text-sm text-blue-600 font-medium mt-1">
          ✓ {t.useOhm}
        </div>
      )} */}

      <Card className="mb-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">{t.results}</h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              {t.recommendations}
            </h3>
            <p>{result.recommendation}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t.safetyTips}
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {result.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Results;