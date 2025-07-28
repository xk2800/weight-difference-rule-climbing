import { Button } from "./ui/button";

interface ButtonsProps {
  savePair: () => void;
  t: {
    save: string;
  };
}

/**
 * Renders the main action buttons for the calculator.
 * @param {object} props - The component props.
 * @param {function} props.savePair - Function to save the current pair.
 * @param {object} props.t - The translation object.
 */
const Buttons = ({ savePair, t }: ButtonsProps) => {
  return (
    <div className="mt-6 flex gap-4 max-md:flex-col">
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