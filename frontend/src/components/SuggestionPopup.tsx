import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAppSelector } from "@/hooks/hooks"
import axios from "axios"
import { Bot } from "lucide-react"
import { useState } from "react"
// import { useState } from "react"
import { Loader2 } from "lucide-react"

// const suggestions = [

// ]


const SuggestionPopup = () => {
    const {user} = useAppSelector((state) => state?.user);
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetSuggestions = async () => {
      setIsLoading(true);
      try {

        const suggestion = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/llm/advice/${user?.id}`)).data;
        setSuggestion(suggestion.response)
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <Dialog>
          <DialogTrigger onClick={handleGetSuggestions} className="flex text-white items-center gap-2 fixed bottom-5 right-5 p-2 px-4 font-semibold bg-primaryColor rounded-md animate-bounce duration-1000 opacity-90">
            <Bot />
            {
              isLoading
              ?
              <Loader2 className="animate-spin"/>
              :
              'Suggestions'
            }
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] ">
            <DialogHeader>
              <DialogTitle>Suggestion Based on Bio</DialogTitle>
              <div className="py-4">
              {
                isLoading
                ?
                <Loader2 className="animate-spin"/>
                :
                suggestion
              }
              </div>
            </DialogHeader>

            <div className="flex h-40 items-center justify-center">
                
            </div>

            <div className="flex justify-end gap-3 text-sm font-medium">
                
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                    <button className="border p-2 px-3 rounded-md">Okay</button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
  )
}

export default SuggestionPopup