import { useAppSelector } from "@/hooks/hooks"
import { Bot, Plus, Trophy } from "lucide-react"
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

      {/* <div className="fixed bottom-0 w-full ">

      </div> */}
      <button className="flex items-center gap-2 fixed bottom-5 right-5 p-2 px-4 font-semibold bg-primaryColor rounded-md animate-bounce duration-1000">
        <Bot />
        Suggestions
      </button>

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
            src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-dbbc-61f7-905c-af89e53a2bf0/raw?se=2025-05-04T06%3A52%3A50Z&sp=r&sv=2024-08-04&sr=b&scid=7df338cd-0ea0-521d-948b-c570c844c66f&skoid=7c382de0-129f-486b-9922-6e4a89c6eb7d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-03T19%3A39%3A08Z&ske=2025-05-04T19%3A39%3A08Z&sks=b&skv=2024-08-04&sig=xUhu%2BM/b/WEB6Ixfl39yknNq3anN6g01jPlpYCNnoWQ%3D" 
            alt="hero"
            className="block dark:hidden mx-auto max-w-[450px] w-full max-h-[440px] h-full" 
          />
          <img 
            src="https://sdmntprwestus.oaiusercontent.com/files/00000000-219c-6230-b7b1-10853dfad152/raw?se=2025-05-04T07%3A14%3A21Z&sp=r&sv=2024-08-04&sr=b&scid=2050f408-3328-5e2e-be22-f07a7c548fe1&skoid=aa8389fc-fad7-4f8c-9921-3c583664d512&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-03T23%3A16%3A16Z&ske=2025-05-04T23%3A16%3A16Z&sks=b&skv=2024-08-04&sig=BQU/r21/vHIouBh2hysDvMTkqCFB%2BgySuONB%2BUBQfxk%3D" 
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