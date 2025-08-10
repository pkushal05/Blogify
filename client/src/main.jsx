import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Import Provider to connect Redux store
import { Provider } from "react-redux";

// Import the Redux store
import store from "./features/store/store.js";

// Import global CSS styles
import "./index.css";

// Import main App component
import App from "./App.jsx";

// Render the app inside Provider and BrowserRouter
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
