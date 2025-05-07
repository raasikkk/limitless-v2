import { ICompetition } from "@/types"
import { Rocket, UsersIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { TextOnlyDescription } from "./editor/TextOnlyDescription"

interface CardType {
    item: ICompetition
}

const Card = ({ item }: CardType) => {
  return (
    <Link
        to={`/competitions/${item.id}`}
        key={item.id}
        className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl bg-white dark:bg-darkSecondary border-2"
    >
    <div className="w-full aspect-video overflow-hidden relative">
        <img 
            src={`${item.cover}`} 
            alt="competition image" 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="absolute bottom-2 left-2 bg-white rounded-full shadow-sm z-10">
            <img 
            className="size-10 object-cover rounded-full" 
            src={item.avatar}
            alt="logo" 
            />
        </div>
    </div>
    
    <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold truncate text-black dark:text-white">
            {item.title}
        </h3>
        
        <div className="flex truncate items-center text-sm text-gray-600 dark:text-gray-300">
            <UsersIcon className="h-4 w-4 mr-1" />
            <span>{item.username}</span>
        </div>

        <div className="text-sm max-w-full">
            <TextOnlyDescription 
                className="line-clamp-2 text-ellipsis break-words" 
                html={item.description}
            />
        </div>
        
        <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
            <Rocket className="h-4 w-4 mr-1" />
            <span className="font-medium">
                Getting Started
            </span>
        </div>
    </div>
    </Link>
  )
}

export default Card