import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../api/auth";

const Header = () => {
	const { isLogin, setIsLogin } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logoutUser();
			localStorage.removeItem("token");
			setIsLogin((prev) => !prev);
			navigate("/login");
		} catch (error) {
			console.error("Logout failed");
		}
	};

	return (
		<header className="bg-gray-800 text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">Task Tracker</h1>
				<nav>
					<ul className="flex space-x-4 list-none">
						<NavLink to={"/"}>Home</NavLink>
						<li>DashBoard</li>
					</ul>
				</nav>
				{isLogin ? (
					<button
						onClick={handleLogout}
						className="bg-red-500 px-4 py-1 rounded-md cursor-pointer">
						Logout
					</button>
				) : (
					<NavLink
						to={"/login"}
						className="bg-red-500 px-4 py-1 rounded-md cursor-pointer">
						Login
					</NavLink>
				)}
			</div>
		</header>
	);
};

export default Header;
