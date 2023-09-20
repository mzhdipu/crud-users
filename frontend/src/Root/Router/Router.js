import { createBrowserRouter } from "react-router-dom";
import Home from "../../Components/Home/Home";
import Addusers from "../../Components/Addusers/Addusers";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        loader: ()=> {
            return fetch(`http://localhost:5000/users`)
        }
    },

    {
        path: '/add',
        element: <Addusers></Addusers>
    }
    
])