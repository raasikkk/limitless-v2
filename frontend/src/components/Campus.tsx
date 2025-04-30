import { useState } from 'react'

type CampusType = {
    onClose: () => void
}

const Campus = ({ onClose }: CampusType) => {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 300) // Match the transition duration
  }

  return (
    <div 
      className={`fixed z-50 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div className={`transform transition-transform ${
        isClosing ? 'scale-90' : 'scale-100'
      }`}>
        <img 
          src="/campus.jpeg" 
          alt="campus" 
          className="max-w-[90vw] max-h-[90vh] shadow-2xl rounded-lg cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Campus