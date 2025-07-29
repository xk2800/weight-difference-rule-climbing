import { Language, translations } from "@/lib/translations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import InstallButton from "./Install/InstallButton";
import { ModeToggle } from "./DarkMode/ModeTrigger";

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
    <div className="flex justify-end items-center mb-6 gap-4 max-md:flex-col">
      <div className="max-md:w-full flex justify-end max-md:order-1 gap-2">
        <ModeToggle />
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