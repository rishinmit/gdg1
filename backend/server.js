import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import session from 'express-session';
import mongoose from 'mongoose';
import userRouter from "./routes/userRoute.js";
import eventRouter from "./routes/eventRoute.js";
import User from './models/userModel.js';
import bcrypt from 'bcrypt';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(bodyParser.json());

const PORT = process.env.PORT;
const URI = process.env.URI;

mongoose.connect(URI)
    .then(() => {
        console.log(`MongoDB connected`);
        // createAdminUser(); // Use this function to create admin accounts manually
    })
    .catch((error) => {
        console.error(`Error`, error);
    });

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get("/", (req, res) => {
    res.send(`Server established`);
});

app.use(userRouter);
app.use(eventRouter);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});

// Function to create an admin user
const createAdminUser = async () => {
    const adminUser = {
        name: 'Rishi Raj',
        phone: '1234567890',
        email: 'admin@example.com',
        username: 'admin',
        password: await bcrypt.hash('1234', 10),
        isAdmin: true,
    };

    const existUser = await User.findOne({ username: adminUser.username });
    if (!existUser) {
        await User.create(adminUser);
        console.log('Admin user created');
    } else {
        console.log('Admin user already exists');
    }
};

// you can use this function to manually create an admin, after updating the project, we dont need this anymoree
// createAdminUser();
