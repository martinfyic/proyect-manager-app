import { Context, createContext } from 'react';

interface ContextProps {
	sidemenuOpen: boolean;
	openSideMenu: () => void;
	closeSideMenu: () => void;
}

export const UIContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
