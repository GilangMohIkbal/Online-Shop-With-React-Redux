import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { globalStore } from "./store/store.js";
// import { legacy_createStore } from "redux";
// import { store } from "./store/store.js";

// const glocalStore = legacy_createStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={globalStore}>
    <BrowserRouter>
      {/* mengijinkan browser router untuk menghandle semua routing di Applikasi kita yaitu di App */}
      <App />
    </BrowserRouter>
  </Provider>
);
