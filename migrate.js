import pg from 'pg';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // ─── Suppression des tables (dans l'ordre des dépendances) ───────────────
    await client.query(`DROP TABLE IF EXISTS "coffee_feature"`);
    await client.query(`DROP TABLE IF EXISTS "coffee"`);
    await client.query(`DROP TABLE IF EXISTS "feature"`);
    await client.query(`DROP TABLE IF EXISTS "country"`);
    console.log('✔ Tables existantes supprimées');

    // ─── Création des tables ─────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS "country" (
        "id"   SERIAL       NOT NULL PRIMARY KEY,
        "name" VARCHAR(128) NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "coffee" (
        "id"         SERIAL       NOT NULL PRIMARY KEY,
        "reference"  INT          NOT NULL,
        "name"       VARCHAR(128) NOT NULL,
        "text"       TEXT,
        "price_kg"   NUMERIC      NOT NULL DEFAULT 0,
        "stock"      BOOLEAN,
        "country_id" INT REFERENCES "country"("id")
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "feature" (
        "id"   SERIAL       NOT NULL PRIMARY KEY,
        "name" VARCHAR(128) NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "coffee_feature" (
        "id"         SERIAL PRIMARY KEY,
        "coffee_id"  INT REFERENCES "coffee"("id"),
        "feature_id" INT REFERENCES "feature"("id"),
        UNIQUE ("coffee_id", "feature_id")
      )
    `);
    console.log('✔ Tables créées');

    // ─── Insertion des pays ──────────────────────────────────────────────────
    await client.query(`
      INSERT INTO "country" ("id", "name") VALUES
        (1,  'Italie'),
        (2,  'Colombie'),
        (3,  'Éthiopie'),
        (4,  'Brésil'),
        (5,  'Guatemala'),
        (6,  'Kenya'),
        (7,  'Indonésie'),
        (8,  'Costa Rica'),
        (9,  'Vietnam'),
        (10, 'Tanzanie'),
        (11, 'Jamaïque'),
        (12, 'Rwanda'),
        (13, 'Panama'),
        (14, 'Pérou'),
        (15, 'Hawaï'),
        (16, 'Nicaragua')
    `);
    console.log('✔ Pays insérés');

    // ─── Insertion des cafés ─────────────────────────────────────────────────
    await client.query(`
      INSERT INTO "coffee" ("reference", "name", "text", "price_kg", "stock", "country_id") VALUES
        (100955890, 'Espresso',                'Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.',        20.99, TRUE,  1),
        (100955894, 'Columbian',               'Café moyennement corsé avec une acidité vive et une saveur riche.',                                           18.75, TRUE,  2),
        (105589090, 'Ethiopian Yirgacheffe',   'Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.',                            22.50, TRUE,  3),
        (134009550, 'Brazilian Santos',        'Café doux et lisse avec un profil de saveur de noisette.',                                                    17.80, TRUE,  4),
        (256505890, 'Guatemalan Antigua',      'Café corsé avec des nuances chocolatées et une pointe d''épice.',                                             21.25, TRUE,  5),
        (295432730, 'Kenyan AA',               'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.',                              23.70, TRUE,  6),
        (302932754, 'Sumatra Mandheling',      'Café profond et terreux avec un corps lourd et une faible acidité.',                                          19.95, TRUE,  7),
        (327302954, 'Costa Rican Tarrazu',     'Café vif et net avec une finition propre et une acidité vive.',                                               24.50, TRUE,  8),
        (549549090, 'Vietnamese Robusta',      'Café audacieux et fort avec une saveur robuste distinctive.',                                                 16.75, TRUE,  9),
        (582954954, 'Tanzanian Peaberry',      'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.',                                  26.80, TRUE,  10),
        (589100954, 'Jamaican Blue Mountain',  'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.',                                  39.25, TRUE,  11),
        (650753915, 'Rwandan Bourbon',         'Café avec des notes florales prononcées, une acidité vive et un corps moyen.',                                21.90, TRUE,  12),
        (795501340, 'Panamanian Geisha',       'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.',            42.00, TRUE,  13),
        (954589100, 'Peruvian Arabica',        'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.',                        19.40, FALSE, 14),
        (958090105, 'Hawaiian Kona',           'Café rare au goût riche, une acidité douce et des nuances subtiles.',                                         55.75, FALSE, 15),
        (691550753, 'Nicaraguan Maragogipe',   'Café avec des notes de fruits, une acidité vive et un corps plein.',                                          28.60, FALSE, 16)
    `);
    console.log('✔ Cafés insérés');

    // ─── Insertion des caractéristiques ──────────────────────────────────────
    await client.query(`
      INSERT INTO "feature" ("id", "name") VALUES
        (1, 'Corsé'),
        (2, 'Fruité'),
        (3, 'Chocolaté'),
        (4, 'Doux'),
        (5, 'Épicé'),
        (6, 'Acide')
    `);
    console.log('✔ Caractéristiques insérées');

    // ─── Insertion des associations café ↔ caractéristique ───────────────────
    await client.query(`
      INSERT INTO "coffee_feature" ("coffee_id", "feature_id") VALUES
        (1,  1), (1,  5),
        (2,  6),
        (3,  2), (3,  4),
        (4,  4),
        (5,  1),
        (6,  4), (6,  6),
        (7,  1),
        (8,  6),
        (9,  5),
        (10, 1), (10, 2),
        (11, 4),
        (12, 2),
        (13, 2),
        (14, 1), (14, 3),
        (15, 4),
        (16, 1), (16, 2)
    `);
    console.log('✔ Associations café/caractéristiques insérées');

    await client.query('COMMIT');
    console.log('\n✅ Migration terminée avec succès !');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Erreur durant la migration, rollback effectué :', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();