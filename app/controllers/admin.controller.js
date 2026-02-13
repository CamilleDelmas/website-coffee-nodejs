import dataMapper from "../dataMapper.js";

const adminController = {
  adminPage: async (req, res) => {
    try {
          const countries = await dataMapper.findAllCountries();
          const features = await dataMapper.findAllFeatures();
          res.render("admin", { countries, features } );
      } catch (error) {
          console.log(error);
          res.status(500).send(error.message);
      }
  },

  addCoffee: async (req, res) => {
    
  },
}

export default adminController;