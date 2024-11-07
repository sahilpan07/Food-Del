import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import contactRouter from "./routes/contactRoute.js"
import categoryRouter from "./routes/categoryRoute.js"
import restaurantRouter from "./routes/restaurantRoute.js"
import restaurantRegistrationRoute from "./routes/restaurantRegistrationRoute.js"

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDb();

//api endpoint
//for foodRoute
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/images", express.static("uploads/categories"));
app.use("/images", express.static("uploads/restaurants"));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)

// Route to send email
app.use('/api/contact',contactRouter);
app.use('/api/registration',restaurantRegistrationRoute);

app.use("/api/categories", categoryRouter);
app.use("/api/restaurants", restaurantRouter); 
app.get('/',(req, res)=>{
    res.send("Hello Wold")
})

//express server
app.listen(port,()=>{
    console.log(`Server is Running on http://localhost:${port}`)
})


//mongoose