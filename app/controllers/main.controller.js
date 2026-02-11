const mainController = {
  homePage: (req, res) => {
    res.render("home", {css:'home'});
  }
}

export default mainController;