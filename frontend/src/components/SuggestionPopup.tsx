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
          <DialogTrigger onClick={handleGetSuggestions} className="hidden flex text-white items-center gap-2 fixed bottom-5 right-5 p-2 px-4 font-semibold bg-primaryColor rounded-md animate-bounce duration-1000 opacity-90">
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
              <DialogTitle className="mb-5">Suggestion Based on Bio</DialogTitle>
              <div className="p-3 min-h-40 flex justify-center border-2 rounded-md hover:bg-darkSecondary">
              {
                isLoading
                ?
                <div className="flex items-center justify-center">
                    <Loader2 className="block mx-auto animate-spin"/>
                </div>
                :
                suggestion
              }
              </div>
            </DialogHeader>

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