import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import { useTranslation } from "react-i18next"
import { useEffect } from "react";
import Signin from "./pages/auth/Signin";
import Register from "./pages/auth/Register";
import Settings from "./pages/Settings";
import Competitions from "./pages/Competitions";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";

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
          <Route path="/profile/:id" element={<ProfilePage />}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/competitions" element={<Competitions />}/>
          <Route path="/create" element={<CreatePage/>}/>
        </Route>
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
