import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import EventDetailPage from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventsRootLayout from './pages/EventsRoot';
import NewsletterPage from "./pages/Newsletter";
import { eventsLoader, eventsDetailLoader } from "./pages/loaders";
import { submitEventAction, submitDeleteEventAction, submitNewsletterSignup, submitAuthForm, logoutAction } from "./pages/actions";
import { tokenLoader, checkAuthLoader } from "./util/auth";
import ErrorPage from "./pages/Error";
import Authentication from "./pages/Authentication";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader
          },
          {
            path: ':eventId',
            loader: eventsDetailLoader,
            id: "event-detail",
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: submitDeleteEventAction
              },
              {
                path: 'edit',
                loader: checkAuthLoader,
                element: <EditEventPage />,
                action: submitEventAction,
              }
            ]
          },
          {
            path: 'new',
            loader: checkAuthLoader,
            element: <NewEventPage />,
            action: submitEventAction,
          }
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: submitNewsletterSignup
      },
      {
        path: 'auth',
        element: <Authentication />,
        action: submitAuthForm
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
