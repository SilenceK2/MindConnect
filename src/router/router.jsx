import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/LogIn";
import Join from "../pages/Join";
import ErrorPage from "../pages/ErrorPage";
import { verify } from "../utils/auth";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Home />,
    errorElement: <Login />,
    loader: async () => {
      const result = await verify();
      if (result.success) {
        return { user: result.user };
      } else {
        throw new Error(Error);
      }
    },
  },
  {
    path: "/join",
    element: <Join />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
