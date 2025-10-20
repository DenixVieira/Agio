import { Navigate, useRoutes } from "react-router-dom";

export const Routes = () => {
	const routes = [
		// {
		// 	path: "/",
		// 	element: <Inicio />,
		// },
		// {
		// 	path: "/home",
		// 	element: <PrivateRoute element={<Home />} />,
		// },
	];
	let router = useRoutes(routes);
	return router;
};