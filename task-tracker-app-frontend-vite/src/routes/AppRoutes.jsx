import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import App from "../App";
import Layout from "../layouts/Layout";
import LoginForm from "../pages/Login";
import RegisterForm from "../pages/Register";
import ProtectRoute from "./ProtectRoute";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Layout />}>
			<Route
				index
				element={<App />}
			/>
			<Route
				path="/login"
				element={<LoginForm />}
			/>
			<Route
				path="/signup"
				element={<RegisterForm />}
			/>
		</Route>
	)
);
