import Create from "../create/create";
import Chats from "../home/chats";
import Friends from "../home/friends";
import Home from "../home/home";
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
      path: "/home",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        { path: "chats", element: <Chats />},
        { path: "friends", element: <Friends />}
      ]
    },
    

  ];
  
  export default routes;