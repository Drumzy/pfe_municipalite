import { Navigate,useLocation,  } from "react-router-dom"

export function PrivateRoute({children}: {children: JSX.Element}) {
    let retrievedUser = localStorage.getItem('user');
    const user = JSON.parse(retrievedUser!);
    const location = useLocation();
    if(!user){
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    return children;
}

export default PrivateRoute;