const mainController = {
  homePage: (req, res) => {
    res.render("home");
  }, 

  boutiquePage: (req,res) => {
    res.render("boutique");
  }
}

export default mainController;