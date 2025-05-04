import { useState } from "react";
import { Bot, Loader2, Pencil } from "lucide-react";
import Editor from "@/components/editor/Editor";
import { useTranslation } from "react-i18next";
import axios from "axios";

type Props = {
  canEdit: boolean,
  description: string,
  setDescription: (value: string) => void,
  rules: string,
  setRules: (value: string) => void,
  id: string | number,
  fetchCompetition: () => void,
  isAiBased: boolean | undefined
}

const CompetitionMain = ({canEdit, description, setDescription, rules, setRules, id, fetchCompetition, isAiBased}: Props) => {
  const { t } = useTranslation()
  const [isDescriptionEdit, setIsDescriptionEdit] = useState(false);
  const [isRulesEdit, setIsRulesEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeDescription = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}/description`, {description});
      fetchCompetition()
      setIsDescriptionEdit(false)
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeRules = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}/rules`, {rules});
      fetchCompetition()
      setIsRulesEdit(false)
    } catch (error) {
      console.log(error);
    }
  }

  const handleAIChange = async () => {
    setIsLoading(true)
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/llm/suggestions/${id}`);
      fetchCompetition();
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full md:w-3/4 pr-4">
      {canEdit && isAiBased ? (
        <div className="flex flex-col items-end mb-5">
          <button
            onClick={handleAIChange}
            className="p-2 px-4 w-56 truncate font-semibold text-white flex items-center gap-1.5 border rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-zinc-300 dark:hover:bg-darkSecondary"
          >
            {isLoading ? (
              <Loader2 className="mx-auto animate-spin"/>
            ) : (
              <><Bot /> Enhance with AI</>
            )}
          </button>
        </div>
      ) : (
        ""
      )}

      <div className=" flex items-center justify-between mb-4">
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
            <button onClick={()=>handleChangeDescription()} className="py-2 px-8 rounded-2 rounded-3xl bg-black text-white hover:opacity-75">
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
            <button onClick={()=>handleChangeRules()} className="py-2 px-8 rounded-2 rounded-3xl bg-black text-white hover:opacity-75">
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