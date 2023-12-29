import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LogInPage from "./pages/LogInPage"
import MainMapPage from "./pages/MainMapPage";
import HomePage from "./pages/HomePage";
import LoadGame from "./pages/LoadGamePage";
import BattlePage from "./pages/BattlePage";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "landing/",
        element: <LandingPage />
      },
      {
        path: "signup/",
        element: <SignUpPage />
      },
      {
        path: "login/",
        element: <LogInPage />
      },
      {
        path: "loadgame/",
        element: <LoadGame />
      },
      {
        path: "main/",
        element: <MainMapPage />
      },
      {
        path: "battle/",
        element: <BattlePage />
      }
    ]

  },
]);

export default router;