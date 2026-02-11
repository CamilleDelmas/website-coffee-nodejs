const catalogController = {
  catalogList: (req, res) => {
    res.render("catalog", {css:'catalog'});
  }
}

export default catalogController;