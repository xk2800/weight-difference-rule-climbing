import { Language, translations } from "@/lib/translations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import InstallButton from "./InstallButton";

interface LanguageSelectorProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof translations[Language];
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
    <div className="flex justify-between items-center mb-6 gap-4 max-md:flex-col">
      <h1 className="text-3xl font-bold text-gray-800 max-md:order-2">{t.title}</h1>
      <div className="max-md:w-full flex justify-end max-md:order-1 gap-2">
        <InstallButton language={language} t={t} />
        <Select
          value={language}
          onValueChange={(value) => setLanguage(value as Language)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ms">Bahasa Malaysia</SelectItem>
            <SelectItem value="zh">中文</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelector;