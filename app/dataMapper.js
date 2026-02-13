import client from "./db_client.js";

const dataMapper = {
  findNewCoffees: async () => {
    let sql = `
    SELECT coffee.name, coffee.reference, coffee.id
    FROM coffee
    ORDER BY coffee.id DESC
    LIMIT 3`;
    const result = await client.query(sql);
    return result.rows;
  },

  findAllCoffees: async () => {
    // Je crée ma requete SQL sous forme de chaine de caractère
    let sql =
      "SELECT coffee.id, coffee.name, coffee.price_kg, coffee.reference, country.name AS country FROM coffee JOIN country ON coffee.country_id = country.id;";
    // Je déclenche la requete SQL (variable "sql") grâce à la fonction
    // "query", fournie par le module "pg" (db_client.js) qui permet
    // d'établir la connexion à la sBDD.
    const result = await client.query(sql);
    // "result" contient la réponse de la promesse (await)
    // Les lignes de résultat de la BDD sont contenus dans la variable "rows"
    // de l'objet "result".
    return result.rows;
  },

  findOneCoffee: async (coffeeId) => {
    let sql = `
    SELECT coffee.*, country.name AS country, ARRAY_AGG(feature.name) AS features
    FROM coffee
    JOIN country ON coffee.country_id = country.id
    JOIN coffee_feature ON coffee_feature.coffee_id = coffee.id
    JOIN feature ON feature.id = coffee_feature.feature_id
    WHERE coffee.id = ${coffeeId}
    GROUP BY coffee.id, country.name;
`;
    const result = await client.query(sql);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  },

  findAllCountries: async () => {
    let sql = "SELECT * FROM country";
    const result = await client.query(sql);
    return result.rows;
  },

  findAllFeatures: async () => {
    let sql = "SELECT * FROM feature";
    const result = await client.query(sql);
    return result.rows;
  },

  findNumberCoffee: async () => {
    let sql = "SELECT COUNT(id) AS nb_coffee FROM coffee"
    const result = await client.query(sql);
    return result.rows[0];
  },

  addCoffee: async (
    id, 
    name,
    reference,
    text,
    price,
    stock,
    country,
  ) => {
    let sql = `
    INSERT INTO coffee
    ("id", "reference", "name", "text", "price_kg", "stock", "country_id")
    VALUES
    (${id}, '${reference}', '${name}', '${text}', '${price}', '${stock}', '${country}');`;
    const result = await client.query(sql);
    return result.rowCount;
  },

  findLastCoffee: async () => {
    let sql = `
    SELECT coffee.id
    FROM coffee
    ORDER BY coffee.id DESC
    LIMIT 1;`;
    const result = await client.query(sql);
    return result.rows[0];
  },
  
  addCoffeeFeature: async (idCo, features) => {
    for (const feature of features) {
    let sql = `
    INSERT INTO coffee_feature
    ("coffee_id", "feature_id")
    VALUES
    (${idCo}, ${feature});
    `;
    await client.query(sql)

    }
  }
};

export default dataMapper;