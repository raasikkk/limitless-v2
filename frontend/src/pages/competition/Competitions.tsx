import { competitions } from "@/constants/competitions"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const Competitions = () => {
  const { t } = useTranslation()
  
  return (
    <div className="mt-5 text-black dark:text-white">
      <h2 className="text-3xl font-bold">{t("competitions")}</h2>

      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {competitions.map((item) => (
          <Link
            to={`/categories/${item.text}`} 
            key={item.id}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={item.img} 
                alt={t(item.text)} 
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-lg font-semibold truncate">{t(item.text)}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Competitions