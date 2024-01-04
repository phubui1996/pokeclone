import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LogInPage from "./pages/LogInPage"
import MainMapPage from "./pages/MainMapPage";
import HomePage from "./pages/HomePage";
import BattlePage from "./pages/BattlePage";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import StarterPage from "./pages/StarterPage";
import GymPage from "./pages/GymPage";
import PokeCenterPage from "./pages/PokeCenterPage";
import IntroPage from "./pages/IntroPage";
import ErrorPage from "./pages/ErrorPage";
import HousePage from "./pages/HousePage";
import PokedexPage from "./pages/PokedexPage";
import GameOverPage from "./pages/GameOverPage";
import VictoryPage from "./pages/VictoryPage";

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
        path: "starter/",
        element: <StarterPage />
      },
      {
        path: "intro/",
        element: <IntroPage />
      },
      {
        path: "main/",
        element: <MainMapPage />
      },
      {
        path: "battle/",
        element: <BattlePage />
      },
      {
        path: "gym/",
        element: <GymPage />
      },
      {
        path: "pokecenter/",
        element: <PokeCenterPage />
      },
      {
        path: "house/",
        element: <HousePage />
      },
      {
        path: "pokedex/",
        element: <PokedexPage />
      },
      {
        path: "gameover/",
        element: <GameOverPage />
      },
      {
        path: "victory/",
        element: <VictoryPage />
      }
    ]
    
  },
]);

export default router;