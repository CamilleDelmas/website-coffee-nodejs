const catalogController = {
  catalogList: (req, res) => {
    res.render("catalog", {css:'catalog'});
  },
  
  catalogProduct: (req,res) => {
    
    res.render("product")
  }
}

export default catalogController;