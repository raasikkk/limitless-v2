import { useAppSelector } from "@/hooks/hooks"
import { Plus, Trophy } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
// import LanguageSwitcher from "../components/LanguageSwitcher"

const visiters = [
  {
    id: 1,
    people: "learners",
    description: "learners_description",
    img: "/learners.svg"
  },
  {
    id: 2,
    people: "developers",
    description: "developers_description",
    img: "developers.svg"
  },
  {
    id: 3,
    people: "researchers",
    description: "researchers_description",
    img: "researchers.svg"
  }
]

const Home = () => {
  const { t } = useTranslation()
  const {isLogged, user} = useAppSelector((state)=>state.user)
  
  return (
    <div className="text-black dark:text-white ">
      {isLogged ? (
        <div className="pt-10 flex flex-wrap lg:flex-nowrap justify-between gap-3">
          <div className="pt-10 lg:pt-20 w-full lg:w-1/2 flex flex-col gap-3">
            <h1 className="font-bold text-4xl md:text-5xl">{t('welcome')}, {user?.username}!</h1>
            {/* <LanguageSwitcher /> */}
            <p className="lg:w-2/3 text-lg">{t("motivational_phrase")}</p>

            <div className="pt-5 flex flex-wrap items-center gap-3">
              <button 
                className="p-2 px-4 flex items-center gap-2 border rounded-full font-semibold"
              >
                {/* <img src="/google-icon.svg" alt="google" width={20} /> */}
                <span className="flex items-center gap-2">
                  <Trophy size={20} />
                  {t("competitions")}
                </span>
              </button>
              <button
                className="p-2 px-4 flex items-center gap-1.5 border rounded-full font-semibold"
              >
                <Plus />
                {t("create")} 
              </button>
            </div> 
          </div>
          <img 
            src="/hero.png" 
            alt="hero"
            className="block mx-auto max-w-[500px] w-full max-h-[440px] h-full" 
          />
        </div>
      ) : (
        <div className="pt-10 flex flex-wrap lg:flex-nowrap justify-between gap-3">
          <div className="pt-5 lg:pt-20 w-full lg:w-1/2 flex flex-col gap-3">
            {/* <LanguageSwitcher /> */}
            <h1 className="font-bold text-4xl md:text-5xl">{t('Level up')}</h1>
            <p className="lg:w-2/3">{t("Grow your skills")}</p>

            
            <div className="pt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/auth/register" 
                className="p-2 px-4 flex items-center gap-2 border rounded-full font-semibold"
              >
                <img src="/google-icon.svg" alt="google" width={20} />
                <span>{t("register_google")}</span>
              </Link>
              <Link
                to="/auth/register" 
                className="p-2 px-4 flex items-center gap-2 border rounded-full font-semibold"
              >
                {t("register_email")}
              </Link>
            </div>  
          </div>

          <img 
            src="/hero.png" 
            alt="hero"
            className="block mx-auto max-w-[500px] w-full max-h-[440px] h-full" 
          />
        </div>
      )}

      <div className="my-5">
        <h2 className="font-bold text-2xl">{t("who_is_on")}</h2>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-3">
          {visiters.map((item) => (
            <div key={item.id} className="max-w-96 w-full flex items-center gap-1">
              <div>
                <h3 className="font-semibold text-lg">{t(item.people)}</h3>
                <p className="text-sm">{t(item.description)}</p>
              </div>
              <img 
                src={item.img} 
                alt={item.people} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home