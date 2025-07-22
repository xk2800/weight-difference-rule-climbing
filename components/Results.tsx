import type { ResultState, Unit } from "@/lib/types";
import type { FormData } from "@/lib/schema";
import { Card, CardContent } from "./ui/card";

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
    <Card className=" mb-6">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">{t.results}</h2>

        <div
          className={`p-4 rounded-lg mb-4 ${result.safety === "safe"
            ? "bg-green-100 border-green-400"
            : result.safety === "caution"
              ? "bg-yellow-100 border-yellow-400"
              : "bg-red-100 border-red-400"
            } border-l-4`}
        >
          <div className="text-lg font-semibold mb-2 text-black">
            {result.safety === "safe"
              ? t.safe
              : result.safety === "caution"
                ? t.caution
                : t.unsafe}
          </div>
          <div className="text-sm text-gray-600">
            {t.weightDiff}: {result.weightDiff}
            {unit} ({result.percentDiff}%)
          </div>
          <div className="text-sm text-gray-600 italic">
            {parseFloat(result.weightDiff) === 0
              ? t.equalWeight
              : result.isHeavierClimber
                ? t.climberHeavier
                : t.belayerHeavier}
          </div>
          {formData.useOhm && (
            <div className="text-sm text-blue-600 font-medium mt-1">
              ✓ {t.useOhm}
            </div>
          )}
        </div>

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
  );
};

export default Results;