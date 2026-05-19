import  {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppShell from "./components/Layout/AppShell";
import DashboardPage from "./features/dashboard/pages/DashboardPage";

const router = createBrowserRouter(

    [{
        element:<AppShell />,
        children: [
            {path: "/", element: <DashboardPage/>},
            
        ]

    }]
)

export default function AppRouter(){
    return <RouterProvider router={router} />;
}