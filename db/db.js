import mongoose from "mongoose";
import 'dotenv/config'
import chalk from "chalk";
const  url=process.env.MONGODB_URL
   
const  connectToDb=async()=>{
    try {
        await mongoose.connect(url, {dbName:"ecommerce"})
        console.log(chalk.green("Connected to MongoDB"))
        } catch (error) {
            console.log(chalk.red("Error connecting to MongoDB"))
        }

}
export default connectToDb;

