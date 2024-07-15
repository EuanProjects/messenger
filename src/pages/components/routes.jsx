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
      path: "/home",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        { path: "profile/:profileId/chats", element: <Chats />, children: [
          {path: "", element: <EmptyChat />},
          {path: ":chatId", element: <Messages />},
        ]},
        { path: "profile/:profileId/friends", element: <Friends />}
      ]
    },
    

  ];
  
  export default routes;