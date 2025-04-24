import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Profile = () => {
  return (
    <Avatar>
        <AvatarImage src="/ava.jpg"/>
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default Profile