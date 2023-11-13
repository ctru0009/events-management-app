/**
 * FIT2095 Assignment 1
 * @author Cong Chuong Truong
 * @author Tan Qian Qian
 * Routing table and instructions is in the README.md file.
 */

/**
 * Required modules for the application.
 */
const cors = require("cors");
const express = require("express");
const textToSpeech = require("@google-cloud/text-to-speech");
const { Translate } = require("@google-cloud/translate").v2; // imports the Google Cloud Translation library
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const categoryRouter = require("./backend/routes/category-router.js");
const categoryAPIRouter = require("./backend/routes/category-api-router.js");
const eventsRouter = require("./backend/routes/events-router.js");
const eventApiRouter = require("./backend/routes/event-api-router");
const crudCont = require("./backend/controllers/crud-controller");
const categoryCont = require("./backend/controllers/category-controller");
const eventCont = require("./backend/controllers/event-controller");

/**
 * Express application instance.
 * @type {express.Express}
 */
const app = express();

/**
 * HTTP server instance.
 * @type {http.Server}
 */
const server = require("http").createServer(app);

/**
 * Socket.io instance.
 * @type {SocketIO.Server}
 */

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
/**
 * The path to the views directory.
 * @const
 * @type {string}
 */
const VIEWS_PATH = path.join(__dirname, "views");

/**
 * Port number that the server will listen on.
 * @const
 * @type {number}
 */
const PORT = 8080;

/**
 * Instance of the Google Text-to-Speech client.
 * @const
 * @type {textToSpeech.TextToSpeechClient}
 */
const client = new textToSpeech.TextToSpeechClient();

/**
 * Middleware to serve static files from the specified directory.
 *
 */
app.use(express.static(path.join(__dirname, "/dist/assignment3")));

/**
 * Middleware to serve Bootstrap CSS from the node_modules directory.
 */
app.use(express.static("node_modules/bootstrap/dist/css"));

/**
 * Middleware to serve images from the images directory.
 */
app.use(express.static(path.join(__dirname, "images")));

/**
 * Middleware to parse incoming request bodies with URL-encoded data (for handling POST requests).
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware to log incoming requests to the server.
 * Uses the "tiny" format for logging.
 */
app.use(morgan("tiny"));

/**
 * Initialize the EJS engine for rendering HTML templates.
 */
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

/**
 * Middleware to parse JSON request bodies.
 */
app.use(express.json());

/**
 * Middleware to enable CORS.
 */
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

/**
 * MongoDB connection URL.
 * @const
 * @type {string}
 */
const url = "mongodb://127.0.0.1:27017/Assignment3";

/**
 * Connect to MongoDB using the specified URL.
 * @function
 * @async
 * @param {string} url - The MongoDB connection URL.
 * @returns {Promise} A Promise that resolves when the connection is successful.
 * @throws {Error} If an error occurs during the connection.
 */
async function connect(url) {
  await mongoose.connect(url); // connect to url // must have await cus asynchronous so must make function async
  return "Connected Successfully";
}

/**
 * Connect to MongoDB using the specified URL.
 * @function
 * @param {string} url - The MongoDB connection URL.
 * @returns {Promise} A Promise that resolves when the connection is successful.
 * @throws {Error} If an error occurs during the connection.
 */
connect(url)
  .then(console.log)
  .then(crudCont.initOpsCounter)
  .catch((err) => console.log(err)); // If an error occurs then catch it

/**
 * Handle requests to the "/" path.
 * Redirects to the index page.
 * @function
 * @description Handles requests to the root path server.
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.use("/", express.static(path.join(__dirname, "dist/assignment3")));

/**
 * Middleware to handle requests to the "/qian/api/v1" path.
 * @function
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.use("/qian/api/v1", eventApiRouter);

/**
 * Middleware to handle requests to the "/api/v1/category/32182988" path.
 * @function
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.use("/api/v1/category/32182988", categoryAPIRouter);

/**
 * Middleware to handle requests to the "/32182988" path.
 * @function
 * @description Handles requests to the 32182988 path server.
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.use("/32182988", categoryRouter);

/**
 * Middleware to handle requests to the "/qian" path.
 * @function
 * @description Handles requests to the qian path server.
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.use("/qian", eventsRouter);

app.get("/api/v1/category/32182988/audio/output.mp3", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/assets/audio/output.mp3"));
});


/**
 * Handle socket connections.
 */
app.get("*", (req, res) => {
  res.status(404);
});


/**
 * Handle socket connections.
 */
io.on("connection", (socket) => {
  console.log(`Client with id ${socket.id} connected`);

  socket.on("text-to-speech", (text) => {
    try {
      // Code taken from week 10 lecture
      // Construct the request
      const request = {
        input: { text: text },
        // Select the language and SSML Voice Gender (optional)
        voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
        // Select the type of audio encoding
        audioConfig: { audioEncoding: "MP3" },
      };

      const filePath = "./src/assets/audio/output.mp3";
      // Performs the Text-to-Speech request
      client.synthesizeSpeech(request, (err, response) => {
        if (err) {
          console.error("ERROR:", err);
          return;
        }
        // Write the binary audio content to a local file
        fs.writeFile(filePath, response.audioContent, "binary", (err) => {
          if (err) {
            console.error("ERROR:", err);
            return;
          }
          console.log("Audio content written to file: output.mp3");
        });
      });
      // Send the path to the Angular client
      console.log(filePath);
      io.emit("audio-source", "/api/v1/category/32182988/audio/output.mp3");
    } catch (error) {
      console.error("Error:", error);
    }
  });

  socket.on("translate", async ({ inputText, language }) => {
    try {
      // create an instance
      const translate = new Translate();

      // translate the text by passing in the text and the language
      let translation = await translate.translate(inputText, language); 

      // send the translated text to frontend
      socket.emit("translated", translation[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
/**
 * Handle requests to the unknown path.
 * Directs to the 404 page.
 * @function
 * @description Handles requests to the about path server.
 * @param {string} path - The path to the root directory.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.get("*", (req, res) => {
  res.status(404);
});

/**
 * Start the server on the specified port.
 * @function
 * @param {number} PORT - The port number to listen on.
 * @throws {Error} If an error occurs during the binding of the port.
 */
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
