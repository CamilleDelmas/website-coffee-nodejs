# MCD/MLD/MPD

## MCD

### Entités

- Café
- Pays
- Caractéristiques

### Attributs

- Café
  - **Référence**
  - Nom
  - Description
  - Prix au kilo
  - Disponibilité

- Pays
  - **CodePays**
  - Nom

- Caractéristique
  - **CodeCaractéristiques**
  - Nom

### Relations

Café APPARTENIR Pays
Café POSSÉDER Caractéristique

### Cardinalités

Un Café appartient à 1 seul Pays
Un Café possède 1 à plusieurs Caractéristiques
Un Pays contient 0 à plusieurs Cafés
Une Caractéristique appartient à 0 ou plusieurs cafés 

### MOCODO

![Mocodo MCD](MCD.svg)

## MLD

- `coffee (__id__, reference, name, text, price_kg, stock, #FK(country.id))`
- `country (__id__, name)`
- `feature (__id__, name)`
- `coffee_feature (id, #FK(coffee.id), #FK(feature.id))`

## MPD

```sql

CREATE TABLE IF NOT EXISTS "coffee" (
  "id" SERIAL PRIMARY KEY,
  "reference" INT NOT NULL, 
  "name" VARCHAR(128) NOT NULL,
  "text" TEXT,
  "price_kg" NUMERIC NOT NULL DEFAULT 0,
  "stock" INT DEFAULT 0,
  "country_id" INT REFERENCES "country"("id")
)

CREATE TABLE IF NOT EXISTS "country" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL
)

CREATE TABLE IF NOT EXISTS "feature" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL
)

CREATE TABLE IF NOT EXISTS "coffee_feature" (
  "id" SERIAL PRIMARY KEY,
  "coffee_id" INT REFERENCES "coffee"("id"),
  "feature_id" INT REFERENCES "feature"("id"),
  UNIQUE ("coffee_id", "feature_id")

)

```