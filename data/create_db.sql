-- Suppression des tables si elles existent -- 
DROP TABLE IF EXISTS "coffee";
DROP TABLE IF EXISTS "country";
DROP TABLE IF EXISTS "feature";
DROP TABLE IF EXISTS "coffee_feature";

-- Création de la table "coffee" si elle n'existe pas --
CREATE TABLE IF NOT EXISTS "coffee" (
  "id" INT NOT NULL PRIMARY KEY,
  "reference" INT NOT NULL, 
  "name" VARCHAR(128) NOT NULL,
  "text" TEXT,
  "price_kg" NUMERIC NOT NULL DEFAULT 0,
  "stock" BOOLEAN,
  "country_id" INT REFERENCES "country"("id")
);

-- Insertion des données --
INSERT INTO "coffee" ("id", "reference", "name", "text", "price_kg", "stock", "country_id")
VALUES (1, 100955890, "Espresso", "Café fort et concentré préparé en faisant passer de l'eau chaude à travers du café finement moulu.", 20.99, TRUE, 1),
(2, 100955894, "Columbian", "Café moyennement corsé avec une acidité vive et une saveur riche.", 18.75, TRUE, 2),
(3, 105589090, "Ethiopian Yirgacheffe", "Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.", 22.50, TRUE, 3),
(4, 134009550, "Brazilian Santos", "Café doux et lisse avec un profil de saveur de noisette.", 17.80, TRUE, 4),
(5, 256505890, "Guatemalan Antigua", "Café corsé avec des nuances chocolatées et une pointe d'épice.", 21.25, TRUE, 5),
(6, 295432730, "Kenyan AA", "Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.", 23.70, TRUE, 6),
(7, 302932754, "Sumatra Mandheling", "Café profond et terreux avec un corps lourd et une faible acidité.", 19.95, TRUE, 7),
(8, 327302954, "Costa Rican Tarrazu", "Café vif et net avec une finition propre et une acidité vive.", 24.50, TRUE, 8),
(9, 549549090, "Vietnamese Robusta", "Café audacieux et fort avec une saveur robuste distinctive.", 16.75, TRUE, 9),
(10, 582954954, "Tanzanian Peaberry", "Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.", 26.80, TRUE, 10),
(11, 589100954, "Jamaican Blue Mountain", "Reconnu pour sa saveur douce, son acidité vive et son absence d'amertume.", 39.25, TRUE, 11),
(12, 650753915, "Rwandan Bourbon", "Café avec des notes florales prononcées, une acidité vive et un corps moyen.", 21.90, TRUE, 12),
(13, 795501340, "Panamanian Geisha", "Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.", 42.00, TRUE, 13),
(14, 954589100, "Peruvian Arabica", "Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.", 19.40, FALSE, 14),
(15, 958090105, "Hawaiian Kona", "Café rare au goût riche, une acidité douce et des nuances subtiles.", 55.75, FALSE, 15),
(16, 691550753, "Nicaraguan Maragogipe", "Café avec des notes de fruits, une acidité vive et un corps plein.", 28.60, FALSE, 16)


-- Création de la table "country" si elle n'existe pas --
CREATE TABLE IF NOT EXISTS "country" (
  "id" INT NOT NULL PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL
);

INSERT INTO "country" ("id", "name")
VALUES (1, 'Italie'), 
(2, 'Colombie'), 
(3, 'Éthiopie'), 
(4, 'Brésil'), 
(5, 'Guatemala'), 
(6, 'Kenya'), 
(7, 'Indonésie'), 
(8, 'Costa Rica'), 
(9, 'Vietnam'), 
(10, 'Tanzanie'), 
(11, 'Jamaïque'), 
(12, 'Rwanda'), 
(13, 'Panama'), 
(14, 'Pérou'), 
(15, 'Hawaï'), 
(16, 'Nicaragua')

-- Création de la table "feature" si elle n'existe pas --
CREATE TABLE IF NOT EXISTS "feature" (
  "id" INT NOT NULL PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL
);

INSERT INTO "feature" ("id", "name")
VALUES (1, 'Corsé'),
(2, 'Fruité'),
(3, 'Chocolaté'),
(4, 'Doux'),
(5, 'Épicé'),
(6, 'Acide')

-- Création de la table de liaison "coffee_feature" si elle n'existe pas --
CREATE TABLE IF NOT EXISTS "coffee_feature" (
  "id" SERIAL PRIMARY KEY,
  "coffee_id" INT REFERENCES "coffee"("id"),
  "feature_id" INT REFERENCES "feature"("id"),
  UNIQUE ("coffee_id", "feature_id")
);

INSERT INTO "coffee_feature" ("coffee_id", "feature_id")
VALUES (1, 1),
(1, 5),
(2, 6),
(3, 2),
(3, 4),
(4, 4),
(5, 1),
(6, 4),
(6, 6),
(7, 1),
(8, 6),
(9, 5),
(10, 1),
(10, 2),
(11, 4),
(12, 2),
(13, 2),
(14, 1),
(14, 3),
(15, 4),
(16, 1),
(16, 2)