import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ContactTbl from "./components/ContactTbl";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ContactTbl />
    </StrictMode>
);
