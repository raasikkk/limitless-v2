import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Bot, Loader2 } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const suggestions = [
    
]


const SuggestionPopup = () => {
    const { t } = useTranslation()

  return (
    <Dialog>
          <DialogTrigger className="flex text-white items-center gap-2 fixed bottom-5 right-5 p-2 px-4 font-semibold bg-primaryColor rounded-md animate-bounce duration-1000 opacity-90">
            <Bot />
            Suggestions
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] ">
            <DialogHeader>
              <DialogTitle>Suggestion Based on Bio</DialogTitle>
            </DialogHeader>

            <div className="flex h-40 items-center justify-center">
                
            </div>

            <div className="flex justify-end gap-3 text-sm font-medium">
                
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                    <button className="border p-2 px-3 rounded-md">{t("cancel")}</button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
  )
}

export default SuggestionPopup