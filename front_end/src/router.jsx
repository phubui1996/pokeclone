import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RegisterPage from "./pages/RegisterPage";
import GamePlay from "./pages/GamePlayPage";
import HomePage from "./pages/HomePage";
import LoadGame from "./pages/LoadGamePage";
import BattlePage from "./pages/BattlePage";


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
                path: "game/",
                element: <GamePlay />
              },
              {
                path: "loadgame/",
                element: <LoadGame />
              },
              {
                path: "battle/",
                element: <BattlePage />
              },
              {
                path: "register/",
                element: <RegisterPage />
              }
            ]
            
  },
]);

export default router;