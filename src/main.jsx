import { createRoot } from "react-dom/client";
import "./index.css";
import Game from "./components/Game.jsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Game />
  </StrictMode>
);
