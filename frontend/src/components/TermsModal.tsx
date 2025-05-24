import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface TermsModalProps {
    isOpen: boolean;
    onAccept: () => void;
}

const TermsModal = ({ isOpen, onAccept }: TermsModalProps) => {
    const [isChecked, setIsChecked] = useState(false);

    // disable scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleAccept = () => {
        document.body.style.overflow = 'auto';
        onAccept();
    };

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white dark:bg-darkSecondary p-8 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Terms and Conditions</h2>
                </div>

                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                    <p className="text-base leading-relaxed">
                        Please read and accept our Terms of Service to continue using our platform.
                    </p>
                    
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="terms-checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <p className="text-sm">
                            I have read and agree to the{' '}
                            <Link 
                                to="/terms" 
                                target="_blank"
                                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            >
                                Terms of Service
                            </Link>
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            onClick={handleAccept}
                            disabled={!isChecked}
                            className={`
                                px-6 py-2 rounded-md font-medium transition-colors duration-200
                                ${isChecked 
                                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                                }
                            `}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsModal