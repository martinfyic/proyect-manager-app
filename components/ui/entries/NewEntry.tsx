import { useState, ChangeEvent, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext, UIContext } from '@/context';

export const NewEntry = () => {
	const [inputValue, setInputValue] = useState('');
	const [touched, setTouched] = useState(false);
	const { addNewEntry } = useContext(EntriesContext);
	const { isAddingEntry, setAddingMenu } = useContext(UIContext);

	const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const onSave = () => {
		if (inputValue.length === 0) return;

		addNewEntry(inputValue);
		setAddingMenu(false);
		setTouched(false);
		setInputValue('');
	};

	const onCancel = () => {
		setAddingMenu(false);
		setTouched(false);
		setInputValue('');
	};

	return (
		<Box sx={{ marginBottom: 2, paddingX: 2 }}>
			{isAddingEntry ? (
				<>
					<TextField
						fullWidth
						sx={{ marginTop: 1, marginBottom: 2 }}
						autoFocus
						multiline
						label='New Entry'
						helperText={inputValue.length === 0 && touched && 'Enter a value'}
						error={inputValue.length === 0 && touched}
						value={inputValue}
						onChange={onTextFieldChanges}
						onBlur={() => setTouched(true)}
					/>
					<Box
						display='flex'
						justifyContent='space-around'
						sx={{ marginBottom: 2 }}
					>
						<Button onClick={onCancel}>Cancel</Button>

						<Button
							variant='outlined'
							color='secondary'
							endIcon={<SaveAltOutlinedIcon />}
							onClick={onSave}
						>
							Save
						</Button>
					</Box>
				</>
			) : (
				<Button
					startIcon={<AddCircleOutlineOutlinedIcon />}
					fullWidth
					variant='outlined'
					onClick={() => setAddingMenu(true)}
				>
					Add Entry
				</Button>
			)}
		</Box>
	);
};
