import { Controller } from "react-hook-form";
import type { FormData } from "@/lib/schema";
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
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";

interface ClimberInputsProps {
  form: UseFormReturn<FormData>;
  t: { [key: string]: string };
}

const ClimberInputs = ({ form, t }: ClimberInputsProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <p className="font-bold text-xl">Climber & Belayer</p>
        <div>
          <Label
            htmlFor="climberWeight"
            className="block text-sm font-medium mb-2"
          >
            {t.climberWeight} ({t[form.watch("unit")]})
          </Label>
          <Input
            id="climberWeight"
            type="number"
            {...register("climberWeight", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            placeholder="70"
          // value='40'
          />
          {errors.climberWeight && (
            <p className="text-red-500 text-xs mt-1">
              {errors.climberWeight.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="belayerWeight"
            className="block text-sm font-medium mb-2"
          >
            {t.belayerWeight} ({t[form.watch("unit")]})
          </Label>
          <Input
            id="belayerWeight"
            type="number"
            {...register("belayerWeight", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            placeholder="65"
          // value='32'
          />
          {errors.belayerWeight && (
            <p className="text-red-500 text-xs mt-1">
              {errors.belayerWeight.message}
            </p>
          )}
        </div>

        <Controller
          name="unit"
          control={control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
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
          )}
        />
      </div>

      <div className="space-y-4">
        <p className="font-bold text-xl">Equipment & Experience</p>
        <div>
          <Label
            htmlFor="device"
            className="block text-sm font-medium mb-2"
          >
            {t.device}
          </Label>
          <Controller
            name="device"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Belay Device" />
                </SelectTrigger>
                <SelectContent>
                  {/* TODO: Add Modal for Device Description */}
                  <SelectItem value="manual">
                    Manual Belay Device
                  </SelectItem>
                  <SelectItem value="assistedPassive">
                    Assisted Belay - Passive
                  </SelectItem>
                  <SelectItem value="assistedActive">
                    Assisted Belay - Active
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label
            htmlFor="experience"
            className="block text-sm font-medium mb-2"
          >
            {t.experience}
          </Label>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Belayer Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">{t.beginner}</SelectItem>
                  <SelectItem value="intermediate">{t.intermediate}</SelectItem>
                  <SelectItem value="advanced">{t.advanced}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Controller
            name="useOhm"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useOhm"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="useOhm">
                  {t.useOhm}
                </Label>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ClimberInputs;