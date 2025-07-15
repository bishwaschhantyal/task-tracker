// src/contexts/ThemeContext.js
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [themeMode, setThemeMode] = useState(() => {
		// Load from localStorage or default to "light"
		return localStorage.getItem("themeMode") || "light";
	});

	useEffect(() => {
		const html = document.documentElement;
		html.classList.remove("light", "dark");
		html.classList.add(themeMode);
		localStorage.setItem("themeMode", themeMode);
	}, [themeMode]);

	const toggleTheme = () => {
		setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
	};

	return (
		<ThemeContext.Provider value={{ themeMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
