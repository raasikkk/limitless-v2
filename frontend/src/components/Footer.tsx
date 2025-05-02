import { useTranslation } from "react-i18next"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="">
      <center>
          <hr className="my-3 sm:mx-auto lg:my-6 text-center" />
          <span className="block text-sm pb-4 text-gray-800 dark:text-white/50 text-center">
          © 2025{" "}
          <a href="#" className="hover:underline">
            Sheksiz
          </a>
          . {t('rights')}
          </span>
      </center>
    </footer>
  )
}

export default Footer