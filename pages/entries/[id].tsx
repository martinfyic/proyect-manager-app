import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import {
	Button,
	capitalize,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { dbEntries } from '@/database';
import { Layout } from '@/components/layouts';
import { Entry, EntryStatus } from '@/interfaces';
import { EntriesContext } from '@/context';
import { dateFunction } from '@/utils';

const validStatus: EntryStatus[] = ['pending', 'inProgress', 'finished'];

interface Props {
	entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
	const { updateEntry, deletEntry } = useContext(EntriesContext);
	const [inputValue, setInputValue] = useState(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [touched, setTouched] = useState(false);
	const router = useRouter();

	const isNotValid = useMemo(
		() => inputValue.length <= 0 && touched,
		[inputValue, touched]
	);

	const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setStatus(event.target.value as EntryStatus);
	};

	const onSave = () => {
		if (inputValue.trim().length === 0) return;

		const updatedEntry: Entry = {
			...entry,
			description: inputValue,
			status,
		};

		updateEntry(updatedEntry, true);
	};

	const onDelete = () => {
		deletEntry(entry);
		router.push(`/`);
	};

	return (
		<Layout title={inputValue.substring(0, 15) + '...'}>
			<Grid
				container
				justifyContent='center'
				sx={{ marginTop: 2 }}
			>
				<Grid
					item
					xs={12}
					sm={8}
					md={6}
				>
					<Card>
						<CardHeader
							title='Entry'
							subheader={`Created: ${dateFunction.getFormatDistanceToNow(
								entry.createdAt
							)}`}
						/>
						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder='New entry'
								autoFocus
								multiline
								label='New entry'
								onBlur={() => setTouched(true)}
								value={inputValue}
								onChange={onInputValueChanged}
								helperText={isNotValid && 'Write an entry'}
								error={isNotValid}
							/>

							<FormControl>
								<FormLabel>Status:</FormLabel>
								<RadioGroup
									row
									value={status}
									onChange={onStatusChanged}
								>
									{validStatus.map(op => (
										<FormControlLabel
											key={op}
											value={op}
											control={<Radio />}
											label={capitalize(op)}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>

						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant='contained'
								fullWidth
								onClick={onSave}
								disabled={inputValue.length <= 0}
							>
								{' '}
								Save{' '}
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

			<IconButton
				onClick={onDelete}
				sx={{
					position: 'fixed',
					bottom: 30,
					right: 30,
					backgroundColor: 'red',
				}}
			>
				<DeleteOutlinedIcon />
			</IconButton>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };

	const entry = await dbEntries.getEntryById(id);

	if (!entry) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: { entry },
	};
};

export default EntryPage;
