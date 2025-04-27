import { Link } from "react-router"
type Props = {}

const CompetitionLeaderboard = (props: Props) => {
  return (
    <div className=''>
      <h2 className="font-semibold text-2xl mb-8">
        Leaderboard
      </h2>
      <table className="w-full text-xs md:text-lg">
        <tr className='border-2 border-b-none px-4 text-zinc-500'>
          <th className='font-semibold text-left p-4'>
            #
          </th>
          <th className='font-semibold text-left p-4 w-1/2'>
            User
          </th>
          <th className='text-center p-4 w-1/2'>
            Score
          </th>
        </tr>
        <tr className='border-l-2 border-r-2 border-b-2'>
          <td className="p-4">
            1
          </td>
          <td className="p-4">
            <Link to={`/profile/1`} className="flex items-center gap-2 md:gap-4 hover:underline">
              
              <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src="/ava.jpg" />
              <h3 className='font-semibold'>
                rasul
              </h3>
            </Link>
          </td>
          <td className="text-center p-4">
            0
          </td>
        </tr>
        
      </table>
    </div>
  )
}

export default CompetitionLeaderboard