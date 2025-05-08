import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import axios from "axios"
import { useState } from "react"
// import { useState } from "react"
import { Loader2,MessageSquareCode } from "lucide-react"
import { useTranslation } from "react-i18next"

const FeedbackPopup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [message,setMessage] = useState('');

  const [success, setSuccess] = useState('');
  const [err, setErr] = useState('');

  const {t} = useTranslation();


  const handleSubmit = async () => {
    setIsLoading(true);
    try {

      if (!subject || !setMessage) {
        return alert('Fill all the fields')
      }

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/feedback`, {
        subject, message
      })

      setSuccess(res.data.message);
      setErr('');
      setMessage('');
      setSubject('')
      
    } catch (error:any) {
      console.log(error);
      setErr(error.response.data.message)
    }
    finally {
      setIsLoading(false)
    }
  }

    

  return (
    <Dialog>
      <DialogTrigger className="absolute left-4 bottom-10 flex w-fit text-white items-center gap-4 fixed right-5 p-2 px-4 font-semibold bg-orange-600 rounded-md opacity-90">
        <MessageSquareCode/> {t('feedback.title')}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] ">
        <DialogHeader>
          <DialogTitle className="mb-5">{t('feedback.title')}</DialogTitle>
          {
            success.length > 0 ? <p className="text-green-500">{success}</p> : ''
          }
          {
            err.length > 0 ? <p className="text-red-500">{err}</p> : ''
          }
        </DialogHeader>

        <label htmlFor="subject" className="flex flex-col ">
          <small className="uppercase text-zinc-500 font-semibold text-xs">
            {t('feedback.subject')} :
          </small>
          <input className="border bg-transparent border-zinc-400 rounded-md p-2 outline-none" id="subject" value={subject} onChange={(e)=>setSubject(e.target.value)} type="text" />
        </label>
        <label htmlFor="message" className="flex flex-col">
          <small className="uppercase text-zinc-500 font-semibold text-xs">
            {t('feedback.message')} :
          </small>
          <textarea className="border bg-transparent min-h-36 h-40 border-zinc-400 rounded-md p-2 outline-none" id="message" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
        </label>

        <div className="flex justify-end gap-3 text-sm font-medium">
            
          <div className="flex items-center gap-2">
            <DialogClose asChild>
              <button onClick={()=>setSuccess('')} className="border p-2 px-3 rounded-md">{t('cancel')}</button>
            </DialogClose>
            <button className="border p-2 px-3 rounded-md text-white bg-primaryColor" onClick={()=>handleSubmit()}>
              {
                isLoading
                ?
                <Loader2 className="animate-spin"/>
                :
                t('competition.submit')
              }
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackPopup