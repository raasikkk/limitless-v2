import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IUser } from "@/types"
import axios from "axios"
import { CalendarDays, Pencil, Settings } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import { formatDistanceToNow } from 'date-fns';
import { useAppSelector } from "@/hooks/hooks"
import Editor from "@/components/editor/Editor"

const ProfilePage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const {user} = useAppSelector((state)=>state.user);
    const [userData,setUserData] = useState<null|IUser>(null);
    const [followers, setFollowers] = useState<null|IUser>(null);
    const [following, setFollowing] = useState<null|IUser>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [bio, setBio] = useState<string>(userData?.bio||t('no_bio_yet'));
    const [isBioEdit, setIsBioEdit] = useState(false);
    console.log(followers, following);
    
    
    const hanldeUserData = async () => {
      try {
        const user:IUser = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/${id}`)).data;
        setUserData(user)
      } catch (error) {
        console.log(error);
      }
    }

    const handleUserFollowers = async () => {
      try {
        const user:IUser = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/followers/${id}`)).data;
        setFollowers(user)
      } catch (error) {
        console.log(error);
      }
    }
    const handleUserFollowing = async () => {
      try {
        const user:IUser = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/following/${id}`)).data;
        setFollowing(user);
      } catch (error) {
        console.log(error);
      }
    }


    useEffect(()=>{
      hanldeUserData();
      handleUserFollowers();
      handleUserFollowing();
    },[])
    
  return (
    <>
      <div className="mt-5 w-full flex justify-between items-center">
        <button className="p-2 px-3 md:px-4 text-sm text-center md:text-base bg-black dark:bg-darkSecondary text-white font-semibold rounded-full">
            {t("view_info")}
        </button>
        <Link to="/settings" className="p-2 px-3 md:px-4 text-sm md:text-base font-semibold rounded-xl flex items-center gap-2">
            <Settings /> 
            {t("settings")}
        </Link>
      </div>

      <div className="mt-5 p-4 sm:p-8 lg:p-12 xl:p-16 w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 xl:gap-20 border rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8 xl:gap-12">
                <img 
                    src={userData?.avatar}
                    className="rounded-full size-24 sm:size-32 md:size-40 lg:size-48 xl:size-64 border" 
                    alt="ava" 
                />
                <div className="space-y-2 lg:space-y-3 text-center md:text-left">
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-white">{userData?.email}</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white">{userData?.username}</h2>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-white flex flex-col sm:flex-row items-center gap-2">
                        <CalendarDays className="hidden sm:inline-block" />
                        {userData?.created_at && (
                          <>Joined {formatDistanceToNow(new Date(userData.created_at), { addSuffix: true })}</>
                        )}
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-5 text-black dark:text-white">
            {
              user?.id == id
              ?
              <button onClick={()=>setIsEdit(prev=>!prev)} className="p-2 px-4 bg-black dark:bg-darkSecondary text-white text-sm md:text-base font-medium rounded-full">
                {
                  isEdit
                  ?
                  t("cancel")
                  :
                  t("settingsPage.edit_profile")
                }
                </button>
              :
              <div className="flex items-center justify-between">
                <div></div>
                <div className="flex items-center gap-2">
                    <button className="p-2 px-4 bg-black dark:bg-darkSecondary text-white text-sm md:text-base font-medium rounded-full">{t("follow")}</button>
                    <button className="p-2 px-4 border text-black dark:text-white text-sm md:text-base font-medium rounded-full">{t("contact")}</button>
                </div>
              </div>
            }
            <Tabs defaultValue="about" className="mt-3 w-full">
                <TabsList className="w-full mb-2 justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger 
                        value="about"
                        className="flex items-center rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold"
                    >{t("about")}</TabsTrigger>
                    <TabsTrigger 
                        value="follower"
                        className="flex items-center rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold"
                    >{t("followers")} (0)</TabsTrigger>
                    <TabsTrigger 
                        value="following"
                        className="flex items-center rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold"
                    >{t("following")} (0)</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <div className="flex items-center justify-between my-4">
                    <h2 className="font-semibold text-2xl">
                      {t("about")}
                    </h2>
                    {
                      isEdit
                      ?
                      <Pencil onClick={()=>setIsBioEdit(true)} size={20} className="hover:opacity-50"/>
                      :
                      ''
                    }
                  </div>
                  {
                    userData?.bio 
                    ?
                      isBioEdit && isEdit
                        ?
                        <>
                          <Editor content={bio} onChange={setBio}/>
                          <div className="flex items-center justify-end mt-4 gap-2">
                            <button onClick={()=>setIsBioEdit(false)} className="py-2 px-4 rounded-2 rounded-3xl hover:bg-zinc-200 dark:hover:bg-darkSecondary">
                              {t("cancel")}
                            </button>
                            <button className="py-2 px-8 rounded-2 rounded-3xl bg-black text-white hover:opacity-75">
                              {t("save_changes")}
                            </button>
                          </div>
                        </>
                        :
                        <div className="border-b-2 min-h-[156px] rounded-md bg-slate-50 dark:bg-darkSecondary py-2 px-3 outline-none space-y-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-medium [&_p]:text-base [&_a]:text-blue-500 [&_p]:text-base [&_a]:underline" dangerouslySetInnerHTML={{__html: bio}}>
                          {/* Rich text editor */}
                        </div>
                      
                    :
                    t("no_bio_yet")
                  }
                </TabsContent>
                <TabsContent value="follower">0 {t("followers")}</TabsContent>
                <TabsContent value="following">0 {t("following")}</TabsContent>
            </Tabs>
        </div>
    </>
  )
}

export default ProfilePage