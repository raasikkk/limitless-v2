import { Link, Outlet, NavLink } from "react-router"

const Competition = () => {
  return (
    <div className="mt-5 text-black dark:text-white pt-10">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Link to={`/profile/1`}>
            <img className="w-10 h-10 p-1 border-2 border-zinc-500 rounded-full" src="/ava.jpg" />
          </Link>
          <span className="text-zinc-600 text-sm">Created 8 month ago</span>
        </div>
        <button className="bg-black py-1 px-4 rounded-lg text-white font-semibold hover:opacity-75">
          Join Competiton
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-3 text-4xl">Competition Title</h1>
          <Link to={`/categories/Programming`} className="font-medium p-1 px-2 rounded-md bg-primaryColor text-white hover:underline">Programming</Link>
        </div>
        <img className="w-72 h-40 rounded-lg bg-black" src="" alt="Competiton cover"/>
      </div>
 
    </div>
  )
}

export default Competition