import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/LogIn";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Home />,
    errorElement: <Login />,
    loader: async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error(Error);
      }

      return {};
    },
  },
]);

export default router;
