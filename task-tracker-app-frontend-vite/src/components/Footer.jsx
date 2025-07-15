const Footer = () => {
	return (
		<footer className="dark:bg-gray-800 dark:border-gray-700 dark:text-white border-t border-gray-300 p-4 ">
			<div className="container mx-auto text-center">
				<p> © {new Date().getFullYear()} Task Tracker. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
