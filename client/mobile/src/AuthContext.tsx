import React, { createContext, ReactNode, useContext, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface Auth {
  isLoggedIn: boolean;
  logUserIn: Function;
  logUserOut: Function;
}

export const AuthContext = createContext<Auth>({
	isLoggedIn: false,
	logUserIn: () => {},
	logUserOut: () => {},
});

export const AuthProvider = ({
	children,
	isLoggedIn: isLoggedInProp,
}: {
  children: ReactNode;
  isLoggedIn: boolean;
}) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isLoggedInProp);

	const logUserIn = async (token: string) => {
		try {
			await AsyncStorage.setItem('isLoggedIn', 'true');
			await AsyncStorage.setItem('jwt', token);
			setIsLoggedIn(true);
		} catch (e) {
			console.error(e);
		}
	};
	const logUserOut = async () => {
		try {
			await AsyncStorage.setItem('isLoggedIn', 'false');
			setIsLoggedIn(false);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useIsLoggedIn = () => {
	const { isLoggedIn } = useContext(AuthContext);
	return isLoggedIn;
};

export const useLogUserIn = () => {
	const { logUserIn } = useContext(AuthContext);
	return logUserIn;
};

export const useLogUserOut = () => {
	const { logUserOut } = useContext(AuthContext);
	return logUserOut;
};
