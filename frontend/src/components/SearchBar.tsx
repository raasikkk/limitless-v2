import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Profile from "./Profile"

const SearchBar = () => {
    const { t } = useTranslation()

    const isLoggedin = true
  return (
    <div className="flex items-center justify-between gap-5">
        <form 
          className="relative w-full " //sm:w-4/5
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            className="pl-10 lg:pl-10 p-2 lg:p-3 w-full bg-white dark:bg-[#1E293B] border rounded-full outline-none"
            placeholder={t('search')}
          />
        </form>

        {
          isLoggedin ? (
            <div className="hidden sm:block">
              <Profile />
            </div>
          ) : (
            <div className="hidden sm:flex items-center text-center gap-5">
              <Link
                to="/auth/signin"
                className="min-w-24 p-2 px-4 text-black border-2 font-bold rounded-full hover:bg-gray-100"
              >
                {t('signin')}
              </Link>
              <Link
                to="/auth/register"
                className="min-w-24 p-2 px-4 text-white bg-black font-bold rounded-full hover:drop-shadow-md"
              >
                {t('register')}
              </Link>
            </div>
          )
        }
      </div>
  )
}

export default SearchBar