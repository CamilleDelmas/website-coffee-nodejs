showAllProducts();

function showAllProducts() {
  const buttonShow = document.getElementById("see-all-products-button");
  const divArticle = document.querySelector(".articles");
  
  buttonShow.addEventListener("click", () => {
    divArticle.classList.remove("only-display-3-articles");
    buttonShow.style = "display:none"
  });
}
