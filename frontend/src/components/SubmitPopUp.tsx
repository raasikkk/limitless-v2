import { useRef, useState } from "react";
import Editor from "./editor/Editor";
import { LoaderCircle, RotateCcw } from "lucide-react";
import axios from "axios";

interface Props {
  setIsSubmit: (value: boolean) => void;
  competitionId: number | string
}

const SubmitPopUp = ({ setIsSubmit, competitionId }: Props) => {
  const [image, setImage] = useState<string | Blob | File>('');
  const [explanation, setExplanation] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false)
  

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image)
    formData.append('explanation', explanation);
    formData.append('competition_id', competitionId.toString())
    setIsLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/submissions`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      window.location.reload()

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="fixed overflow-y-auto w-full h-full left-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-darkColor max-w-1/2 py-10 px-4 md:px-8 rounded-lg">
        <p className="text-center pb-4 text-zinc-500 font-medium">
          Make sure that your explanation/file fits the rules.
        </p>
        <small className="uppercase text-zinc-500 font-semibold text-xs">
          Image :
        </small>
        <div 
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="mb-4 relative border border-zinc-200 flex items-center justify-center py-10 rounded-lg"
        >
          {image ? (
            <div>
              <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="Preview" className="max-h-60 object-contain" />
              <RotateCcw onClick={()=>setImage('')} className="absolute -top-5 -right-5"/>
            </div>
          ) : (
            <>
              <button type="button" onClick={()=>imageInputRef?.current?.click()}>
                Select or drop your image here.
              </button>
              <input ref={imageInputRef} className="hidden" type="file" accept="image/*" onChange={handleFileChange} />
            </>
          )}
        </div>

        <label>
          <small className="uppercase text-zinc-500 font-semibold text-xs">
            Explanation :
          </small>
          <Editor content={explanation} onChange={setExplanation} />
        </label>

        <div className="flex items-center justify-end gap-4 mt-4">
          <button 
            type="button"
            onClick={() => setIsSubmit(false)} 
            className="p-2 rounded-lg py-2 px-6 font-semibold hover:opacity-75 border hover:bg-zinc-200 dark:hover:bg-darkSecondary"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="p-2 rounded-lg py-2 px-6 bg-primaryColor text-white font-semibold hover:opacity-75"
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin"/>
            ) : (
              <div>Send</div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitPopUp;
