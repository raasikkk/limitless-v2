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
    <div className='fixed inset-0 bg-black bg-opacity-20 z-30 flex items-center justify-end'>
      <form className='bg-white dark:bg-darkColor h-full max-w-2xl w-full relative z-50 shadow-xl'>
        <div className='flex items-center justify-between px-6 py-4 border-b'>
          <button 
            type="button"
            onClick={() => setIsEdit(false)}
            className='p-2 hover:bg-gray-100 dark:hover:bg-[#1E293B] rounded-full transition-colors'
          >
            <X size={24} />
          </button>
          <h2 className='text-xl font-semibold'>Edit Image</h2>
          <div className='w-10' /> {/* Spacer for balance */}
        </div>

        <div 
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="p-8 h-[calc(100%-80px)] flex flex-col items-center justify-center gap-6"
        >
          {image ? (
            <div className='flex flex-col h-full w-full'>
              <div className='flex-1 relative bg-gray-50 rounded-lg overflow-hidden'>
                <img 
                  src={typeof image === 'string' ? image : undefined} 
                  alt="Preview" 
                  className="w-full h-full object-contain p-4" 
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-6 border-t">
                <button 
                  type="button"
                  onClick={() => setIsEdit(false)} 
                  className="px-6 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-primaryColor text-white font-medium hover:opacity-90 rounded-lg transition-opacity"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className='p-6 bg-gray-50 rounded-full'>
                <Image size={40} strokeWidth={1.5} className='dark:text-darkColor' />
              </div>
              <div className='text-center space-y-2'>
                <h3 className='text-2xl font-semibold'>Drag and Drop</h3>
                <p className='text-gray-500'>or</p>
              </div>
              <button 
                type="button" 
                onClick={() => imageInputRef?.current?.click()}
                className="px-8 py-3 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl text-gray-700 hover:text-gray-900 dark:text-white transition-all"
              >
                Browse Files
              </button>
              <input ref={imageInputRef} className="hidden" type="file" accept="image/*" onChange={handleFileChange} />
              <p className='text-sm text-gray-500 mt-4'>Supported formats: JPEG, PNG</p>
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default EditImage