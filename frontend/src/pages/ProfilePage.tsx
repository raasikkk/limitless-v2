import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IUser } from "@/types"
import axios from "axios"
import { CalendarDays, Pencil, Settings } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate, useParams } from "react-router-dom"
import { formatDistanceToNow } from 'date-fns';
import { useAppSelector } from "@/hooks/hooks"
import Editor from "@/components/editor/Editor"
import EditImage from "@/components/EditImage"
import { Skeleton } from "@/components/ui/skeleton"
import FollowerCard from "@/components/FollowerCard"

interface IFollower extends IUser {
  follower_id: string
}

const ProfilePage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const {user, isLogged} = useAppSelector((state)=>state.user);
    const [userData,setUserData] = useState<null|IUser>(null);
    const [followers, setFollowers] = useState<IFollower[]>([]);
    const [following, setFollowing] = useState<IFollower[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [bio, setBio] = useState<string>(userData?.bio||'');
    const [isBioEdit, setIsBioEdit] = useState(false);
    const [isAvatarEdit, setIsAvatarEdit] = useState(false);
    const [avatar, setAvatar] = useState<File|null|string>(null);

    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
      if (!isLogged) {
        navigate("/auth/signin")
      }
    }, [isLogged])
    
    const hanldeUserData = async () => {
      try {
        const user:IUser = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/${id}`)).data;
        setUserData(user)
        setAvatar(user.avatar)
        setBio(user?.bio ? user?.bio : '')
        
      } catch (error) {
        console.log(error);
      }
    }

    const handleUserFollowers = async () => {
      try {
        const followersData:IFollower[] = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/followers/${id}`)).data;
        setFollowers(followersData)
      } catch (error) {
        console.log(error);
      }
    }
    const handleUserFollowing = async () => {
      try {
        const followingData:IFollower[] = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/following/${id}`)).data;
        setFollowing(followingData);
      } catch (error) {
        console.log(error);
      }
    }

    const handleFollow = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/follow`, {
          follower_id: user?.id,
          user_id: id
        })

        handleUserFollowers();
        handleUserFollowing();
      } catch (error) {
        console.log(error);
      }
    }
    const handleUnfollow = async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/unfollow/${id}/${user?.id}`)
        handleUserFollowers();
        handleUserFollowing();
      } catch (error) {
        console.log(error);
      }
    }

    const handleAvatarChange = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      
      const formData = new FormData();
      if (!avatar) {
        return alert('Select image')
      }
      formData.append('avatar', avatar);
      try {
        await axios.patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/avatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        hanldeUserData();
        setIsAvatarEdit(false)
      } catch (error) {
        console.log(error);
      }
    }


    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          await Promise.all([
            hanldeUserData(),
            handleUserFollowers(),
            handleUserFollowing()
          ]);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, [id]);


    const handleBioChange = async () => {
      try {
        console.log(bio);
        
        await axios.patch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/users`, { bio });
        hanldeUserData();
        setIsBioEdit(false)
      } catch (error) {
        console.log(error);
      }
    }

    console.log(followers)

    
  return (
    <>
      <div className="mt-5 w-full flex justify-between items-center">
        {
          isAvatarEdit
          ?
          <EditImage handleSave={handleAvatarChange} image={avatar} setIsEdit={setIsAvatarEdit} setImage={setAvatar}/>
          :
          ''
        }

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
                <div className="relative">
                  {isLoading ? (
                    <Skeleton className="rounded-full size-24 sm:size-32 md:size-40 lg:size-48 xl:size-64 border" />
                  ) : (
                    <img 
                      src={userData?.avatar}
                      className="rounded-full size-24 sm:size-32 md:size-40 lg:size-48 xl:size-64 border" 
                      alt="ava" 
                  />
                  )}
                  {
                    isEdit
                    ?
                    <Pencil onClick={()=>setIsAvatarEdit(true)} size={20} className="absolute top-0 right-0 hover:opacity-50"/>
                    :
                    ''
                  }
                </div>
                <div className="space-y-2 lg:space-y-3 text-center md:text-left">
                    {isLoading ? (
                      <>
                        <Skeleton className="h-4 w-[200px] mx-auto md:mx-0" />
                        <Skeleton className="h-8 w-[300px] mx-auto md:mx-0" />
                        <Skeleton className="h-4 w-[250px] mx-auto md:mx-0" />
                      </>
                    ) : (
                      <>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-white">{userData?.email}</p>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white">{userData?.username}</h2>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-white flex flex-col sm:flex-row items-center gap-2">
                            <CalendarDays className="hidden sm:inline-block" />
                            {userData?.created_at && (
                              <>Joined {formatDistanceToNow(new Date(userData.created_at), { addSuffix: true })}</>
                            )}
                        </p>
                      </>
                    )}
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
                    {isLoading ? (
                      <div className="flex gap-2">
                        <Skeleton className="h-10 w-24 rounded-full"/>
                        <Skeleton className="h-10 w-24 rounded-full"/>
                      </div>
                    ) : (
                      <>
                        {followers.some(mate => mate?.follower_id == user?.id)
                        ?
                        <button onClick={handleUnfollow} className="p-2 px-4 bg-black dark:bg-darkSecondary text-white text-sm md:text-base font-medium rounded-full">{t("unfollow")}</button>
                        :
                        <button onClick={handleFollow} className="p-2 px-4 bg-primaryColor text-white text-sm md:text-base font-medium rounded-full">{t("follow")}</button>}

                        <Link to={`/chats/${id}`} className="p-2 px-4 border text-black dark:text-white text-sm md:text-base font-medium rounded-full">{t("contact")}</Link>
                      </>
                    )}
                </div>
              </div>
            }
            <Tabs defaultValue="about" className="mt-3 w-full">
                <TabsList className="rounded-none bg-transparent justify-start overflow-x-scroll overflow-y-hidden w-full">
                    <TabsTrigger 
                        value="about"
                        className="flex items-center rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold"
                    >
                      {t("about")}
                    </TabsTrigger>
                    <TabsTrigger 
                        value="follower"
                        className="flex items-center rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold"
                    >
                      {t("followers")} ({followers.length})
                    </TabsTrigger>
                    <TabsTrigger 
                        value="following"
                        className="flex items-center rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold"
                    >
                      {t("following")} ({following.length})
                    </TabsTrigger>
                    <TabsTrigger 
                        value="competition"
                        className="flex items-center rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 font-semibold"
                    >
                      {t("competitions")} ({following.length})
                    </TabsTrigger>
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
                  {isLoading ? (
                    <Skeleton className="h-[156px] w-full rounded-md" />
                  ) : (
                    <>
                    {
                    isBioEdit && isEdit
                      ?
                      (<>
                        <Editor content={bio} onChange={setBio}/>
                        <div className="flex items-center justify-end mt-4 gap-2">
                          <button onClick={()=>setIsBioEdit(false)} className="py-2 px-4 rounded-2 rounded-3xl hover:bg-zinc-200 dark:hover:bg-darkSecondary">
                            {t("cancel")}
                          </button>
                          <button onClick={handleBioChange} className="py-2 px-8 rounded-2 rounded-3xl bg-black text-white hover:opacity-75">
                            {t("save_changes")}
                          </button>
                        </div>
                      </>)
                      :
                      (<div className="border-b-2 min-h-[156px] rounded-md bg-slate-50 dark:bg-darkSecondary py-2 px-3 outline-none space-y-2 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-medium [&_p]:text-base [&_a]:text-blue-500 [&_p]:text-base [&_a]:underline" dangerouslySetInnerHTML={{__html: bio}}>
                        {/* Rich text editor */}
                      </div>)
                    }
                      </>
                  )}
                </TabsContent>
                <TabsContent value="follower">
                  <div className="mt-5">
                    <h2 className="text-2xl font-bold">{t("followers")} ({followers.length})</h2>

                    <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                      {isLoading ? (
                        [...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-lg"
                          >
                            <Skeleton className="size-8 lg:size-10 rounded-full"/>
                            <Skeleton className="h-4 w-[100px]"/>
                          </div>
                        ))
                      ) : (
                        followers?.length > 0
                        ?
                        followers.map((item) => (
                          <FollowerCard 
                            key={item.id}
                            item={item}
                          />
                          ))
                          :
                          ''
                      )}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="following">
                  <div className="mt-5">
                      <h2 className="text-2xl font-bold">{t("following")} ({following.length})</h2>

                      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                        {isLoading ? (
                          [...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 rounded-lg"
                            >
                              <Skeleton className="size-8 lg:size-10 rounded-full"/>
                              <Skeleton className="h-4 w-[100px]"/>
                            </div>
                          ))
                        ) : (
                          following.length > 0
                          ?
                          following.map((item) => (
                            <FollowerCard 
                              key={item.id}
                              item={item}
                            />
                            ))
                            :
                            ''
                        )}
                      </div>
                    </div>
                </TabsContent>
                <TabsContent value="competitions">

                </TabsContent>
            </Tabs>
        </div>
    </>
  )
}

export default ProfilePage