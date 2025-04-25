import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LogOut, User } from "lucide-react"


const Profile = () => {
    const navigate = useNavigate()
    return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="/ava.jpg"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-[#1E1E1E] text-[#FAFAFA] border-[#2A252C]">
                <DropdownMenuLabel><p className="p-1">My Account</p></DropdownMenuLabel>
                <DropdownMenuSeparator className=""  />
                {/* <DropdownMenuGroup> */}
                    <DropdownMenuItem onClick={() => navigate("/profile/1")} className="hover:bg-[#2A252C] flex items-center gap-2">
                        <User />
                        <p className="text-sm truncate">Profile</p>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                {/* </DropdownMenuGroup> */}
                    <DropdownMenuItem className="flex items-center gap-2">
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