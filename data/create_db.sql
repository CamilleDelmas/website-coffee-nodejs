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
VALUES (1, 100955890, "Espresso", "Café fort et concentré préparé en faisant passer de l'eau chaude à travers du café finement moulu.", 20.99, TRUE, 1)
VALUES (2, 100955894, "Columbian", "Café moyennement corsé avec une acidité vive et une saveur riche.", 18.75, TRUE, 2)
VALUES (3, 105589090, "Ethiopian Yirgacheffe", "Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.", 22.50, TRUE, 3)
VALUES (4, 134009550, "Brazilian Santos", "Café doux et lisse avec un profil de saveur de noisette.", 17.80, TRUE, 4)
VALUES (5, 256505890, "Guatemalan Antigua", "Café corsé avec des nuances chocolatées et une pointe d'épice.", 21.25, TRUE, 5)
VALUES (6, 295432730, "Kenyan AA", "Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.", 23.70, TRUE, 6)
VALUES (7, 302932754, "Sumatra Mandheling", "Café profond et terreux avec un corps lourd et une faible acidité.", 19.95, TRUE, 7)
VALUES (8, 327302954, "Costa Rican Tarrazu", "Café vif et net avec une finition propre et une acidité vive.", 24.50, TRUE, 8)
VALUES (9, 549549090, "Vietnamese Robusta", "Café audacieux et fort avec une saveur robuste distinctive.", 16.75, TRUE, 9)
VALUES (10, 582954954, "Tanzanian Peaberry", "Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.", 26.80, TRUE, 10)
VALUES (11, 589100954, "Jamaican Blue Mountain", "Reconnu pour sa saveur douce, son acidité vive et son absence d'amertume.", 39.25, TRUE, 11)
VALUES (12, 650753915, "Rwandan Bourbon", "Café avec des notes florales prononcées, une acidité vive et un corps moyen.", 21.90, TRUE, 12)
VALUES (13, 795501340, "Panamanian Geisha", "Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.", 42.00, TRUE, 13)
VALUES (14, 954589100, "Peruvian Arabica", "Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.", 19.40, FALSE, 14)
VALUES (15, 958090105, "Hawaiian Kona", "Café rare au goût riche, une acidité douce et des nuances subtiles.", 55.75, FALSE, 15)
VALUES (16, 691550753, "Nicaraguan Maragogipe", "Café avec des notes de fruits, une acidité vive et un corps plein.", 28.60, FALSE, 16)


-- Création de la table "country" si elle n'existe pas --
CREATE TABLE IF NOT EXISTS "country" (
  "id" INT NOT NULL PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL
);

INSERT INTO "country" ("id", "name")
VALUES (1, "Italie")
VALUES (2, "Colombie")
VALUES (3, "Éthiopie")
VALUES (4, "Brésil")
VALUES (5, "Guatemala")
VALUES (6, "Kenya")
VALUES (7, "Indonésie")
VALUES (8, "Costa Rica")
VALUES (9, "Vietnam")
VALUES (10, "Tanzanie")
VALUES (11, "Jamaïque")
VALUES (12, "Rwanda")
VALUES (13, "Panama")
VALUES (14, "Pérou")
VALUES (15, "Hawaï")
VALUES (16, "Nicaragua")

-- Création de la table "feature" si elle n'existe pas --
CREATE TABLE IF NOT EXISTS "feature" (
  "id" INT NOT NULL PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL
);

INSERT INTO "feature" ("id", "name")
VALUES (1, "Corsé")
VALUES (2, "Fruité")
VALUES (3, "Chocolaté")
VALUES (4, "Doux")
VALUES (5, "Épicé")
VALUES (6, "Acide")

-- Création de la table de liaison "coffee_feature" si elle n'existe pas --
CREATE TABLE IF NOT EXISTS "coffee_feature" (
  "id" SERIAL PRIMARY KEY,
  "coffee_id" INT REFERENCES "coffee"("id"),
  "feature_id" INT REFERENCES "feature"("id"),
  UNIQUE ("coffee_id", "feature_id")
);

INSERT INTO "coffee_feature" ("coffee_id", "feature_id")
VALUES (1, 1)
VALUES (1, 5)
VALUES (2, 6)
VALUES (3, 2)
VALUES (3, 4)
VALUES (4, 4)
VALUES (5, 1)
VALUES (6, 4)
VALUES (6, 6)
VALUES (7, 1)
VALUES (8, 6)
VALUES (9, 5)
VALUES (10, 1)
VALUES (10, 2)
VALUES (11, 4)
VALUES (12, 2)
VALUES (13, 2)
VALUES (14, 1)
VALUES (14, 3)
VALUES (15, 4)
VALUES (16, 1)
VALUES (16, 2)