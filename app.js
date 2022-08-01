const express = require("express");
const cors = require("cors");
const route = require("./routes/app-route");

const PORT = process.env.PORT || 3000;

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use('/api', route);

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
})