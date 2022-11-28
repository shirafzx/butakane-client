import { Navigate } from "react-router-dom"
import { getToken } from "./services/authorize"


const UserRoute = ({children})=>{

    if(!getToken()){
        return <Navigate to="/" replace/>
    }
    return children
        
}

export default UserRoute;