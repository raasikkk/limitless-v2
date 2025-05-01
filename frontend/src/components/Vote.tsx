import { useAppSelector } from "@/hooks/hooks";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";


type Props = {
  voteType: boolean | null,
  setVoteType: (value: null|boolean) => void;
  competitionId: string | void;
  submissionId: string | void;
  getVotes: () => void;
}

const Vote = ({voteType, setVoteType, submissionId, competitionId, getVotes}: Props) => {
  const { t } = useTranslation()
  const {user} = useAppSelector((state)=>state.user);
  const [comment, setComment] = useState('');

  const handleCommentChange = (e: string) => {
    if (comment.length <= 50) {
      setComment(e);
    } 
  }

  const handleVote = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/submissions/vote`, {
        userId: user?.id,
        submissionId,
        competitionId,
        comment,
        voteType
      })
      getVotes();
      setVoteType(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="absolute right-0 md:right-0 top-0 md:w-96 bg-white dark:bg-darkColor border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 flex flex-col gap-2 shadow-lg dark:shadow-zinc-800/50">
      <div>
        <small className="uppercase text-zinc-500 dark:text-zinc-400 font-semibold text-xs tracking-wide">
          {t("competition.comment_optional")}
        </small>
        <div className={`text-sm ${comment.length > 45 ? 'text-red-500' : 'text-zinc-600 dark:text-zinc-300'}`}>
          <span>{comment.length}</span>/50
        </div>
      </div>
      <textarea 
        maxLength={50} 
        onChange={(e) => handleCommentChange(e.target.value)} 
        className="p-3 text-sm rounded-lg resize-none outline-none min-w-40 min-h-24 border border-zinc-400 dark:border-zinc-600 focus:border-blue-500 dark:focus:border-blue-400 bg-transparent dark:bg-darkSecondary dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 transition-colors" 
        placeholder={t("competition.share_thoughts")}
      />
      <div className="flex items-center gap-3 justify-end mt-2">
        <button 
          onClick={() => setVoteType(null)}
          className="rounded-lg py-1.5 px-5 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
        >
          {t("cancel")}
        </button>
        {voteType ? (
          <button 
            onClick={()=>handleVote()}
            className="rounded-lg py-1.5 px-5 text-sm font-medium bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-green-500/30 transition-all"
          >
            {t("competition.upvote")}
          </button>
        ) : (
          <button 
            onClick={()=>handleVote()}
            className="rounded-lg py-1.5 px-5 text-sm font-medium bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-red-500/30 transition-all"
          >
            {t("competition.downvote")}
          </button>
        )}
      </div>
    </div>
  )
}

export default Vote