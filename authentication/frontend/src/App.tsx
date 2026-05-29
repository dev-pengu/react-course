import {createBrowserRouter, RouterProvider, type ActionFunctionArgs, type LoaderFunctionArgs} from "react-router-dom";

import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import EventsRootLayout from './pages/EventsRoot';
import NewsletterPage from "./pages/Newsletter";
import { submitNewsletterSignup, submitAuthForm, logoutAction } from "./pages/actions";
import { tokenLoader, checkAuthLoader } from "./util/auth";
import ErrorPage from "./pages/Error";
import Authentication from "./pages/Authentication";
import { lazy, Suspense } from "react";

const EventsPage = lazy(() => import("./pages/Events"));
const EventDetailPage = lazy(() => import("./pages/EventDetail"));
const NewEventPage = lazy(() => import("./pages/NewEvent"));
const EditEventPage = lazy(() => import("./pages/EditEvent"));

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
            element: <Suspense fallback={<p>Loading...</p>}><EventsPage /></Suspense>,
            loader: () => import("./pages/loaders").then(module => module.eventsLoader()),
          },
          {
            path: ':eventId',
            loader: (args: LoaderFunctionArgs) => import("./pages/loaders").then(module => module.eventsDetailLoader(args)),
            id: "event-detail",
            children: [
              {
                index: true,
                element: <Suspense fallback={<p>Loading...</p>}><EventDetailPage /></Suspense>,
                action: (args: ActionFunctionArgs) => import("./pages/actions").then(module => module.submitDeleteEventAction(args)),
              },
              {
                path: 'edit',
                loader: checkAuthLoader,
                element: <Suspense fallback={<p>Loading...</p>}><EditEventPage /></Suspense>,
                action: (args: ActionFunctionArgs) => import("./pages/actions").then(module => module.submitEventAction(args)),
              }
            ]
          },
          {
            path: 'new',
            loader: checkAuthLoader,
            element: <Suspense fallback={<p>Loading...</p>}><NewEventPage /></Suspense>,
            action: (args: ActionFunctionArgs) => import("./pages/actions").then(module => module.submitEventAction(args)),
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
