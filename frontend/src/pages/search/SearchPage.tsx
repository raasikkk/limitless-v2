import Card from "@/components/Card"
import FollowerCard from "@/components/FollowerCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ICompetition, IUser } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

const SearchPage = () => {
    const { t } = useTranslation()
    const location = useLocation();
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
    const [query] = useState(removeSpace)
    const [competitions, setCompetitions] = useState<ICompetition[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async () => {
        setIsLoading(true)
        try {
            const result = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/search?q=${query}`)).data;
            setCompetitions(result.competitions)
            setUsers(result.users)
            console.log(result);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [])

  
    return (
    <div className="mt-5 text-black dark:text-white">
        <h2 className="text-3xl font-bold">{t("search")}</h2>

        <Tabs className="mt-5" defaultValue="competitions">
            <TabsList className="rounded-none bg-transparent justify-start overflow-x-scroll overflow-y-hidden border-b w-full mb-10">
                <TabsTrigger value="competitions" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
                    {t("competitions")}
                </TabsTrigger>
                <TabsTrigger value="users" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
                    {t("competition.users")}
                </TabsTrigger>
            </TabsList>

            <TabsContent value="competitions">
                {competitions.length === 0 ? (
                    <h3>Oops! There's no such competition!</h3>
                ) : (
                    ""
                )}
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
            </TabsContent>
            <TabsContent value="users">
                <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                    {users.map((item) => (
                        <FollowerCard 
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            </TabsContent>
        </Tabs>

    </div>
  )
}

export default SearchPage