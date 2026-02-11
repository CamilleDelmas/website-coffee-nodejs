const catalogController = {
  catalogList: (req, res) => {
    res.render("catalog", {css:'catalog'});
  },
  
  catalogProduct: (req,res) => {
    
    res.render("product", {css:'product'})
  }
}

export default catalogController;