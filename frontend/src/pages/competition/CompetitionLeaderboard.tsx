import { ILeaderboard } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

type Props = {
  id: string | undefined
}

const CompetitionLeaderboard = ({id}:Props) => {
  const { t } = useTranslation()
  const [leaderboard, setLeaderboard] = useState<ILeaderboard[]>([])
  
  const getLeaderboard =async () => {
    const data = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}/leaderboard`)).data;
    setLeaderboard(data)
  }

  useEffect(()=> {
    getLeaderboard();
  },[])
  

  const userPlace = (place:string|number) => {
    if (place == 1) {
      return ''
    } else if (place == 2) {
      return ''
    } else if (place == 3) {
      return ''
    } else {
      return 'border'
    }
  }

  return (
    <div className=''>
      <h2 className="font-semibold text-2xl mb-8">
        {t("competition.leaderboard")}
      </h2>
      <table className="w-full border text-xs md:text-base lg:text-lg">
        <thead>
          <tr className='border-2 px-4 text-zinc-500'>
            <th className='font-semibold text-left p-4'>
              #
            </th>
            <th className='font-semibold text-left p-4 w-1/2'>
              {t("competition.user")}
            </th>
            <th className='text-center p-4 w-1/2'>
              {t("competition.score")}
            </th>
          </tr>
        </thead>
        <tbody>
        {
          leaderboard.map(user => {
            return <tr key={user?.user_id} className={`${userPlace(user?.place)} `}>
              <td className="p-4">
                {user?.place}
              </td>
              <td className="p-4">
                <Link to={`/profile/${user.user_id}`} className="flex items-center gap-2 md:gap-4 hover:underline">
                  
                  <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src={user?.avatar} />
                  <h3 className='font-semibold'>
                    {user?.username}
                  </h3>
                </Link>
              </td>
              <td className="text-center p-4">
                {user?.score}
              </td>
            </tr>
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default CompetitionLeaderboard 