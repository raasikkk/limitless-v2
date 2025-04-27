import { Link } from "react-router"
import { ArrowBigDown,ArrowBigUp } from "lucide-react"

type Props = {}

const CompetitionSubmissions = (props: Props) => {
  return (
    <div className=''>
      <h2 className="font-semibold text-2xl mb-8">
        Submissions (0)
      </h2>
      <table className="w-full text-xs md:text-base lg:text-lg">
        <tr className='border-2 border-b-none px-4 rounded-b-none text-zinc-500'>
          <th className='font-semibold text-left p-4'>
            User
          </th>
          <th className='font-semibold text-center w-1/3'>
            Submission
          </th>
          <th className='text-right p-4'>
            Submited
          </th>
        </tr>
        <tr className='border-l-2 border-r-2 border-b-2'>
          <td className="p-4">
            <Link to={`/profile/1`} className="flex items-center gap-2 md:gap-4 hover:underline">
              
              <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src="/ava.jpg" />
              <h3 className='font-semibold'>
                rasul
              </h3>
            </Link>
          </td>
          <td className='font-semibold text-center'>
            <Link to={`/submissions/1`} className="text-primaryColor hover:underline">
              Check
            </Link>
          </td>
          <td className="text-right p-4">
            2 hours ago
          </td>
        </tr>
        
      </table>
    </div>
  )
}

export default CompetitionSubmissions