import { createBrowserRouter } from "react-router-dom";
import Browse from "./pages/Browse";
import Login from "./pages/Login";
import Builder from "./pages/Builder";
import { RouterProvider } from "react-router-dom";
function Body() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/make-cv",
      element: <Builder />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default Body;
