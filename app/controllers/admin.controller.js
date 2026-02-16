import dataMapper from "../dataMapper.js";

const adminController = {
  adminPage: async (req, res) => {
    try {
      const countries = await dataMapper.findAllCountries();
      const features = await dataMapper.findAllFeatures();
      res.render("admin", { countries, features });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },

  addCoffee: async (req, res) => {
    let { reference, name, text, price, stock, country, features } =
      req.body;
      try {
        const newCoffee = await dataMapper.addCoffee(
      reference, 
      name,
      text,
      price,
      stock,
      country,
    );
    // const lastCoffee = await dataMapper.findLastCoffee();
    if (features) {
      await dataMapper.addCoffeeFeature(newCoffee.id, features);
    }
    
    res.redirect("/catalogue");
      } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};

export default adminController;
