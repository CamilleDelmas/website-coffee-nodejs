import dataMapper from "../dataMapper.js";

const catalogController = {
  catalogList: async (req, res) => {
    try {
          // 1. aller chercher les données
          const coffees = await dataMapper.findAllCoffees();
          // 2. afficher la vue
          res.render("catalog", {pageTitle: "Catalogue", coffees});
      } catch (error) {
          // 3. gestion des cas d'erreur
          console.log(error);
          res.status(500).send(error.message);
      }
  },
  
  catalogProduct: async (req,res,next) => {
    const coffeeId = req.params.id;
    try {
          const coffee = await dataMapper.findOneCoffee(coffeeId);
          if (coffee === null) {
            return res.status(404).render('404', {pageTitle: "Page non trouvée"});
          }
          res.render("product", { pageTitle: `${coffee.name}`, coffee})
      } catch (error) {
          console.log(error);
          res.status(500).send(error.message);
      }
  }
}

export default catalogController;