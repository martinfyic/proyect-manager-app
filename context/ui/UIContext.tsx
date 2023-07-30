import { Context, createContext } from 'react';

interface ContextProps {
	sidemenuOpen: boolean;
}

export const UIContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
