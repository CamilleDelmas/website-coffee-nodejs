import dataMapper from "../dataMapper.js";

const adminController = {
  adminPage: async (req, res) => {
    try {
      const countries = await dataMapper.findAllCountries();
      const features = await dataMapper.findAllFeatures();
      const coffees = await dataMapper.findNumberCoffee();
      const nbCoffee = coffees.nb_coffee;
      const idCoffee = Number(nbCoffee) + 1;
      res.render("admin", { countries, features, idCoffee });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },

  addCoffee: async (req, res) => {
    let { id, name, reference, text, price, stock, country, feature } = req.body;

    console.log(req.body);
    const count = await dataMapper.addCoffee(
      id,
      name,
      reference,
      text,
      price,
      stock,
      country,
      feature,
    );

    try {
      if (count >= 1) {
        res.redirect("/catalogue");
      } else {
        return res.status(500).send("Aucun enregistrement créé");
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
};

export default adminController;
