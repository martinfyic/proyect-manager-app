import { Context, createContext } from 'react';

interface ContextProps {
	sidemenuOpen: boolean;
	isAddingEntry: boolean;
	isDragging: boolean;
	openSideMenu: () => void;
	closeSideMenu: () => void;
	setAddingMenu: (isAdding: boolean) => void;
	startDragging: () => void;
	endDragging: () => void;
}

export const UIContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
