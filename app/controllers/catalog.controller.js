import dataMapper from "../dataMapper.js";

const catalogController = {
  catalogList: async (req, res) => {
    try {
          // 1. aller chercher les données
          const coffees = await dataMapper.findAllCoffees();
          // 2. afficher la vue
          res.render("catalog", {css:'catalog', coffees});
      } catch (error) {
          // 3. gestion des cas d'erreur
          console.log(error);
          res.status(500).send(error.message);
      }
  },
  
  catalogProduct: (req,res) => {
    res.render("product", {css:'product'})
  }
}

export default catalogController;