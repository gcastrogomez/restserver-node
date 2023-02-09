import mongoose from "mongoose";


const dbConnection = async() => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_CNN), {}
        console.log('Base de datos online');
    } catch (error) {
        throw new Error('Error al inciar la base de datos');
    }
}

export default dbConnection;