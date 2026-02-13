import dataMapper from "../dataMapper.js";
import 'dotenv/config';

const mainController = {
  homePage: async (req, res) => {
    try {
      const newCoffees = await dataMapper.findNewCoffees();
      res.render("home", { pageTitle: "Bienvenue !", coffees: newCoffees });
    } catch(error) {
      res.status(500).send(error.message)
    }
    
  }, 

  boutiquePage: (req,res) => {
    const mailKey = `${process.env.PUBLICKEY}`;
    let date = new Date();
    res.render("boutique", { date, mailKey, pageTitle: "Notre boutique" });
  }
}

export default mainController;