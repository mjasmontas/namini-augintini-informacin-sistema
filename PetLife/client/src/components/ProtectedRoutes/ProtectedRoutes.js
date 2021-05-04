import React from 'react';
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../Services/auth.service";

const ProtectedRoutes = ({component: Component, ...rest}) => (
	<Route {...rest} render={props => (
		AuthService.getCurrentUser() ? (
			<Component {...props} />
		) : (
			<Redirect to="/login" />
		)
	)} {...rest} />
);

export default ProtectedRoutes;
