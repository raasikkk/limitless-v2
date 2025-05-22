import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../components/LanguageSwitcher"
import ThemeSwitcher from "../components/ThemeSwitcher"
// import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const Settings = () => {
  const { t } = useTranslation()
  return (
    <div className="mt-5 text-black dark:text-white">
      <h2 className="text-3xl font-bold">{t("settings")}</h2>
      <p className="mt-3">{t("settingsPage.title")}</p>

      <h2 className="mt-10 text-xl font-bold">{t("account")}</h2>
      <div className="space-y-2">
        <h3 className="mt-2 font-medium">{t("settingsPage.your_email")}:</h3>
        <p className="text-sm">zhankeldiulyrasultop1@gmail.com</p>

        {/* <Dialog>
          <DialogTrigger className="p-2 px-4 text-black dark:text-white font-semibold border rounded-full hover:opacity-75">
            {t("settingsPage.change_profile")}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] ">
            <DialogHeader>
              <DialogTitle>{t("settingsPage.edit_profile")}</DialogTitle>
            </DialogHeader>
            <form className="py-4 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-sm font-medium">{t("username")}</label>
                <input 
                  type="text" 
                  id="username"
                  className="p-2 px-3 text-sm font-medium rounded-md bg-transparent border"
                  placeholder="Your username"
                  value={"rasul"}
                  // onChange={}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">{t("email")}</label>
                <input 
                  type="text" 
                  id="email"
                  className="p-2 px-3 text-sm font-medium rounded-md bg-transparent border disabled:opacity-30"
                  placeholder="Your email"
                  disabled
                  value={"zhankeldiulyrasultop1@gmail.com"}
                  // onChange={}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium">{t("password")}</label>
                <input 
                  type="text" 
                  id="password"
                  className="p-2 px-3 text-sm font-medium rounded-md bg-transparent border"
                  placeholder="Your password"
                  value={"zhankeldiulyrasultop1@gmail.com"}
                  // onChange={}
                />
              </div>
            </form>
            

            <div className="flex justify-end gap-3 text-sm font-medium">
              <DialogClose asChild>
                <button className="border p-2 px-3 rounded-md">{t("cancel")}</button>
              </DialogClose>
              <button
                className="p-2 px-3 bg-darkColor dark:bg-white text-white dark:text-black rounded-md"
                // onClick={} 
              >{t("save_changes")}</button>
            </div>
          </DialogContent>
        </Dialog> */}
      </div>

      


      <ThemeSwitcher />

      <LanguageSwitcher />
    </div>
  )
}

export default Settings