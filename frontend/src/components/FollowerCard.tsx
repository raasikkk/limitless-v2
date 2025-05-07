import { IFollower } from "@/types"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"

interface FollowerProp {
    item: IFollower,
    competition_id?: number | string | undefined,
    user_id?: number| string | undefined,
    creatorId?: number| string | undefined,
    targetUserId?: number| string | undefined
}

const FollowerCard = ({ item, competition_id, user_id, creatorId, targetUserId }: FollowerProp) => {
  
  const kickUser = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${competition_id}/kick/${targetUserId}`);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  const location = useLocation()

  return (
      <div
        key={item.id}
        className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-accent transition-colors min-w-0 border"
        >
        <Link
          to={!location.pathname.startsWith("/profile") && !location.pathname.startsWith("/search") ? `/profile/${targetUserId}` : `/profile/${item.id}`} 
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

        {!location.pathname.startsWith("/profile") && !location.pathname.startsWith("/search") && creatorId == user_id && (
          <div onClick={kickUser} className="p-0.5 px-2 bg-red-500 rounded-md cursor-pointer text-white dark:text-white hover:bg-red-600">
            Kick
          </div>
        )}
      </div>
  )
}

export default FollowerCard