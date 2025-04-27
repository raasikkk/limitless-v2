import React from 'react'
import { useRef } from 'react';
import { X, Image } from 'lucide-react';
type Props = {
  setIsEdit: (value:boolean) => void;
  setImage: (value:File|string|null) => void;
  image: File | string | null
}

const EditImage = ({setIsEdit, setImage, image}: Props) => {
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
    <div className='fixed bg-black bg-opacity-20 z-50 w-full h-full top-0 left-0 flex items-center justify-end'>
      <form className='bg-white h-full w-1/2 relative'>
        <div className='flex items-center gap-4 border-b py-5 px-10'>
          <X className='hover:opacity-50' onClick={()=>setIsEdit(false)}/>
          <p>Edit image</p>
        </div>
        <div 
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="mx-5 border-primaryColor relative h-full flex flex-col items-center gap-4 border border-zinc-200 flex flex-col justify-center rounded-lg"
        >
          {image 
          ? 
            <>
              <img src={typeof image === 'string' ? image : undefined} alt="Preview" className="max-h-60 object-contain" />
              <div className="flex items-center justify-end gap-4 mt-4">
                <button 
                  type="button"
                  onClick={() => setIsEdit(false)} 
                  className=" p-2 rounded-lg py-2 px-6 font-semibold hover:opacity-75 hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="p-2 rounded-lg py-2 px-6 bg-primaryColor text-white font-semibold hover:opacity-75"
                >
                  Save
                </button>
              </div>
            </>
            :
            <>
              <Image size={'3rem'}/>
              <h2 className='font-bold'>
                Drag and drop your images
              </h2>
              <span className='font-medium'>
                or
              </span>
              <button className='font-medium py-2 px-6 border-2 border-zinc-500 w-fit rounded-2xl' type="button" onClick={()=>imageInputRef?.current?.click()}>
                Browse Images
              </button>
              <input ref={imageInputRef} className="hidden" type="file" accept="image/*" onChange={handleFileChange} />
            </>
          }
        </div>
      </form>
    </div>
  )
}

export default EditImage