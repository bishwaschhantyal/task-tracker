import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="w-full h-screen flex flex-col font-poppins">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;
