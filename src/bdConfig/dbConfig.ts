import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB Connected Successfully...!")
        });
        connection.on("error", (err) => {
            console.log("MongoDB Connection Error: \n" + err);
            process.exit();
            
        });
    } catch (error) {
        console.log("The Error is here: \n", error);

        
    }
}