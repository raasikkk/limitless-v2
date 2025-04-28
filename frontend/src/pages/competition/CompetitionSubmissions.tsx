import { useState } from "react";
import { Link } from "react-router"
import SubmitPopUp from "@/components/SubmitPopUp";
import { useTranslation } from "react-i18next";

type Props = {
  isParticipant: boolean
}

const CompetitionSubmissions = ({isParticipant}: Props) => {
  const { t } = useTranslation()
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <div className=''>
      {
        isSubmit
        ?
        <SubmitPopUp setIsSubmit={setIsSubmit}/>
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
            <Link to={`submission/1`} className="text-primaryColor hover:underline">
              {t("competition.check")}
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