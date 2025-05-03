import { Link, useParams } from "react-router"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompetitionMain from "./CompetitionMain";
import CompetitionSubmissions from "./CompetitionSubmissions";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import CompetitionLeaderboard from "./CompetitionLeaderboard";
import EditImage from "@/components/EditImage";
import { useAppSelector } from "@/hooks/hooks";
import axios from "axios";
import { ICompetition, IParticipant } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import CompetitionSettings from "./CompetitionSettings";
import FollowerCard from "@/components/FollowerCard";

const Competition = () => {
  const {t} = useTranslation();
  const { id } = useParams();
  const {user} = useAppSelector((state)=>state.user);
  const [competition, setCompetition] = useState<ICompetition|null>(null)
  const [isCoverEdit, setIsCoverEdit] = useState(false);
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState('');
  const [cover, setCover] = useState<File|null|string>(null);
  const [title, setTitle] = useState('');
  const [isTitleEdit,setIsTitleEdit] = useState(false);
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const fetchCompetition = async () => {
    try {
      const competition:ICompetition = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}`)).data;
      setCompetition(competition);
      setDescription(competition.description);
      setRules(competition.rules);
      setTitle(competition?.title);
      setCover(competition.cover);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeTitle = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}/title`, {title});
      fetchCompetition();
      setIsTitleEdit(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeCover = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (!cover) {
      return alert('No image provided')
    }
    formData.append('cover', cover);
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}/cover`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchCompetition();
      setIsCoverEdit(false);
    } catch (error) {
      console.log(error);
    }
  }
  
  const joinCompetition =async () => {
    try {

      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/join`, {
        competition_id: id,
        user_id: user?.id
      })

      getParticipants()
      
    } catch (error) {
      console.log(error);
    }
  }
  const quitCompetition =async () => {
    try {

      await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/quit/${id}/${user?.id}`)
      getParticipants()
    } catch (error) {
      console.log(error);
    }
  }
  console.log(participants);
  
  const getParticipants = async () => {
    try {
      const participants = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}/participants`)).data;
      setParticipants(participants)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchCompetition(), getParticipants()])
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData();
  }, [id])

  console.log(competition)

  return (
    <div className="mt-5 text-black dark:text-white pt-10">
      {
        isCoverEdit
        ?
        <EditImage handleSave={handleChangeCover} image={cover} setIsEdit={setIsCoverEdit} setImage={setCover}/>
        :
        ''
      }
      <div className="flex items-center flex-wrap justify-between mb-10 gap-3">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
        {isLoading ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : (
            <Link to={`/profile/${competition?.user_id}`}>
              <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src={competition?.avatar} />
            </Link>
          )}
          <span className="text-zinc-600 text-sm">
            {isLoading ? (
              <Skeleton className="h-4 w-[150px]" />
            ) : (
              `Created ${competition?.created_at ? formatDistanceToNow(new Date(competition?.created_at), { addSuffix: true }) : ''}`
            )}
          </span>
        </div>

        {isLoading ? (
          <Skeleton className="h-10 w-24 rounded-lg" />
        ) : (
          competition?.private
            ?
            (
              <button className="text-sm bg-red-700 py-2 px-4 rounded-lg text-white font-semibold">
                {t("createCompetition.form.privacyOptions.private")}
              </button>
            )
            :
            (
              participants.some(mate => mate.user_id == user?.id)
              ?
              <button onClick={()=>quitCompetition()} className="text-sm bg-red-500 py-2 px-4 rounded-lg text-white font-semibold hover:opacity-75">
                {t("competition.quit")}
              </button>
              :
              <button onClick={()=>joinCompetition()} className="text-sm bg-black py-2 px-4 rounded-lg text-white font-semibold hover:opacity-75">
                {t("competition.join")}
              </button>
            )

        )}
        
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-8">
        <div className="w-full pb-0 md:pb-10">
          {isLoading ? (
            <Skeleton className="h-6 w-32 mb-4" />
          ) : (
            <Link to={`/categories/Programming`} className="font-medium text-sm p-1 px-3 rounded-md bg-primaryColor text-white hover:underline">Programming</Link>
          )}

          <div className="flex flex-col-reverse items-start justify-between">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/4 mb-2 self-end" />
              </>
            ) : isTitleEdit ? (
              <label className="w-full">
                <small className="uppercase text-zinc-500 font-semibold text-xs">
                  {t('createCompetition.form.titleLabel')}
                </small>
                <input
                  onChange={(e) =>setTitle(e.target.value)}
                  value={title}
                  type="text"
                  className="w-full text-sm md:text-xl font-bold mb-3 p-4 outline-none border border-zinc-300 bg-white dark:bg-darkSecondary rounded-md"
                />
                <div className="flex items-center justify-end mt-4 gap-2">
                  <button onClick={()=>setIsTitleEdit(false)} className="py-2 px-4 rounded-2 rounded-3xl hover:bg-zinc-200 dark:hover:bg-darkSecondary">
                    {t("cancel")}
                  </button>
                  <button onClick={()=>handleChangeTitle()} className="py-2 px-8 rounded-2 rounded-3xl bg-black text-white hover:opacity-75">
                    {t("save_changes")}
                  </button>
                </div>
              </label>
            ) : (
              <>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold ">{competition?.title}</h1>
                {
                  competition?.user_id == user?.id
                  ?
                  <Pencil onClick={()=>setIsTitleEdit(true)} size={20} className="mb-2 hover:opacity-50 self-end"/>
                  :
                  ''
                }
              </>
            )}
          </div>
        </div>

        <div className="w-full sm:w-fit relative grid place-items-center">
          {isLoading ? (
            <Skeleton className="min-w-72 max-w-72 h-40 rounded-lg mb-4" />
          ) : (
            <>
              {
                competition?.user_id == user?.id
                ?
                <Pencil onClick={()=>setIsCoverEdit(true)} size={20} className="absolute -right-2 -top-6 hover:opacity-50 self-end"/>
                :
                ''
              }
              <img className=" min-w-72 max-w-72 object-contain h-40 rounded-lg bg-gray-600 mb-4" src={typeof competition?.cover === 'string' ? competition.cover : undefined} alt="Competiton cover"/>
            </>
          )}

        </div>
      </div>
      <Tabs defaultValue="main">
        <TabsList className="rounded-none bg-transparent justify-start overflow-x-scroll overflow-y-hidden border-b w-full mb-5">
          <TabsTrigger value="main" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            {t("competition.main")}
          </TabsTrigger>
          <TabsTrigger value="submissions" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            {t("competition.submissions")}
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            {t("competition.leaderboard")}
          </TabsTrigger>
          <TabsTrigger value="participants" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            {t("competition.participants")}
          </TabsTrigger>

          {competition?.user_id == user?.id && (
            <TabsTrigger value="settings" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
              {t("settings")}
            </TabsTrigger>
          )}
          
        </TabsList>
        <TabsContent className="flex flex-wrap-reverse md:flex-nowrap gap-4" value="main">
          {isLoading ? (
            <div className="w-full md:w-3/4 space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            <CompetitionMain
              fetchCompetition={fetchCompetition} 
              id={id!}
              rules={rules} setRules={setRules}
              description={description} setDescription={setDescription} 
              canEdit={competition?.user_id == user?.id}
            />
          )}
          

          <ul className="w-full md:w-1/4 flex flex-col gap-4">
            <li className="flex items-center gap-4 justify-between">
              {isLoading ? (
                <>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-full" />
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold">
                      {t("competition.host")}
                    </h3>
                    <p className="text-sm">
                      {competition?.username}
                    </p>
                  </div>
                  <Link to={`/profile/${competition?.user_id}`}>
                    <img className="w-12 h-12 p-1 border-2 border-zinc-500 rounded-full" src={competition?.avatar} />
                  </Link>
                </>
              )}
            </li>

            <li>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ) : (
                <>
                  <h3 className="font-semibold mb-1">
                    {t("competition.participation")}
                  </h3>
                  <div className="text-sm">
                    <p>{t("competition.participants")} {participants.length}</p>
                    {/* <p>{t("competition.submissions")} 0</p> */}
                  </div>
                </>
              )}
            </li>
          </ul>
        </TabsContent>
        <TabsContent value="submissions">
          <CompetitionSubmissions competitionId={id!} isParticipant={participants.some(mate => mate.user_id == user?.id) || user?.id == competition?.user_id}/>
        </TabsContent>
        <TabsContent value="leaderboard">
          <CompetitionLeaderboard id={id}/>
        </TabsContent>
        <TabsContent value="participants">
        <div className="bg-white dark:bg-darkSecondary rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                    Participants ({participants.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {participants.map((item) => (
                        <FollowerCard 
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </TabsContent>
        <TabsContent value="settings">
          <CompetitionSettings id={id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Competition