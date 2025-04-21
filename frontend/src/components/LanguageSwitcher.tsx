import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => i18n.changeLanguage('en')}
      >
        EN
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => i18n.changeLanguage('kk')}
      >
        KK
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => i18n.changeLanguage('ru')}
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;