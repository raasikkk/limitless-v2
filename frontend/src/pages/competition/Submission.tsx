import { Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { EllipsisVertical, ChevronUp, ChevronDown } from "lucide-react";
import Editor from "@/components/editor/Editor";
import { useState } from "react";
import Vote from "@/components/Vote";

const Submission = () => {
  const {t} = useTranslation();
  const [explanation, setExplanation] = useState('<h2>Day 2</h2><p>Lorem, <a href="sd">ipsum dolor sit amet</a> consectetur adipisicing elit. Aliquid optio ullam aperiam, porro quia consequatur sit obcaecati. Consequuntur voluptatibus labore consequatur, accusamus inventore corrupti quod omnis, optio, qui repellat exercitationem.</p>');
  const [isExplanationEdit, setIsExplanationEdit] = useState(false);
  const [link, setLink] = useState('');
  const [voteType, setVoteType] = useState<null|boolean>(null);

  return (
    <div className="mt-5 text-black dark:text-white pt-10">
      <div className="flex items-center flex-wrap justify-between mb-10 gap-3">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <Link to={`/profile/1`}>
            <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src="/ava.jpg" />
          </Link>
          <span className="text-zinc-600 text-sm ">Submited 8 month ago</span>
        </div>
        <EllipsisVertical className="xs:hidden"/>
        <div className="flex items-center justify-between w-full md:w-fit gap-10">
          <div className="flex items-center gap-1 relative">
            {
              voteType !== null
              ?
              <Vote voteType={voteType} setVoteType={setVoteType}/>
              :
              ''
            }
            <button onClick={()=>setVoteType(true)} className="py-1 pl-2 pr-6 bg-primaryColor rounded-3xl text-white font-medium flex items-center gap-2">
              <ChevronUp/> Upvote
            </button>
            <button onClick={()=>setVoteType(false)} className="py-1 pl-2 pr-6 border border-zinc-500 rounded-3xl font-medium flex items-center gap-2">
              <ChevronDown/> Downvote
            </button>
          </div>
          <EllipsisVertical className="hidden xs:block"/>
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10">
        Username
      </h1>
      <Tabs defaultValue="main">
        <TabsList className="rounded-none bg-transparent justify-start overflow-x-scroll overflow-y-hidden border-b w-full mb-10">
          <TabsTrigger value="main" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            Explanation
          </TabsTrigger>
          <TabsTrigger value="comments" className="text-md flex items-center shadow-none rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold">
            Comments (0)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="main">
          {
            link
            ?
            <img src="" className="w-1/2 h-1/2 mx-auto" alt="Explanation image" />
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
            <div className="min-h-[156px] rounded-md bg-slate-50 dark:bg-darkSecondary py-2 px-3 outline-none space-y-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-medium [&_p]:text-base [&_a]:text-blue-500 [&_p]:text-base [&_a]:underline" dangerouslySetInnerHTML={{__html: explanation}}>
              {/* Rich text editor */}
            </div>
          }
        </TabsContent>
        <TabsContent value="comments">
          <h2 className="font-semibold text-2xl mb-10">
            Comments
          </h2>
          <ul className="px-4 flex flex-col gap-4">
            <li>
              <Link to={`/profile/1`} className="flex items-center gap-2 md:gap-4 hover:underline mb-4">
                
                <img className="w-12 h-12 p-1 border-2 border-green-500 rounded-full" src="/ava.jpg" />
                <h3 className='font-semibold'>
                  rasul
                </h3>
                <p className="text-green-500 flex items-center font-bold">Upvoted <ChevronUp/></p>
              </Link>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet corporis debitis ab cum, nesciunt doloremque molestiae tempora natus. Odio nihil sint qui, in hic alias natus harum nobis facere at.
              </p>
            </li>
            <li>
              <Link to={`/profile/1`} className="flex items-center gap-2 md:gap-4 hover:underline mb-4">
                
                <img className="w-12 h-12 p-1 border-2 border-red-500 rounded-full" src="/ava.jpg" />
                <h3 className='font-semibold'>
                  rasul
                </h3>
                <p className="text-red-500 flex items-center font-bold">Downvoted <ChevronDown/></p>
              </Link>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet corporis debitis ab cum, nesciunt doloremque molestiae tempora natus. Odio nihil sint qui, in hic alias natus harum nobis facere at.
              </p>
            </li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Submission