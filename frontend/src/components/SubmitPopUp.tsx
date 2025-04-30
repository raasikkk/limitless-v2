import { useRef, useState } from "react";
import Editor from "./editor/Editor";
import { RotateCcw } from "lucide-react";

interface Props {
  setIsSubmit: (value: boolean) => void;
}

const SubmitPopUp = ({ setIsSubmit }: Props) => {
  const [image, setImage] = useState<null | File | string>(null);
  const [explanation, setExplanation] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="fixed w-full h-full left-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <form onSubmit={handleSubmit} className="bg-white max-w-1/2 py-10 px-4 md:px-8 rounded-lg">
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
              <img src={typeof image === 'string' ? image : undefined} alt="Preview" className="max-h-60 object-contain" />
              <RotateCcw onClick={()=>setImage(null)} className="absolute -top-5 -right-5"/>
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
            className="p-2 rounded-lg py-2 px-6 font-semibold hover:opacity-75 hover:bg-zinc-200"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="p-2 rounded-lg py-2 px-6 bg-primaryColor text-white font-semibold hover:opacity-75"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitPopUp;
