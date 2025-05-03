import { IFollower } from "@/types"
import { Link } from "react-router-dom"

interface FollowerProp {
    item: IFollower
}

const FollowerCard = ({ item }: FollowerProp) => {
  return (
    <Link
        to={`/profile/${item.id}`} 
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
  )
}

export default FollowerCard