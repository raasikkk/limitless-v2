import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  console.log(leaderboard);
  
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
      return ''
    }
  }

  return (
    <div className=''>
      <h2 className="font-semibold text-2xl mb-8">
        {t("competition.leaderboard")}
      </h2>
      <Table className="border-2 rounded-md">
        <TableCaption>A list of leaderboard</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">#</TableHead>
            <TableHead className="">{t("competition.user")}</TableHead>
            <TableHead className="w-1/2 text-center">{t("competition.score")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((user) => (
            <TableRow key={user?.user_id} className={`${userPlace(user?.place)}`}>
              <TableCell className="font-medium">
                {user?.place}
              </TableCell>
              <TableCell>
                <Link to={`/profile/${user.user_id}`} className="flex items-center gap-2 md:gap-4 hover:underline">
                  
                  <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src={user?.avatar} />
                  <h3 className='font-semibold'>
                    {user?.username}
                  </h3>
                </Link>
              </TableCell>
              <TableCell className="text-center">
                {user?.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompetitionLeaderboard 