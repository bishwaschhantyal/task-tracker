import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthSuccessPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setIsLogin } = useAuth();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const token = params.get("token");

		if (token) {
			localStorage.setItem("token", token);
			setIsLogin(true);
			navigate("/");
		} else {
			navigate("/login");
		}
	}, [location.search]);

	return <p>Logging you in...</p>;
};

export default AuthSuccessPage;
