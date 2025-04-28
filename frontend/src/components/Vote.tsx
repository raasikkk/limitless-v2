import { useState } from "react";


type Props = {
  voteType: boolean | null,
  setVoteType: (value: null|boolean) => void;
}

const Vote = ({voteType, setVoteType}: Props) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e:string) => {
    if (comment.length <= 50) {
      setComment(e);
    } 
  }

  return (
    <div className="absolute right-0 top-0 w-96 bg-white border border-zinc-300 rounded-lg p-4 flex flex-col gap-2">
      <div>
        <small className="uppercase text-zinc-500 font-semibold text-xs">
          Comment: (Not necessary)
        </small>
        <div className={`${comment.length > 45 ? 'text-red-500' : ''}`}>
          <span>
          {comment.length}
          </span>
          /50
        </div>
      </div>
      <textarea maxLength={50} onChange={(e)=>handleCommentChange(e.target.value)} className="p-4 rounded-lg resize-none outline-none min-w-40 min-h-10 border border-zinc-500" placeholder="You can leave a comment">
    
      </textarea>
      <div className="flex items-center gap-4 justify-end">
        {
          voteType
          ?
          <button className="rounded-3xl p-1 px-6 bg-green-500 text-white hover:opacity-75">
            Submit upvote
          </button>
          :
          <button className="rounded-3xl p-1 px-6 bg-red-500 text-white hover:opacity-75">
            Submit downvote
          </button>
        }
        <button onClick={()=>setVoteType(null)} className="rounded-3xl p-1 px-6 hover:bg-zinc-200">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Vote