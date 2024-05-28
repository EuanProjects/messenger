import App from "../../App";
import Create from "../create/create";
import Login from "../login/login";
import ErrorPage from "./errorpage";

const routes = [
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/createaccount",
      element: <Create />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/messages",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    

  ];
  
  export default routes;