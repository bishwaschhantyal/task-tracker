import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../api/auth";
import { useTheme } from "../contexts/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

const Header = () => {
	const { isLogin, setIsLogin } = useAuth();
	const navigate = useNavigate();
	const { themeMode, toggleTheme } = useTheme();

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
		<header className="dark:bg-gray-800 dark:text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">Task Tracker</h1>
				<nav>
					<ul className="flex space-x-4 list-none">
						<NavLink to={"/"}>Home</NavLink>
						<li>DashBoard</li>
					</ul>
				</nav>
				<div className="flex items-center gap-2 cursor-pointer">
					<button
						onClick={toggleTheme}
						className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
						aria-label="Toggle Theme">
						{themeMode === "light" ? (
							<HiSun className="text-orange-500 size-6" />
						) : (
							<HiMoon className="text-blue-400 size-6" />
						)}
					</button>

					{isLogin ? (
						<button
							onClick={handleLogout}
							className="bg-red-500 px-4 py-1 rounded-md cursor-pointer text-white">
							Logout
						</button>
					) : (
						<NavLink
							to={"/login"}
							className="bg-red-500 px-4 py-1 rounded-md cursor-pointer text-white">
							Login
						</NavLink>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
