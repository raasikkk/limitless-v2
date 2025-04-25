import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../components/LanguageSwitcher"
import ThemeSwitcher from "../components/ThemeSwitcher"

const Settings = () => {
  const { t } = useTranslation()
  return (
    <div className="mt-5 text-black dark:text-white">
      <h2 className="text-3xl font-bold">{t("settings")}</h2>
      <p className="mt-3">Control over your Limitless account</p>

      <h2 className="mt-10 text-xl font-bold">Account</h2>
      <div className="space-y-2">
        <h3 className="mt-2 font-medium">Your email address:</h3>
        <p className="text-sm">zhankeldiulyrasultop1@gmail.com</p>
        <button 
          className="p-2 px-4 text-black dark:text-white font-semibold border rounded-full"
        >
          Change email
        </button>
      </div>


      <ThemeSwitcher />

      <LanguageSwitcher />
    </div>
  )
}

export default Settings