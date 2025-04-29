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
    const [followers, setFollowers] = useState<IUser[]>([]);
    const [following, setFollowing] = useState<IUser[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [bio, setBio] = useState<string>(userData?.bio||t('no_bio_yet'));
    const [isBioEdit, setIsBioEdit] = useState(false);
    
    
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
        const followersData:IUser[] = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/followers/${id}`)).data;
        setFollowers(followersData)
      } catch (error) {
        console.log(error);
      }
    }
    const handleUserFollowing = async () => {
      try {
        const followingData:IUser[] = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/following/${id}`)).data;
        setFollowing(followingData);
      } catch (error) {
        console.log(error);
      }
    }


    useEffect(()=>{
      hanldeUserData();
      handleUserFollowers();
      handleUserFollowing();
    },[id])

    
  return (
    <>
      <div className="mt-5 w-full flex justify-between items-center">
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
          ''
        }
        
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
              ''
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
                    >{t("followers")} ({followers.length})</TabsTrigger>
                    <TabsTrigger 
                        value="following"
                        className="flex items-center rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold"
                    >{t("following")} ({following.length})</TabsTrigger>
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
                  }
                </TabsContent>
                <TabsContent value="follower">
                  <div className="mt-5">
                    <h2 className="text-2xl font-bold">{t("followers")} ({followers.length})</h2>

                    <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                      {
                      followers?.length > 0
                      ?
                      followers.map((item) => (
                        <Link
                          to={`/profile/${item.id}`} 
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors min-w-0"
                        >
                          <img 
                            src={item.avatar} 
                            className="size-8 lg:size-10 rounded-full flex-shrink-0" 
                            alt={item.username} 
                          />
                          <span className="text-xs sm:text-sm font-medium truncate">
                            {item.username}
                          </span>
                        </Link>
                        ))
                        :
                        ''
                      }
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="following">
                  <div className="mt-5">
                      <h2 className="text-2xl font-bold">{t("following")} ({following.length})</h2>

                      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                        {
                        following.length > 0
                        ?
                        following.map((item) => (
                          <Link
                            to={`/profile/${item.id}`} 
                            key={item.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors min-w-0"
                          >
                            <img 
                              src={item.avatar} 
                              className="size-8 lg:size-10 rounded-full flex-shrink-0" 
                              alt={item.username} 
                            />
                            <span className="text-xs sm:text-sm font-medium truncate">
                              {item.username}
                            </span>
                          </Link>
                          ))
                          :
                          ''
                        }
                      </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </>
  )
}

export default ProfilePage