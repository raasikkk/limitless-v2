import { IFollower } from "@/types"
import { Link, useLocation } from "react-router-dom"

interface FollowerProp {
    item: IFollower,
    competition_id?: number | string | undefined,
    user_id?: number| string | undefined
}

const FollowerCard = ({ item, competition_id, user_id }: FollowerProp) => {
  
  const kickUser = () => {
    alert('salam')
  }

  const location = useLocation()

  return (
      <div
        key={item.id}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors min-w-0 border"
        >
        <Link
          to={`/profile/${item.id}`} 
          className="flex items-center gap-3 rounded-lg hover:bg-accent transition-colors min-w-0"
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

        {!location.pathname.startsWith("/profile") && competition_id == user_id && (
          <div onClick={kickUser} className="p-0.5 px-2 bg-red-500 rounded-md cursor-pointer text-white dark:text-white hover:bg-red-600">
            Kick
          </div>
        )}
      </div>
  )
}

export default FollowerCard