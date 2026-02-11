import client from "./db_client.js";

const dataMapper = {
  findAllCoffees: async () => {
    // Je crée ma requete SQL sous forme de chaine de caractère
    let sql = "";
    // Je déclenche la requete SQL (variable "sql") grâce à la fonction
    // "query", fournie par le module "pg" (db_client.js) qui permet
    // d'établir la connexion à la sBDD.
    const result = await client.query(sql);
    // "result" contient la réponse de la promesse (await)
    // Les lignes de résultat de la BDD sont contenus dans la variable "rows"
    // de l'objet "result".
    return result.rows;
  }
};

export default dataMapper;