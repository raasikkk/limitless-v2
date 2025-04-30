import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Signin from "./pages/auth/Signin";
import Register from "./pages/auth/Register";
import Settings from "./pages/Settings";
import Competitions from "./pages/competition/Competitions";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import CompetitionCategorie from "./pages/competition/CompetitionCategorie";
import Competition from "./pages/competition/Competition";
import Submission from "./pages/competition/Submission";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchUserIsLogged } from "./features/userSlice/userSlice";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const { isLogged } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserIsLogged());
  }, []);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route
            path="/categories/:category_id"
            element={<CompetitionCategorie />}
          />
          <Route path="/competitions/:id" element={<Competition />} />
          <Route
            path="/competitions/:id/submission/:submissionId"
            element={<Submission />}
          />
          <Route path="/create" element={<CreatePage />} />
        </Route>
        <Route
          path="/auth/signin"
          element={isLogged ? <Navigate to={"/"} /> : <Signin />}
        />
        <Route
          path="/auth/register"
          element={isLogged ? <Navigate to={"/"} /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
