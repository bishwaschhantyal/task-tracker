import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
	const { isLogin } = useAuth();

	if (!isLogin)
		return (
			<Navigate
				to="/login"
				replace
			/>
		);

	return children;
};

export default ProtectRoute;
