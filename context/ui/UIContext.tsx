import { Context, createContext } from 'react';

interface ContextProps {
	sidemenuOpen: boolean;
	isAddingEntry: boolean;
	openSideMenu: () => void;
	closeSideMenu: () => void;
	setAddingMenu: (isAdding: boolean) => void;
}

export const UIContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
