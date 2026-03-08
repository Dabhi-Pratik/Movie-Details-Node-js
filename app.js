    import express from "express"
    import cors from "cors"
    import dotenv from "dotenv"
    import connectDb from "./config/db.js"
    import router from "./router/movieRouter.js"
    import HttpError from "./middleware/HttpError.js"

    dotenv.config({ path: "./env" })

    const app = express()

    app.use(cors())
    app.use(express.json());

    app.use("/movie", router);

    console.log(process.env.MONGO_URI);

    app.get("/", (req, res) => {
        res.status(200).json("hello from server");
    });

    // undefined routes

    app.use((req, res, next) => {
        next(new HttpError("requested route not found", 404));
    });

    app.use((error, req, res, next) => {
        if (res.headersSent) {
            next(error);
        }

        res
            .status(error.statusCode || 500)
            .json({ message: error.message || "internal server error" });
    });

    const port = process.env.PORT || 5000

   async function startServer() {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}


    startServer();
