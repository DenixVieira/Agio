import { Navigate, useRoutes } from "react-router-dom";
import {ConsultarEstabelecimento} from "../pages/ConsultarEstabelecimento"
import { ConsultarCodigoDeBarra } from "../pages/ConsultarCodigoDeBarra";
import { ConsultarValorCombustivel } from "../pages/ConsultarValorCombustivel";

export const Routes = () => {
	const routes = [
		{
			path: "/",
			element: <ConsultarEstabelecimento/>,
		},
		{
			path: "/codigo-de-barras",
			element: <ConsultarCodigoDeBarra/>,
		},
		{
			path: "/valor-combustivel",
			element: <ConsultarValorCombustivel/>,
		},
		// {
		// 	path: "/home",
		// 	element: <PrivateRoute element={<Home />} />,
		// },
	];
	let router = useRoutes(routes);
	return router;
};