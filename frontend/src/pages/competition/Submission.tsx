import { Link, useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { EllipsisVertical, ChevronUp, ChevronDown } from "lucide-react";
import Editor from "@/components/editor/Editor";
import { useEffect, useState } from "react";
import Vote from "@/components/Vote";
import axios from "axios";
import { ISubmission, IVote } from "@/types";
import { useAppSelector } from "@/hooks/hooks";

const Submission = () => {
  const {t} = useTranslation();
  const {user} = useAppSelector((state)=>state.user);
  const {submissionId, id} = useParams();
  const [submission, setSubmission] = useState<ISubmission|null>(null)
  const [explanation, setExplanation] = useState<string>(submission?.explanation||'');
  const [isExplanationEdit, setIsExplanationEdit] = useState(false);
  const [voteType, setVoteType] = useState<null|boolean>(null);
  const [votes,setVotes] = useState<IVote[]|null>(null);

  const getSubmission = async () => {
    try {
      
      const submission:ISubmission = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/submissions/user/${submissionId}`)).data;
      setSubmission(submission)
      
    } catch (error) {
      console.log(error);
    }
  }
  const getVotes =  async () => {
    try {
      const votes = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/submissions/${submissionId}/votes`)).data;
      setVotes(votes)
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancelVote =async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/submissions/${submissionId}/${user?.id}`);
      getVotes()
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(()=>{ 
    getSubmission()
    getVotes();
  }, [submissionId])
  

  return (
    <div className="mt-5 text-black dark:text-white pt-10">
      <div className="flex items-center flex-wrap justify-between mb-10 gap-3">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <Link to={`/profile/${submission?.participant_id}`}>
            <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src={submission?.avatar} />
          </Link>
          <span className="text-zinc-600 text-sm ">Submitted 8 month ago</span>
        </div>
        <EllipsisVertical className="xs:hidden"/>
        {
        submission?.participant_id == user?.id 
        ?
        ''
        :
        <div className="flex items-center justify-between w-full md:w-fit gap-10">
          {
            votes?.some(vote => vote.user_id == user?.id)
            ?
            <button onClick={()=>handleCancelVote()} className="py-2 px-6 bg-red-500 text-white rounded-3xl font-medium hover:opacity-75">
              Cancel my vote
            </button>
            :
            <div className="flex items-center gap-2 relative">
              {
                voteType !== null
                ?
                <Vote getVotes={getVotes} competitionId={id} submissionId={submissionId} voteType={voteType} setVoteType={setVoteType}/>
                :
                ''
              }
              <button onClick={()=>setVoteType(true)} className="p-2 px-4 bg-primaryColor rounded-3xl text-white font-medium flex justify-center items-center gap-2">
                <ChevronUp/> {t("competition.upvote")}
              </button>
              <button onClick={()=>setVoteType(false)} className="p-2 px-4 border border-zinc-500 rounded-3xl font-medium flex justify-center items-center gap-2">
                <ChevronDown/> {t("competition.downvote")}
              </button>
            </div>
          }
          
          <EllipsisVertical className="hidden xs:block"/>
        </div>
        }
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10">
        {submission?.username}
      </h1>
      <Tabs defaultValue="main">
        <TabsList className="rounded-none bg-transparent justify-start overflow-x-scroll overflow-y-hidden border-b w-full mb-10">
          <TabsTrigger value="main" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            {t("competition.explanation")}
          </TabsTrigger>
          <TabsTrigger value="votes" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            {t("competition.votes")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="main">
          {
            submission?.image
            ?
            <img src={submission?.image} className="w-1/2 h-1/2 mx-auto" alt="Explanation image" />
            :
            ''
          }
        {
          isExplanationEdit
          ?
          <>
            <Editor content={explanation} onChange={setExplanation}/>
              <div className="flex items-center justify-end mt-4 gap-2">
                <button onClick={()=>setIsExplanationEdit(false)} className="py-2 px-4 rounded-2 rounded-3xl hover:bg-zinc-200 dark:hover:bg-darkSecondary">
                  {t("cancel")}
                </button>
                <button className="py-2 px-8 rounded-2 rounded-3xl bg-black text-white hover:opacity-75">
                  {t("save_changes")}
                </button>
              </div>
            </>
            :
            <div className="min-h-[156px] rounded-md bg-slate-50 dark:bg-darkSecondary py-2 px-3 outline-none space-y-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-medium [&_p]:text-base [&_a]:text-blue-500 [&_p]:text-base [&_a]:underline" dangerouslySetInnerHTML={{__html: submission?.explanation || ''}}>
              {/* Rich text editor */}
            </div>
          }
        </TabsContent>
        <TabsContent value="votes" className="bg-white dark:bg-darkColor rounded-xl">
          <h2 className="font-semibold text-2xl mb-6 text-gray-800 dark:text-gray-200">
            {t("competition.votes")}
          </h2>
          <ul className="flex flex-col gap-6">
            {
              votes?.map(vote => {
                return <li key={vote?.id} className="bg-gray-50 dark:bg-darkSecondary p-4 rounded-lg transition-all hover:shadow-md dark:hover:bg-primaryColor/10">
                  <Link 
                    to={`/profile/${vote?.user_id}`} 
                    className="flex items-center gap-3 mb-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-primaryColor/5 transition-colors"
                  >
                    <div className="relative">
                      <img 
                        className="w-12 h-12 p-1 border-2 border-500 rounded-full dark:border-green-400/80" 
                        src={vote?.avatar} 
                        alt="User avatar"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className='font-semibold text-gray-800 dark:text-gray-100'>
                        {vote?.username}
                      </h3>
                    </div>
                    {
                      vote?.vote_type
                      ?
                      <p className="text-green-500 dark:text-green-400 flex items-center font-medium gap-1">
                        {t("competition.upvoted")} <ChevronUp className="w-5 h-5" />
                      </p>
                      :
                      <p className="text-red-500 dark:text-red-400 flex items-center font-medium gap-1">
                        {t("competition.downvoted")} <ChevronDown className="w-5 h-5" />
                      </p>
                    }
                  </Link>
                  <p className="text-gray-600 dark:text-gray-300 pl-2 leading-relaxed">
                    {vote?.comment}
                  </p>
                </li>
              })
            }
            
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Submission