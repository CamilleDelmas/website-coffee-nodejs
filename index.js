// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------

import express from 'express';
import 'dotenv/config';
import router from './app/router.js';

import path from "path";
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// PARAMÉTRAGES EXPRESS / EJS
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));
app.use(express.static(path.join(__dirname, "public")))

// ---------------------------------------------------------------------------
// ROUTAGE
// ---------------------------------------------------------------------------

app.use(router);

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: "Page non trouvée", css: "product"});
});

// ---------------------------------------------------------------------------
// DÉMARRAGE SERVEUR
// ---------------------------------------------------------------------------

app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
})