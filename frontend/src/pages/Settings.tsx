import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../components/LanguageSwitcher"
import ThemeSwitcher from "../components/ThemeSwitcher"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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

        <Dialog>
          <DialogTrigger className="p-2 px-4 text-black dark:text-white font-semibold border rounded-full hover:opacity-75">
            Change profile
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] ">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <form className="py-4 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-sm font-medium">Username</label>
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
                <label htmlFor="email" className="text-sm font-medium">Email</label>
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
                <label htmlFor="password" className="text-sm font-medium">Password</label>
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
                <button className="border p-2 px-3 rounded-md">Cancel</button>
              </DialogClose>
              <button
                className="p-2 px-3 bg-darkColor dark:bg-white text-white dark:text-black rounded-md"
                // onClick={} 
              >Save Changes</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      


      <ThemeSwitcher />

      <LanguageSwitcher />
    </div>
  )
}

export default Settings