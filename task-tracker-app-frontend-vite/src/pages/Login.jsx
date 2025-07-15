import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { loginUser, googleLogin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Error from "../components/Error";

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [serverError, setServerError] = useState("");

	const navigate = useNavigate();
	const { setIsLogin } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		setServerError("");

		try {
			const response = await loginUser(data);
			if (response.token) {
				localStorage.setItem("token", response.token);

				setIsLogin((prev) => !prev);

				navigate("/");
			} else {
				setServerError(response.error || "Login Failed");
			}
		} catch (error) {
			setServerError(error.error || "Login error occurred");
		}
	};

	return (
		<div className="flex items-center justify-center flex-grow">
			<Error message={serverError} />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="dark:bg-gray-800 dark:text-white p-8 rounded-xl shadow-xl w-full max-w-md border dark:border-gray-600 border-gray-100">
				<h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

				<div className="mb-4">
					<label
						htmlFor="email"
						className="block mb-1 font-medium">
						Email
					</label>
					<input
						id="email"
						type="email"
						autoComplete="email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
								message: "Invalid email address",
							},
						})}
						className={`w-full p-3 rounded-lg border  outline-none ${
							errors.email
								? "border-red-500"
								: "dark:border-gray-300 border-gray-400"
						}`}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
					)}
				</div>

				<div className="mb-6">
					<label
						htmlFor="password"
						className="block mb-1 font-medium">
						Password
					</label>
					<input
						id="password"
						type={`${showPassword ? "text" : "password"}`}
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters",
							},
						})}
						className={`w-full p-3 rounded-lg border outline-none ${
							errors.password
								? "border-red-500"
								: "dark:border-gray-300 border-gray-400"
						}`}
					/>
					{errors.password && (
						<p className="text-red-500 text-sm mt-1">
							{errors.password.message}
						</p>
					)}
					<div className="flex items-center justify-between mt-4">
						<div className="flex items-center gap-1">
							<input
								type="checkbox"
								name="passwordVisibility"
								id="passwordVisibility"
								onChange={() => setShowPassword(!showPassword)}
								className="h-4 w-4 text-green-600 focus:ring-green-500 dark:border-gray-300 rounded"
							/>

							<label
								htmlFor="passwordVisibility"
								className="text-sm dark:text-gray-300">
								show password
							</label>
						</div>

						<NavLink
							to={"/signup"}
							className="hover:underline">
							Don't have account?
						</NavLink>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg cursor-pointer transition">
					Login
				</button>

				<div className="flex items-center my-6">
					<hr className="flex-grow border-t dark:border-gray-300 border-gray-400" />
					<span className="mx-4 text-gray-500">OR</span>
					<hr className="flex-grow border-t dark:border-gray-300 border-gray-400" />
				</div>

				<div className="mt-4">
					<button
						type="button"
						className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg py-3 shadow-sm hover:shadow-md transition"
						onClick={() => {
							// You can trigger Google login here
							console.log("Google Login Triggered");
							googleLogin();
						}}>
						<FcGoogle className="text-xl mr-2" />
						<span className="text-gray-700 font-medium">
							Continue with Google
						</span>
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
