/* Local variables*/
require("dotenv").config();
//Dependecies
const colors = require("colors");
//App
const app = require("./server");
//local config
const port = process.env.PORT || 3000;
const startMessage = colors.green(`Start server from port: ${port}`);

//start server
app.listen(port, () => console.log(startMessage));
