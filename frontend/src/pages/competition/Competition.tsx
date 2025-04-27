import { Link } from "react-router"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompetitionMain from "./CompetitionMain";
import CompetitionSubmissions from "./CompetitionSubmissions";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import CompetitionLeaderboard from "./CompetitionLeaderboard";
import EditImage from "@/components/EditImage";

const Competition = () => {
  const {t} = useTranslation();
  const [isParticipant, setIsParticipant] = useState(false);
  const [isCoverEdit, setIsCoverEdit] = useState(false);
  const [cover, setCover] = useState<File|null|string>(null);
  const [canEdit, setCanEdit] = useState(true);
  const [title, setTitle] = useState('Competition title about winning some type shit about thist');
  const [isTitleEdit,setIsTitleEdit] = useState(false);

  return (
    <div className="mt-5 text-black dark:text-white pt-10">
      {
        isCoverEdit
        ?
        <EditImage image={cover} setIsEdit={setIsCoverEdit} setImage={setCover}/>
        :
        ''
      }
      <div className="flex items-center flex-wrap justify-between mb-10 gap-3">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <Link to={`/profile/1`}>
            <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src="/ava.jpg" />
          </Link>
          <span className="text-zinc-600 text-sm ">Created 8 month ago</span>
        </div>
        {
          isParticipant
          ?
          <button className="text-sm bg-red-500 py-2 px-4 rounded-lg text-white font-semibold hover:opacity-75">
            Quit Competiton
          </button>
          :
          <button className="text-sm bg-black py-2 px-4 rounded-lg text-white font-semibold hover:opacity-75">
            Join Competiton
          </button>
        }
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-8">
        <div className="w-full pb-0 md:pb-10">
          <Link to={`/categories/Programming`} className="font-medium text-sm p-1 px-3 rounded-md bg-primaryColor text-white hover:underline">Programming</Link>
          <div className="flex flex-col-reverse items-end md:items-start justify-between">
            {
              isTitleEdit
              ?
              <label className="w-full">
                <small className="uppercase text-zinc-500 font-semibold text-xs">
                  {t('createCompetition.form.titleLabel')}
                </small>
                <input
                  onChange={(e) =>setTitle(e.target.value)}
                  value={title}
                  type="text"
                  className="w-full text-sm md:text-xl font-bold mb-3 p-4 outline-none border border-zinc-300 bg-white dark:bg-[#1E293B] rounded-md"
                />
                <div className="flex items-center justify-end mt-4 gap-2">
                  <button onClick={()=>setIsTitleEdit(false)} className="py-2 px-4 rounded-2 rounded-3xl hover:bg-zinc-200 dark:hover:bg-[#1E293B]">
                    Cancel
                  </button>
                  <button className="py-2 px-8 rounded-2 rounded-3xl bg-black text-white hover:opacity-75">
                    Save
                  </button>
                </div>
              </label>
              :
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">{title}</h1>
            }
            {
              canEdit
              ?
              <Pencil onClick={()=>setIsTitleEdit(true)} size={20} className="mb-2 hover:opacity-50 self-end"/>
              :
              ''
            }
          </div>
        </div>
        <div className="relative">
          {
            canEdit
            ?
            <Pencil onClick={()=>setIsCoverEdit(true)} size={20} className="absolute -right-2 -top-6 hover:opacity-50 self-end"/>
            :
            ''
          }
          <img className="mx-auto min-w-72 max-w-72 object-contain h-40 rounded-lg bg-gray-600 mb-4" src={typeof cover === 'string' ? cover : undefined} alt="Competiton cover"/>
        </div>
      </div>
      <Tabs defaultValue="main">
        <TabsList className="rounded-none bg-transparent justify-start overflow-x-scroll overflow-y-hidden border-b w-full mb-10">
          <TabsTrigger value="main" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            Main
          </TabsTrigger>
          <TabsTrigger value="submissions" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            Submissions
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            Leaderboard
          </TabsTrigger>
        </TabsList>
        <TabsContent className="flex flex-wrap-reverse md:flex-nowrap gap-4" value="main">
          <CompetitionMain canEdit={canEdit}/>
          <ul className="w-full md:w-1/4 flex flex-col gap-4">
            <li className="flex items-center gap-4 justify-between">
              <div>
                <h3 className="font-semibold">
                  Competition host
                </h3>
                <p className="text-sm">
                  rasul
                </p>
              </div>
              <Link to={`/profile/1`}>
                <img className="w-12 h-12 p-1 border-2 border-zinc-500 rounded-full" src="/ava.jpg" />
              </Link>
            </li>
            <li>
              <h3 className="font-semibold mb-1">
                Participation
              </h3>
              <div className="text-sm">
                <p>Participants 0</p>
                <p>Submissions 0</p>
              </div>
            </li>
          </ul>
        </TabsContent>
        <TabsContent value="submissions">
          <CompetitionSubmissions isParticipant={isParticipant}/>
        </TabsContent>
        <TabsContent value="leaderboard">
          <CompetitionLeaderboard/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Competition