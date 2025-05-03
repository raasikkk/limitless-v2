import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Slider } from "@/components/ui/slider"
import { ICompetition } from "@/types"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import axios from "axios"
import { useEffect, useState } from "react"

interface SettingsProps {
    id: string | undefined
}

const CompetitionSettings = ({id}: SettingsProps) => {
    const [isPrivate, setIsPrivate] = useState(false)
    const [isAiBased, setIsAiBased] = useState(false)
    const [participantsCount, setParticipantsCount] = useState(0)
    const [code, setCode] = useState<string | number>("")

    const fetchCompetition = async () => {
        try {
            const competition:ICompetition = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}`)).data;
            setIsPrivate(competition.private);
            setIsAiBased(competition.ai_based)
            setParticipantsCount(competition.max_participants)
            setCode(competition.code)
            console.log(competition)
        } catch (error) {   
            console.log(error);
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}`, {
                private: isPrivate
            });
        } catch (error) {
            console.error('Update failed:', error);
        }
    }

    useEffect(() => {
        fetchCompetition()
    }, [])

    return (
        <div className="space-y-8 p-6 bg-gray-50 dark:bg-darkColor min-h-screen">

            <div className="bg-white dark:bg-darkSecondary rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                    Competition Settings
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 dark:bg-darkColor rounded-lg p-5">
                        

                        <div className="space-y-4">
                            {/* Is AI based */}
                            <div className="flex items-center space-x-3 pt-4">
                                <label 
                                    htmlFor="is_ai_based"
                                    className="relative flex items-center cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        id="is_ai_based"
                                        checked={isAiBased}
                                        onChange={(e) => setIsAiBased(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-11 h-6 rounded-full transition-colors
                                    ${isAiBased ? 'bg-primaryColor' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    >
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md
                                        bg-white transition-transform transform duration-200
                                        ${isAiBased ? 'translate-x-5' : ''}`}
                                    />
                                    </div>
                                </label>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Is AI Based
                                </span>
                            </div>

                            {/* Is Private */}
                            <div className="flex items-center space-x-3 pt-4">
                                <label 
                                    htmlFor="private"
                                    className="relative flex items-center cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        id="private"
                                        checked={isPrivate}
                                        onChange={(e) => setIsPrivate(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-11 h-6 rounded-full transition-colors
                                    ${isPrivate ? 'bg-primaryColor' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    >
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md
                                        bg-white transition-transform transform duration-200
                                        ${isPrivate ? 'translate-x-5' : ''}`}
                                    />
                                    </div>
                                </label>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Private Competition
                                </span>
                            </div>

                            {isPrivate ? (
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                                        Secret code to Enter Competition
                                    </h3>
                                    <input 
                                        type="number" 
                                        value={code}
                                        placeholder="Secret code..."
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d{0,4}$/.test(value)) {
                                                setCode(value);
                                            }
                                        }}
                                        maxLength={4} 
                                        inputMode="numeric" 
                                        className="w-40 p-0.5 px-3 rounded-md bg-white dark:bg-darkSecondary border-2 
                                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                                [&::-webkit-inner-spin-button]:appearance-none outline-none"
                                    />
                                </div>
                            ) : null}

                            <div className="mt-5">
                                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                                    Participant number - {participantsCount}
                                </h3>
                                <Slider 
                                    defaultValue={[participantsCount]}
                                    value={[participantsCount]}
                                    min={2}
                                    max={30} 
                                    step={1} 
                                    onValueChange={([val]) => setParticipantsCount(val)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primaryColor hover:bg-blue-700 text-white rounded-lg
                            transition-colors duration-200 font-medium shadow-sm"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">
                    Danger Zone
                </h2>

                {/* Добавь в Continue Delete function */}
                <AlertDialog>
                    <AlertDialogTrigger>
                        <button 
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg
                            transition-colors duration-200 font-medium shadow-sm"
                            
                        >
                            Delete Competition
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your competition
                            and remove your data from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default CompetitionSettings