import Card from "@/components/Card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAppSelector } from "@/hooks/hooks"
import { ICompetition } from "@/types"
import axios from "axios"
import { Plus, Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
// import LanguageSwitcher from "../components/LanguageSwitcher"

const Home = () => {
  const { t } = useTranslation()
  const {isLogged, user} = useAppSelector((state)=>state.user);
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const [isCompetitionsLoading, setIsCompetitionsLoading] = useState(false);

  const getUserCompetitions =async () => {
    setIsCompetitionsLoading(true);
    try {

      const competitions = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/${user?.id}/competitions`)).data;
      setCompetitions(competitions)
    } catch (error) {
      console.log(error);
    } finally {
      setIsCompetitionsLoading(false)
    }
  }

  useEffect(()=> {
    
    getUserCompetitions();
  }, [user?.id])

  
  return (
    <div className="text-black dark:text-white ">

      {/* <div className="fixed bottom-0 w-full ">

      </div> */}

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
                <Link to={`/create`} className="flex items-center gap-2">
                  <Plus />
                  {t("create")}
                </Link>
              </button>
              <Link
                to={`/competitions`}
                className="p-2 px-4 flex items-center gap-1.5 border rounded-full font-semibold"
              >
                <Trophy size={20} />
                {t("competitions")} 
              </Link>
            </div> 
          </div>
          <img 
            src="/hero-white.png" 
            alt="hero"
            className="block dark:hidden mx-auto max-w-[450px] w-full max-h-[440px] h-full" 
          />
          <img 
            src="/hero-black.png" 
            alt="hero"
            className="hidden dark:block mx-auto max-w-[450px] w-full max-h-[440px] h-full" 
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
            src="/hero-white.png" 
            alt="hero"
            className="block dark:hidden mx-auto max-w-[450px] w-full max-h-[440px] h-full" 
          />
          <img 
            src="/hero-black.png" 
            alt="hero"
            className="hidden dark:block mx-auto max-w-[450px] w-full max-h-[440px] h-full" 
          />
        </div>
      )}

      <div className="my-5">
        {competitions.length > 0 ? <h2 className="font-bold text-2xl">{t("competitions")}</h2> : ''}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {isCompetitionsLoading ? (
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl shadow-lg"
              >
                <Skeleton className="w-full aspect-video rounded-t-xl"/>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <Skeleton className="h-4 w-3/4"/>
                </div>
              </div>
            ))
          ) : (
            competitions.map((item) => (
              <Card
                key={item.id}
                item={item}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Home