import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signin = () => {
    const colorTheme = localStorage.getItem("theme");
    
    useEffect(() => {
        if (colorTheme) {
            document.body.classList.add(colorTheme);
        }
    }, [])

    const [showPassword, setShowPassword] = useState(false);
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const { t } = useTranslation();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`, {
            userData: formData.email,
            password: formData.password
          });
          window.location.reload();
        } catch (err) {
          let errorMessage
          
          if (axios.isAxiosError(err)) {
            errorMessage = err.response?.data?.message;
          } else if (err instanceof Error) {
            errorMessage = err.message;
          }
      
          toast.error(errorMessage);
        }
      };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-darkColor">
            <div className="w-full max-w-md p-8 bg-white dark:bg-darkSecondary dark:border-2 rounded-lg shadow-md">
                <div className="mb-8 text-center">
                    <div className="mb-4">
                        {/* LOGO */}
                        <span className="text-2xl font-bold text-primaryColor">Sheksiz</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{t('sigin_email')}</h2>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email_or_username" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            {t("auth.email_or_username")}
                        </label>
                        <input
                            type="text"
                            required
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t("auth.enter_login")}
                            className="w-full px-4 py-2 border border-gray-300 bg-white dark:bg-darkSecondary rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="relative w-full">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            {t("password")}
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder={t("auth.enter_password")}
                            className="w-full px-4 py-2 border border-gray-300 bg-white dark:bg-darkSecondary rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div
                            // type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            {showPassword ? (
                                <EyeClosed />
                            ) : (
                                <Eye />
                            )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t("auth.min_7_char")}</p>
                    </div>

                    <div className="flex justify-between items-center mt-8 text-black dark:text-white">
                        <Link to="/" className="px-4 py-2 flex items-center gap-1 text-sm font-semibold hover:underline">
                            <ArrowLeft size={17} /> {t("auth.back")}
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 font-semibold bg-primaryColor text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {t("auth.next")}
                        </button>
                    </div>

                    <Link
                        to={`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/google`}
                        className="p-2 px-4 flex items-center justify-center gap-2 border rounded-full font-semibold text-black dark:text-white"
                    >
                        <img src="/google-icon.svg" alt="google" width={20} />
                        <span>{t("signin_google")}</span>
                    </Link>

                    <p className="text-center text-black dark:text-white">{t("dont_have_account")} <Link to="/auth/register" className="text-primaryColor hover:underline">{t("auth.register_here")}</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Signin;