const Header = () => {
	return (
		<header className="bg-gray-800 text-white p-4 shadow-md">
			<div className="container mx mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">Task Tracker</h1>
				<nav>
					<ul className="flex space-x-4 list-none">
						<li>Home </li>
						<li>DashBoard</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
