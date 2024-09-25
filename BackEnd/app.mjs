import express from "express";
import cors from "cors";

const port = 3172;
const app = express();

//Lecture des documents json
app.use(express.json());

var corsOptions = {
  origin: `http://localhost:5173`,
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Api REST trouvé");
});

import { EmailRouter } from "./Routes/Send-email.mjs";
app.use("/api/emails", EmailRouter);


// Si aucune route ne correspondant à l'URL demandée par le consommateur
app.use(({ req, res }) => {
  const message =
    "Impossible de trouver la ressource demandée, veuillez réesayer";
  res.status(404).json({ msg: message });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
