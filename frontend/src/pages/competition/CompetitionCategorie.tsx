import { ICompetition } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {  useParams } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import Card from "@/components/Card"

const CompetitionCategorie = () => {
    const { category } = useParams()
    const { t } = useTranslation()
    const [competitions, setCompetitions] = useState<ICompetition[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCompetitionByCategory = async () => {
      setIsLoading(true)
      try {
        const competitions = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/category/${category}`)).data;
        setCompetitions(competitions)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(()=>{
      getCompetitionByCategory()
    }, [category])

    console.log(competitions)

  return (
    <div className="mt-5 text-black dark:text-white">
        <h2 className="text-3xl font-bold">{category} {t("competitions")}</h2>

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
          competitions.map((item) => (
            <Card 
              key={item.id}
              item={item}
            />
          ))
        )}
        
        </div>
    </div>
  )
}

export default CompetitionCategorie