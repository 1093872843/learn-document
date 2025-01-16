// server.js
require('module-alias/register');
const {app} = require("./server.js")
require("./control/fileHandler/file.js")
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});