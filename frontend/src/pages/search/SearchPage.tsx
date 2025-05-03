import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { competitions } from "@/constants/competitions"
import { fakePeople } from "@/constants/people"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const SearchPage = () => {
    const { t } = useTranslation()

    
  
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
            </TabsContent>
            <TabsContent value="users">
                <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                    {fakePeople.map((item) => (
                        <Link
                            to={`/profile/30`} 
                            key={item.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors min-w-0"
                        >
                        <img 
                            src={item.avatar} 
                            className="size-8 lg:size-10 rounded-full flex-shrink-0" 
                            alt={item.username} 
                        />
                        <span className="text-xs sm:text-sm font-medium truncate">
                            {item.username}
                        </span>
                        </Link>
                    ))}
                </div>
            </TabsContent>
        </Tabs>

    </div>
  )
}

export default SearchPage