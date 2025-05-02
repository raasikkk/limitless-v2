import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Profile from "./Profile"
import { useAppSelector } from "@/hooks/hooks"
import { useEffect, useState } from "react"

const SearchBar = () => {
  const { t } = useTranslation()
  const {isLogged} = useAppSelector((state)=>state.user)

  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  const [query, setQuery] = useState(removeSpace)
  const navigate = useNavigate()

  useEffect(() => {
    if (query) {
      navigate(`/search?q=${query}`)
    }
  }, [query])

  useEffect(() => {
    setQuery(removeSpace)
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  
  return (
    <div className="flex items-center justify-between gap-5">
        <form 
          className="relative w-full "
          onSubmit={handleSubmit}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 lg:pl-10 p-2 lg:p-3 w-full bg-white dark:bg-darkColor/50 border rounded-full outline-none"
            placeholder={t('search')}
          />
        </form>

        {
          isLogged ? (
            <div className="hidden sm:block">
              <Profile />
            </div>
          ) : (
            <div className="hidden sm:flex items-center text-center gap-5">
              <Link
                to="/auth/signin"
                className="min-w-24 p-2 px-4 text-black dark:text-white border-2 font-bold rounded-full hover:bg-gray-100 dark:hover:bg-darkSecondary"
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