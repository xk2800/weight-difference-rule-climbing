import type { Pair } from "@/lib/types";

interface CommonPairsProps {
  commonPairs: Pair[];
  clearPairs: () => void;
  t: { [key: string]: string };
}

/**
 * Renders the list of recently saved climber/belayer pairs.
 * Also includes a button to clear all saved pairs.
 * Returns null if there are no saved pairs.
 * @param {object} props - The component props.
 * @param {Pair[]} props.commonPairs - The array of saved pairs.
 * @param {function} props.clearPairs - The function to clear all pairs.
 * @param {object} props.t - The translation object.
 */
const CommonPairs = ({
  commonPairs,
  clearPairs,
  t,
}: CommonPairsProps) => {
  if (commonPairs.length === 0) {
    return null;
  }

  return (
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
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
          >
            <span>
              {t.climberWeight}: {pair.climber}
              {pair.unit} | {t.belayerWeight}: {pair.belayer}
              {pair.unit}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{pair.device}</span>
              {pair.useOhm && (
                <span className="text-blue-600 font-medium">+ Ohm</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonPairs;