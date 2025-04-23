import { CalendarDays, Search, Settings } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"

const Profile = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    console.log(id);
    
  return (
    <>
        <div className="flex items-center justify-between gap-5">
        <form 
          className="relative w-full " //sm:w-4/5
        >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
                type="text"
                className="pl-10 p-3 w-full border rounded-full outline-none"
                placeholder={t('search')}
            />
        </form>

        <div className="hidden sm:block rounded-full size-14 aspect-square border">
            <img 
                src="/ava.jpg"
                className="rounded-full size-14 aspect-square border" 
                alt="ava" 
            />
        </div>
      </div>

      <div className="mt-5 w-full flex justify-between items-center">
        <Link to="/" className="p-2 px-3 md:px-4 bg-black text-white font-semibold rounded-xl">
            View Information
        </Link>
        <Link to="/" className="p-2 px-3 md:px-4 border border-black font-semibold rounded-xl flex items-center gap-2">
            <Settings /> 
            Settings
        </Link>
      </div>

      <div className="mt-5 p-4 sm:p-8 lg:p-12 xl:p-16 w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 xl:gap-20 border rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8 xl:gap-12">
                <img 
                    src="/ava.jpg"
                    className="rounded-full size-24 sm:size-32 md:size-40 lg:size-48 xl:size-64 border" 
                    alt="ava" 
                />
                <div className="space-y-2 lg:space-y-3 text-center md:text-left">
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600">zhankeldiulyrasultop1@gmail.com</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Rasul Zhankeldyuly</h2>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600 flex flex-col sm:flex-row items-center gap-2">
                        <CalendarDays className="hidden sm:inline-block" />
                        Joined a year ago · last seen in the past day
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-5 ">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl">About</h2>
                <div className="flex items-center gap-2">
                    <button className="p-2 px-4 bg-black text-white font-medium rounded-full">Follow</button>
                    <button className="p-2 px-4 border border-black text-black font-medium rounded-full">Contact</button>
                </div>
            </div>
            <p>No bio yet...</p>
        </div>
    </>
  )
}

export default Profile