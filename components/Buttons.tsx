interface ButtonsProps {
  calculateSafety: () => void;
  savePair: () => void;
  t: {
    calculate: string;
    save: string;
  };
}

/**
 * Renders the main action buttons for the calculator.
 * @param {object} props - The component props.
 * @param {function} props.calculateSafety - Function to run the safety calculation.
 * @param {function} props.savePair - Function to save the current pair.
 * @param {object} props.t - The translation object.
 */
const Buttons = ({ calculateSafety, savePair, t }: ButtonsProps) => {
  return (
    <div className="mt-6 flex space-x-4">
      <button
        onClick={calculateSafety}
        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        {t.calculate}
      </button>
      <button
        onClick={savePair}
        className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        {t.save}
      </button>
    </div>
  );
};

export default Buttons;