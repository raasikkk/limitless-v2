import { useEffect, useState } from "react";
import Editor from "../components/editor/Editor";
import { useTranslation } from "react-i18next";
import { ICategory } from "@/types";
import axios from "axios";
import { useAppSelector } from "@/hooks/hooks";
import { useNavigate } from "react-router";
import { LoaderCircle } from "lucide-react";

const CreatePage = () => {
  const {t} = useTranslation();
  const {isLogged} = useAppSelector((state)=>state.user);
  const [title, setTitle] = useState('Competition Title');
  const [description, setDescription] = useState("Describe the competition you're organizing. Include details like the theme or topic, who can participate, the format (online or offline), key dates, judging criteria, and any prizes. Be as detailed as possible to help participants understand what to expect.")
  const [isPrivate, setIsPrivate] = useState(false);
  const [category, setCategory] = useState<number|string>(0);
  const [categories, setCategories] = useState<null|ICategory[]>(null)
  const [create, setCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/auth/signin")
    }
  }, [])

  const today = new Date();

  const oneDayAhead = new Date(today);
  oneDayAhead.setDate(today.getDate() + 1);
  const oneWeekAhead = new Date(today);
  oneWeekAhead.setDate(today.getDate() + 7);
  
  const getCategories = async () => {
    try {
      const categories = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/categories`)).data;
      setCategories(categories);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getCategories();
  },[])
  
  const handleCreate = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const competition = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions`, {
        title, 
        description, 
        category, 
        isPrivate, 
        startDate: oneDayAhead, 
        endDate: oneWeekAhead
      })
      return navigate(`/competitions/${competition.data.id}`)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleCreate} className="pt-10">
      {create ? (
        <div className="bg-black bg-opacity-15 fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-darkSecondary px-5 py-10 rounded-md w-80 sm:w-96">
            <h2 className="font-bold text-2xl text-center mb-2">
              {t('createCompetition.modal.title')}
            </h2>
            <p className="mb-4 text-center">
              {isPrivate
                ? 
                t('createCompetition.modal.descriptionNotVisible')
                :
                t('createCompetition.modal.descriptionVisible')
              }
            </p>
            <div className="flex items-center justify-center gap-4">
            <button
                type="submit"
                disabled={isLoading}
                className="bg-primaryColor font-semibold text-white rounded-md w-40 p-2 hover:opacity-75 disabled:opacity-75 flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  t("createCompetition.modal.yes")
                )}
              </button>
              <button
                onClick={() => setCreate(false)}
                type="button"
                className="w-24 border border-zinc-300 font-semibold rounded-md p-2 hover:opacity-75"
              >
                {t('createCompetition.modal.no')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      <h1 className="font-bold text-3xl">{t('createCompetition.pageTitle')}</h1>

      <label className="relative block mt-10">
        <small className="uppercase text-zinc-500 font-semibold text-xs">
          {t('createCompetition.form.titleLabel')}
        </small>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="w-full text-lg font-medium py-4 px-6 outline-none border border-zinc-300 bg-white dark:bg-darkColor rounded-md"
        />
      </label>

      <label>
        <small className="uppercase text-zinc-500 font-semibold text-xs">
          {t('createCompetition.form.descriptionLabel')}
        </small>
        <Editor content={description} onChange={setDescription} />
      </label>

      <div className="flex flex-wrap gap-4 items-end justify-between mt-10">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <small className="uppercase text-zinc-500 font-semibold text-xs">
              {t('createCompetition.form.privacyLabel')}
            </small>
            <div className="flex items-center rounded-md border border-zinc-300 w-fit overflow-hidden">
              <button
                onClick={() => setIsPrivate(false)}
                type="button"
                className={`p-2 ${isPrivate ? '' : 'bg-primaryColor text-white'}`}
              >
                {t('createCompetition.form.privacyOptions.public')} 
              </button>
              <button
                onClick={() => setIsPrivate(true)}
                type="button"
                className={`p-2 ${isPrivate ? 'bg-primaryColor text-white' : ''}`}
              >
                {t('createCompetition.form.privacyOptions.private')}
              </button>
            </div>
          </div>

          <div>
            <small className="uppercase text-zinc-500 font-semibold text-xs">
              {t('createCompetition.form.categoryLabel')}
            </small>
            <select 
            onChange={(e)=>setCategory(e.target.value)}
            className="border-2 border-300-zinc block p-2 rounded-md outline-none bg-white dark:bg-darkSecondary">
              <option value={''}>{t('createCompetition.form.categoryOptions.select')}</option>
              {
                categories?.map(category => {
                  return <option key={category.id} value={category.id}>{t(category.name)}</option>
                })
              }
            </select>
          </div>

          
        </div>

        <button
          type="button"
          onClick={() => setCreate(true)}
          className="p-2 w-full md:w-72 px-6 bg-black dark:bg-darkSecondary text-white rounded-md duration-500 hover:opacity-75"
        >
          {t('createCompetition.form.createButton')}
        </button>
      </div>
    </form>
  )
}

export default CreatePage