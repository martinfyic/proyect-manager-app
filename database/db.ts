import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongooConnection = {
	isConnected: 0,
};

export const connect = async () => {
	if (mongooConnection.isConnected) {
		console.log('You are already connected');
		return;
	}

	if (mongoose.connections.length > 0) {
		mongooConnection.isConnected = mongoose.connections[0].readyState;

		if (mongooConnection.isConnected === 1) {
			console.log('Using previous connection');
			return;
		}
		await disconnect();
	}

	await mongoose.connect(process.env.MONGO_URL_DEV || '');
	mongooConnection.isConnected = 1;
	console.log('Connect to database: ', process.env.MONGO_URL_DEV);
};

export const disconnect = async () => {
	if (process.env.NODE_ENV === 'development') return;

	if (mongooConnection.isConnected === 0) return;

	await mongoose.disconnect();
	console.log('Disconnected from mongoDB');
};
