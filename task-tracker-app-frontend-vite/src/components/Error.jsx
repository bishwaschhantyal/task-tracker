import React, { useEffect, useState } from "react";

const Error = ({ message }) => {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		if (message) {
			setVisible(true);
			const timer = setTimeout(() => setVisible(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [message]);
	return (
		<div
			className={`fixed top-0 left-center w-fit transform transition-transform duration-500 ease-in-out ${
				visible ? "translate-y-0 top-20" : "-translate-y-full"
			} px-6 py-3 text-sm text-red-600 bg-red-100 shadow-md text-center`}>
			{message}
		</div>
	);
};

export default Error;
