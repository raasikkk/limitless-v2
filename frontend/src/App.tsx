import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import { useTranslation } from "react-i18next"
import { useEffect } from "react";
import Signin from "./pages/auth/Signin";
import Register from "./pages/auth/Register";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
        </Route>
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
