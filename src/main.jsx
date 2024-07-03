import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* mengijinkan browser router untuk menghandle semua routing di Applikasi kita yaitu di App */}
    <App />
  </BrowserRouter>
);
