interface SeedDate {
	entries: SeedEntry[];
}

interface SeedEntry {
	description: string;
	createdAt: number;
	status: string;
}

export const seedData: SeedDate = {
	entries: [
		{
			description:
				'Voluptate commodo labore excepteur ut aliqua pariatur minim do in nisi ad velit elit mollit.',
			createdAt: Date.now(),
			status: 'pending',
		},
		{
			description:
				'Sunt aute voluptate pariatur ex in mollit laboris in adipisicing magna dolore excepteur laboris.',
			createdAt: Date.now() - 1000000,
			status: 'inProgress',
		},
		{
			description: 'Excepteur nulla et eiusmod ex ipsum eu.',
			createdAt: Date.now() - 1100000,
			status: 'finished',
		},
	],
};
