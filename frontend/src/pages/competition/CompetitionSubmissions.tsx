import { useEffect, useState } from "react";
import { Link } from "react-router"
import SubmitPopUp from "@/components/SubmitPopUp";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ISubmissions } from "@/types";
import { formatDistanceToNow } from "date-fns";

type Props = {
  isParticipant: boolean,
  competitionId: number | string
}

const CompetitionSubmissions = ({isParticipant, competitionId}: Props) => {
  const { t } = useTranslation()
  const [isSubmit, setIsSubmit] = useState(false);
  const [submissions, setSubmissions] = useState<ISubmissions[]>([]);

  const fetchSubmissions = async () => {
    try {

      const submissionsData:ISubmissions[] = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/submissions/${competitionId}`)).data;
      setSubmissions(submissionsData)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    fetchSubmissions()
  },[competitionId])

  return (
    <div className=''>
      {
        isSubmit
        ?
        <SubmitPopUp competitionId={competitionId} setIsSubmit={setIsSubmit}/>
        :
        ''
      }
      
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-semibold text-2xl">
          {t("competition.submissions")} (0)
        </h2>
        {
          isParticipant
          ?
          <button onClick={()=>setIsSubmit(true)} className="p-2 rounded-lg py-2 px-6 bg-primaryColor text-white font-semibold hover:opacity-75">
            {t("competition.submit")}
          </button>
          :
          ''
        }
      </div>
      <table className="w-full text-xs md:text-base lg:text-lg">
        <tr className='border-2 border-b-none px-4 rounded-b-none text-zinc-500'>
          <th className='font-semibold text-left p-4'>
            {t("competition.user")}
          </th>
          <th className='font-semibold text-center w-1/3'>
            {t("competition.submissions")}
          </th>
          <th className='text-right p-4'>
            {t("competition.submitted")}
          </th>
        </tr>
        {
          submissions.map(submission => {
            return <tr className='border-l-2 border-r-2 border-b-2'>
                    <td className="p-4">
                      <Link to={`/profile/${submission.user_id}`} className="flex items-center gap-2 md:gap-4 hover:underline">
                        
                        <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src={submission.avatar} />
                        <h3 className='font-semibold'>
                          {submission.username}
                        </h3>
                      </Link>
                    </td>
                    <td className='font-semibold text-center'>
                      <Link to={`submission/${submission.id}`} className="text-primaryColor hover:underline">
                        {t("competition.check")}
                      </Link>
                    </td>
                    <td className="text-right p-4">
                      {submission.submited_date ? formatDistanceToNow(new Date(submission.submited_date), { addSuffix: true }) : ''}
                    </td>
                  </tr>
          })
        }

      </table>
    </div>
  )
}

export default CompetitionSubmissions