import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
	sidemenuOpen: boolean;
	isAddingEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
	sidemenuOpen: false,
	isAddingEntry: false,
};

interface Props {
	children?: ReactNode;
}

export const UIProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const openSideMenu = () => {
		dispatch({ type: 'UI - Open Sidebar' });
	};

	const closeSideMenu = () => {
		dispatch({ type: 'UI - Close Sidebar' });
	};

	const setAddingMenu = (isAdding: boolean) => {
		dispatch({ type: 'UI - Set Add menu', payload: isAdding });
	};

	return (
		<UIContext.Provider
			value={{
				...state,
				openSideMenu,
				closeSideMenu,
				setAddingMenu,
			}}
		>
			{children}
		</UIContext.Provider>
	);
};
