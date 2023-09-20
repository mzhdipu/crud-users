import { createBrowserRouter } from "react-router-dom";
import Home from "../../Components/Home/Home";
import Addusers from "../../Components/Addusers/Addusers";
import Update from "../../Components/Home/Update";

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
    },
    {
        path: '/users/:id',
        element: <Update></Update>,
        loader: ({params}) => {
            return fetch(`http://localhost:5000/users/${params.id}`)
        }
    }
    
])