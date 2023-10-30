import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);

        console.log(chalk.cyan(`MongoDB Connected: ${conn.connection.host}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;
