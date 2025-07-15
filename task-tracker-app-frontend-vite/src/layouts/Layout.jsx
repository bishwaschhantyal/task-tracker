import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="w-full h-screen flex flex-col font-poppins dark:bg-gray-800">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;
