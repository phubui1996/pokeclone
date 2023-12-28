import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RegisterPage from "./pages/RegisterPage";
import GamePlay from "./pages/GamePlayPage";
import HomePage from "./pages/HomePage";
import LoadGame from "./pages/LoadGamePage";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
              {
                path: "/",
                element: <HomePage />
              },
              {
                path: "game/",
                element: <GamePlay />
              },
              {
                path: "loadgame/",
                element: <LoadGame />
              }
            ]
            
  },
]);

export default router;