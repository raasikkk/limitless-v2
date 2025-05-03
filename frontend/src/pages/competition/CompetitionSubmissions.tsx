import { useEffect, useState } from "react";
import { Link } from "react-router"
import SubmitPopUp from "@/components/SubmitPopUp";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ISubmission } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  isParticipant: boolean,
  competitionId: number | string
}

const CompetitionSubmissions = ({isParticipant, competitionId}: Props) => {
  const { t } = useTranslation()
  const [isSubmit, setIsSubmit] = useState(false);
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);
  const fetchSubmissions = async () => {
    try {

      const submissionsData:ISubmission[] = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/submissions/${competitionId}`)).data;
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
          {t("competition.submissions")} ({submissions?.length})
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

      <Table className="border-2 rounded-md">
        <TableCaption>A list of submissions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">{t("competition.user")}</TableHead>
            <TableHead>{t("competition.submissions")}</TableHead>
            <TableHead className="text-right">{t("competition.submitted")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell className="font-medium">
                <Link to={`/profile/${submission.participant_id}`} className="flex items-center gap-2 md:gap-4 hover:underline">
                  <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src={submission.avatar} />
                  <h3 className='font-semibold truncate'>
                    {submission.username}
                  </h3>
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`submission/${submission.id}`} className="text-primaryColor hover:underline font-bold">
                  {t("competition.check")}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                {submission.submited_date ? formatDistanceToNow(new Date(submission.submited_date), { addSuffix: true }) : ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompetitionSubmissions