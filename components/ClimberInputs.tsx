import type { Device } from "@/lib/recommendations";
import type { Experience, Unit } from "@/lib/types";

interface ClimberInputsProps {
  climberWeight: string;
  setClimberWeight: (value: string) => void;
  belayerWeight: string;
  setBelayerWeight: (value: string) => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  device: Device;
  setDevice: (device: Device) => void;
  experience: Experience;
  setExperience: (experience: Experience) => void;
  t: { [key: string]: string };
}

/**
 * Renders all the user input fields for the calculator.
 * This includes weights, units, belay device, and belayer experience.
 * @param {object} props - The component props, which includes state values and their setters.
 */
const ClimberInputs = ({
  climberWeight,
  setClimberWeight,
  belayerWeight,
  setBelayerWeight,
  unit,
  setUnit,
  device,
  setDevice,
  experience,
  setExperience,
  t,
}: ClimberInputsProps) => {
  return (
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
  );
};

export default ClimberInputs;