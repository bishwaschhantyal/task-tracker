import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [isLogin, setIsLogin] = useState(() => {
		const token = localStorage.getItem("token");

		if (token) return true;
		else return false;
	});

	return (
		<AuthContext.Provider value={{ isLogin, setIsLogin }}>
			{children}
		</AuthContext.Provider>
	);
};
