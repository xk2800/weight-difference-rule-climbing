import { Language } from "@/lib/translations";

interface LanguageSelectorProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: {
    title: string;
  };
}

/**
 * Renders the page title and language selection dropdown.
 * @param {object} props - The component props.
 * @param {Language} props.language - The current language.
 * @param {function} props.setLanguage - The function to set the language.
 * @param {object} props.t - The translation object.
 */
const LanguageSelector = ({ language, setLanguage, t }: LanguageSelectorProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="en">English</option>
        <option value="ms">Bahasa Malaysia</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
};

export default LanguageSelector;