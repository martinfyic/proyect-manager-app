import { ChangeEvent, useState, useMemo, FC } from 'react';
import { GetServerSideProps } from 'next';
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

const validStatus: EntryStatus[] = ['pending', 'inProgress', 'finished'];

interface Props {
	entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
	const [inputValue, setInputValue] = useState(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [touched, setTouched] = useState(false);

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
		console.log({ inputValue, status });
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
							subheader={`Creada hace: ${entry.createdAt} minutos`}
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
