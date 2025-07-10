import type { Device } from "@/lib/recommendations";
import type { Experience, Unit } from "@/lib/types";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
          <Input
            type="number"
            value={climberWeight}
            onChange={(e) => setClimberWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            placeholder="70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.belayerWeight} ({t[unit]})
          </label>
          <Input
            type="number"
            value={belayerWeight}
            onChange={(e) => setBelayerWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            placeholder="65"
          />
        </div>

        <RadioGroup
          value={unit}
          onValueChange={(value) => setUnit(value as Unit)}
          defaultValue="kg"
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="kg" className="mr-2" id="kg" />
            <Label htmlFor="kg">{t.kg}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lbs" className="mr-2" id="lbs" />
            <Label htmlFor="lbs">{t.lbs}</Label>
          </div>
        </RadioGroup>

      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.device}
          </label>
          <Select
            value={device}
            onValueChange={(value) => setDevice(value as Device)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Belay Device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">
                Manual Belay Device (Exp: ATC/Tube Style)
              </SelectItem>
              <SelectItem value="assistedPassive">
                Assisted Belay - Passive (Exp: Mammut Smart 2.0)
              </SelectItem>
              <SelectItem value="assistedActive">
                Assisted Belay - Active (Exp: GriGri/Neox)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.experience}
          </label>
          <Select
            value={experience}
            onValueChange={(value) => setExperience(value as Experience)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Belayer Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">{t.beginner}</SelectItem>
              <SelectItem value="intermediate">{t.intermediate}</SelectItem>
              <SelectItem value="advanced">{t.advanced}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ClimberInputs;