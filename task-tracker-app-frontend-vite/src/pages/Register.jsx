import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Error from "../components/Error";

const RegisterForm = () => {
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
			const response = await registerUser(data);

			if (response.token) {
				console.log("Login successful:", response);
				localStorage.setItem("token", response.token);
				setIsLogin((prev) => !prev);

				navigate("/");
			} else {
				setServerError(response.error || "Registeration failed");
			}
		} catch (error) {
			setServerError(error.error || "Registeration error occurred");
		}
	};

	return (
		<div className="flex items-center justify-center flex-grow bg-gray-100">
			<Error message={serverError} />

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-gray-800 text-white p-8 rounded-xl shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block mb-1 font-medium">
						Name
					</label>
					<input
						id="name"
						autoComplete="name"
						type="text"
						{...register("name", {
							required: "Name is required",
							minLength: {
								value: 2,
								message: "Name must be at least 2 characters",
							},
						})}
						className={`w-full p-3 rounded-lg border outline-none ${
							errors.name ? "border-red-500" : "border-gray-300"
						}`}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block mb-1 font-medium">
						Email
					</label>
					<input
						id="email"
						autoComplete="email"
						type="email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
								message: "Invalid email address",
							},
						})}
						className={`w-full p-3 rounded-lg border outline-none ${
							errors.email ? "border-red-500" : "border-gray-300"
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
						autoComplete="password"
						type={`${showPassword ? "text" : "password"}`}
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters",
							},
						})}
						className={`w-full p-3 rounded-lg border outline-none ${
							errors.password ? "border-red-500" : "border-gray-300"
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
								className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
							/>

							<label
								htmlFor="passwordVisibility"
								className="text-sm text-gray-300">
								show password
							</label>
						</div>

						<NavLink
							to={"/login"}
							className="hover:underline">
							Already have account?
						</NavLink>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg cursor-pointer transition">
					Register
				</button>

				<div className="flex items-center my-6">
					<hr className="flex-grow border-t border-gray-300" />
					<span className="mx-4 text-gray-500">OR</span>
					<hr className="flex-grow border-t border-gray-300" />
				</div>

				<div className="mt-4">
					<button
						type="button"
						className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg py-3 shadow-sm hover:shadow-md transition"
						onClick={() => {
							// You can trigger Google login here
							console.log("Google Login Triggered");
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

export default RegisterForm;
