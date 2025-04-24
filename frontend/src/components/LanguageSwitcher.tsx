import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="mt-5 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Language</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Set your desired language
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => i18n.changeLanguage('en')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${currentLanguage === 'en' 
              ? "bg-primaryColor text-white hover:bg-blue-600" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"}`}
        >
          English
        </button>
        
        <button
          onClick={() => i18n.changeLanguage('kk')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${currentLanguage === 'kk' 
              ? "bg-primaryColor text-white hover:bg-blue-600" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"}`}
        >
          Қазақша
        </button>
        
        <button
          onClick={() => i18n.changeLanguage('ru')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${currentLanguage === 'ru' 
              ? "bg-primaryColor text-white hover:bg-blue-600" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"}`}
        >
          Русский
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;