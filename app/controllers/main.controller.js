import dataMapper from "../dataMapper.js";

const mainController = {
  homePage: async (req, res) => {
    try {
      const newCoffees = await dataMapper.findNewCoffees();
      res.render("home", { coffees: newCoffees });
    } catch(error) {
      res.status(500).send(error.message)
    }
    
  }, 

  boutiquePage: (req,res) => {
    res.render("boutique", { css: "boutique" });
  }
}

export default mainController;