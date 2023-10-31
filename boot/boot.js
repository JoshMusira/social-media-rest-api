import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

export const startServer = (app) => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running ...`);
        })
    } catch (error) {
        console.log(error);
    }
}