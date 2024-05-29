import Create from "../create/create";
import EmptyChat from "../home/EmptyChat";
import ChatDetail from "../home/chatDetail";
import Chats from "../home/chats";
import Friends from "../home/friends";
import Home from "../home/home";
import Login from "../login/login";
import ErrorPage from "./errorpage";
import Messages from "../home/messages"


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
        { path: "chats", element: <Chats />, children: [
          {path: "", element: <EmptyChat />},
          {path: ":chatId", element: <Messages />},
        ]},
        { path: "friends", element: <Friends />}
      ]
    },
    

  ];
  
  export default routes;