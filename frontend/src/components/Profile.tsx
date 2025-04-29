import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LogOut, User } from "lucide-react"
import { useAppSelector } from "@/hooks/hooks"
import axios from "axios"


const Profile = () => {
    const navigate = useNavigate()
    const {user} = useAppSelector((state)=>state.user);

    const logout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/logout`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={user?.avatar}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-[#1E1E1E] text-[#FAFAFA] border-[#2A252C]">
                <DropdownMenuLabel><p className="p-1">{user?.username}</p></DropdownMenuLabel>
                <DropdownMenuSeparator className=""  />
                {/* <DropdownMenuGroup> */}
                    <DropdownMenuItem onClick={() => navigate(`/profile/${user?.id}`)} className="hover:bg-[#2A252C] flex items-center gap-2">
                        <User />
                        <p className="text-sm truncate">Profile</p>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                {/* </DropdownMenuGroup> */}
                    <DropdownMenuItem onClick={()=>logout} className="flex items-center gap-2">
                      <LogOut />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default Profile