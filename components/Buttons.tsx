import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface ButtonsProps {
  savePair: () => void;
  t: {
    calculate: string;
    save: string;
    calculating: string;
  };
  isLoading: boolean;
}

/**
 * Renders the main action buttons for the calculator.
 * @param {object} props - The component props.
 * @param {function} props.savePair - Function to save the current pair.
 * @param {object} props.t - The translation object.
 * @param {boolean} props.isLoading - Whether the calculation is in progress.
 */
const Buttons = ({ savePair, t, isLoading }: ButtonsProps) => {
  return (
    <div className="mt-6 flex gap-4 max-md:flex-col">
      <Button
        type="submit"
        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            {t.calculating}
          </div>
        ) : (
          t.calculate
        )}
      </Button>
      <Button
        type="button"
        onClick={savePair}
        className="px-4 py-3 border-green-600 border-1 bg-white text-green-600 rounded-lg hover:border-green-700 hover:text-white hover:bg-green-700 transition-colors"
      >
        {t.save}
      </Button>
    </div>
  );
};

export default Buttons;