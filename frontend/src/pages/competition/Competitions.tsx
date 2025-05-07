import { Skeleton } from "@/components/ui/skeleton";
import { ICategory } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const Competitions = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const getCategories =async () => {
    setIsLoading(true)
    try {
      const categories = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/categories`)).data;
      setCategories(categories)
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=> {
    getCategories()
  }, [])
  
  return (
    <div className="mt-5 text-black dark:text-white">
      <h2 className="text-3xl font-bold">{t("competitions")}</h2>

      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {isLoading ? (
          [...Array(8)].map((_, i) => (
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
          categories.map((item) => (
            <Link
              to={`/categories/${item.name}`} 
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={item.cover} 
                  alt={t(item.name)} 
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
              
              <div className="absolute top-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold truncate">{t(item.name)}</h3>
              </div>
            </Link>
          ))

        )}
      </div>
    </div>
  )
}

export default Competitions