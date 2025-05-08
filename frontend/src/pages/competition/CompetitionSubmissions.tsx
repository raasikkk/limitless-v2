import { useEffect, useState } from "react";
import { Link } from "react-router"
import SubmitPopUp from "@/components/SubmitPopUp";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ISubmission } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bot, Loader2 } from "lucide-react";
import { useAppSelector } from "@/hooks/hooks";

type Props = {
  isParticipant: boolean,
  competitionId: number | string,
  canEdit: boolean,
  isAiBased: boolean | undefined,
  startDate: Date,
  endDate: Date
}

const CompetitionSubmissions = ({isParticipant, competitionId, canEdit, isAiBased, startDate}: Props) => {
  const { t } = useTranslation();
  const {user} = useAppSelector((state)=>state.user);
  const [isSubmit, setIsSubmit] = useState(false);
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const fetchSubmissions = async () => {
    setIsLoading(true)
    try {
      const submissionsData:ISubmission[] = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/submissions/${competitionId}`)).data;
      setSubmissions(submissionsData)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleGradeWithAi = async () => {
    setIsLoading(true)
    try {

      await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/llm/grading/${competitionId}`);
      fetchSubmissions();

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
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
      
      <div className="mb-8 flex flex-wrap items-center justify-between">
      
        <h2 className="font-semibold text-2xl">
          {t("competition.submissions")} ({submissions?.length})
        </h2>

        <div className="flex items-center flex-wrap gap-2">
          {canEdit && isAiBased ? (
          <div className="flex flex-col items-end">
            <button
              onClick={handleGradeWithAi}
              className="p-2 px-4 w-56 truncate font-semibold text-white flex justify-center items-center gap-1.5 border rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-zinc-300 dark:hover:bg-darkSecondary"
            >
              {isLoading ? (
                <Loader2 className="mx-auto animate-spin"/>
              ) : (
                <><Bot /> Grade using AI</>
              )}
            </button>
          </div>
        ) : (
          ""
        )}

          {
            
            isParticipant && (
              (submissions.some(item => item.participant_id == user?.id) || new Date() < new Date(startDate)
                ? null
                : (
                  <button
                    onClick={() => setIsSubmit(true)}
                    className="p-2 rounded-lg py-2 px-6 bg-primaryColor text-white font-semibold hover:opacity-75"
                  >
                    {t("competition.submit")}
                  </button>
                )
              )
            )
          }
          </div>
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