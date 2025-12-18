import app from "./app.js";
import connectDB from "./database/mongoose.js";
const port = process.env.PORT || 3000;
// Connect to MongoDB
connectDB();    

// Start the server
app.listen(port, () => {
  console.log("Server running on port 3000");
});
