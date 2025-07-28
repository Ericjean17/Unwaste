import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    // If the user has a token, let them go to the child route (Outlet -> ingredients page)
    // Otherwise, go back to the login page
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;