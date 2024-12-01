import Home from "../pages/Home/Home";
import AddRecord from "../pages/AddRecord/AddRecord";
import About from "../components/About/About";
import Edit from "../pages/Edit/Edit";
const appRoutes = [
  { path: "/", element: <Home /> },
  { path: "/Add", element: <AddRecord /> },
  { path: "/Edit/:id", element: <Edit /> },
  { path: "/About", element: <About /> },
  { path: "*", element: <> Not Found </> },
];
export default appRoutes;
