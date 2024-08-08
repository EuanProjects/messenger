import Create from "../create/create";
import EmptyChat from "../home/EmptyChat";
import ChatDetail from "../home/chatDetail";
import Chats from "../home/chats";
import Friends from "../home/friends";
import Home from "../home/home";
import Login from "../login/login";
import ErrorPage from "./errorpage";
import Messages from "../home/messages"
import Setup from "../setup/setup";
import { Navigate } from 'react-router-dom';
import Refresh from "../home/refresh";
import Tutorial from "../tutorial/tutorial";



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
      path: "profile/:profileId/setup",
      element: <Setup />,
      errorElement: <ErrorPage />
    },
    {
      path: "tutorial/:profileId",
      element: <Tutorial />,
      elementError: <ErrorPage />
    },
    {
      path: "/home",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        { path: "profile/:profileId/chats", element: <Chats />, children: [
          {path: "", element: <EmptyChat />},
          {path: ":chatId", element: <Messages />,
            children: [
              {path: "refresh", element: <Refresh />}
            ]
          },
        ]},
        { path: "profile/:profileId/friends", element: <Friends />}
      ]
    },
    {
      path: "*",
      element: <Navigate to="/" replace />
    }
  ];
  
  export default routes;