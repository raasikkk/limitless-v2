import FollowerCard from "@/components/FollowerCard"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { ICompetition, IParticipant } from "@/types"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import axios from "axios"
import { useEffect, useState } from "react"

interface SettingsProps {
    id: string | undefined
}

const CompetitionSettings = ({id}: SettingsProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false)
    const [participants, setParticipants] = useState<IParticipant[]>([])

    const fetchCompetition = async () => {
        try {
            const competition:ICompetition = (await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}`)).data;
            setDescription(competition.description);
            setIsPrivate(competition.private);
            setTitle(competition?.title);
        } catch (error) {
            console.log(error);
        }
    }

    const getParticipants = async () => {
        const data = (await axios.get(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}/participants`
        )).data;
        setParticipants(data)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/competitions/${id}`, {
                title,
                description,
                private: isPrivate
            });
        } catch (error) {
            console.error('Update failed:', error);
        }
    }

    useEffect(() => {
        fetchCompetition()
        getParticipants()
    }, [])

    return (
        <div className="space-y-8 p-6 bg-gray-50 dark:bg-darkColor min-h-screen">

            <div className="bg-white dark:bg-darkSecondary rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                    Competition Settings
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 dark:bg-darkColor rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                            General Settings
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label 
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                >
                                    Competition Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-darkSecondary
                                    dark:text-gray-200 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label 
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-darkSecondary
                                    dark:text-gray-200 transition-all"
                                />
                            </div>

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

            <div className="bg-white dark:bg-darkSecondary rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                    Participants ({participants.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {participants.map((item) => (
                        <FollowerCard 
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
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