import { useState } from "react";
import { Pencil } from "lucide-react";
import Editor from "@/components/editor/Editor";
import { useTranslation } from "react-i18next";

type Props = {
  canEdit: boolean
}

const CompetitionMain = ({canEdit}: Props) => {
  const { t } = useTranslation()
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);
  const [description, setDescription] = useState('<h2>Day 2</h2><p>Lorem, <a href="sd">ipsum dolor sit amet</a> consectetur adipisicing elit. Aliquid optio ullam aperiam, porro quia consequatur sit obcaecati. Consequuntur voluptatibus labore consequatur, accusamus inventore corrupti quod omnis, optio, qui repellat exercitationem.</p>');
  const [isRulesEdit, setIsRulesEdit] = useState(false);
  const [rules, setRules] = useState('<h2>Day 2</h2><p>Lorem, ur adipisicing elitconsequatur sit obcaecati. Consequuntur voluptatibus labore consequatur, accusamus inventore corrupti quod omnis, optio, qui repellat exercitationem.</p>');


  return (
    <div className="w-full md:w-3/4 pr-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-2xl">
          {t("competition.description")}
        </h2>
        {
          canEdit
          ?
          <Pencil onClick={()=>setIsDescriptionEdit(true)} size={20} className="hover:opacity-50"/>
          :
          ''
        }
      </div>
      
      {
        isDescriptionEdit
        ?
        <>
          <Editor content={description} onChange={setDescription}/>
          <div className="flex items-center justify-end mt-4 gap-2">
            <button onClick={()=>setIsDescriptionEdit(false)} className="py-2 px-4 rounded-2 rounded-3xl hover:bg-zinc-200 dark:hover:bg-darkSecondary">
              {t("cancel")}
            </button>
            <button className="py-2 px-8 rounded-2 rounded-3xl bg-black text-white hover:opacity-75">
              {t("save_changes")}
            </button>
          </div>
        </>
        :
        <div className="border-b-2 min-h-[156px] rounded-md bg-slate-50 dark:bg-darkSecondary py-2 px-3 outline-none space-y-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-medium [&_p]:text-base [&_a]:text-blue-500 [&_p]:text-base [&_a]:underline" dangerouslySetInnerHTML={{__html: description}}>
          {/* Rich text editor */}
        </div>
      }

      <div className="flex items-center justify-between mb-4 mt-10">
        <h2 className="font-semibold text-2xl">
          {t("competition.rules")}
        </h2>
        {
          canEdit
          ?
          <Pencil onClick={()=>setIsRulesEdit(true)} size={20} className="hover:opacity-50"/>
          :
          ''
        }
      </div>

      {
        isRulesEdit
        ?
        <>
          <Editor content={rules} onChange={setRules}/>
          <div className="flex items-center justify-end mt-4 gap-2">
            <button onClick={()=>setIsRulesEdit(false)} className="py-2 px-4 rounded-2 rounded-3xl hover:bg-zinc-200 dark:hover:bg-darkSecondary">
              {t("cancel")}
            </button>
            <button className="py-2 px-8 rounded-2 rounded-3xl bg-black text-white hover:opacity-75">
              {t("save_changes")}
            </button>
          </div>
        </>
        :
        <div className="min-h-[156px] rounded-md bg-slate-50 dark:bg-darkSecondary py-2 px-3 outline-none space-y-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-medium [&_p]:text-base [&_a]:text-blue-500 [&_p]:text-base [&_a]:underline" dangerouslySetInnerHTML={{__html: rules}}>
          {/* Rich text editor */}
        </div>
      }

    </div>
  )
}

export default CompetitionMain