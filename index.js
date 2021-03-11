const loadBooks = async () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((books) => {
      loadBook(books);
    })
    .catch((err) => console.log(err));
};

const loadBook = async (books) => {
  let mainRow = document.querySelector(".main-row");
  books.forEach((book) => {
    mainRow.innerHTML += `<div class="col col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
                            <div class="card bg-transparent" id="${book.id}">
                              <img src="${
                                book.img
                              }" class="card-img-top"   alt="...">
                              <div class="cardBody bg-secondary">
                                  <p class="card-title">${
                                    book.title.length < 30
                                      ? `${book.title}`
                                      : `${book.title.substring(0, 30)}...`
                                  }</p>
                                  <div class="d-flex justify-content-between">
                                  <p class="card-text">$ ${book.price}</p>
                                  <div><a href="#" class="btn btn-sm btn-success">Add to cart</a>
                                  <a href="#" class="btn btn-sm btn-danger">Skip</a></div>
                                  </div>
                              </div>
                             </div>
                            </div>`;
  });
  document.querySelectorAll(".btn-success").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
  document.querySelectorAll(".btn-danger").forEach((button) => {
    button.addEventListener("click", deleteCard);
  });
};

function deleteCard(e) {
  e.preventDefault();
  let col = e.target.closest(".col");
  col.classList.add("animate__animated", "animate__bounce");
  setTimeout(() => {
    col.remove();
  }, 500);
}

function addToCart(e) {
  e.preventDefault();
  let card = e.target.closest(".card");
  let skipBtn = e.target.closest(".btn-danger");
  card.classList.add("selected");
  let title = e.target.closest(".card-title").text;
  console.log(title);
}

window.onload = () => {
  loadBooks();
};

let cartItems = [];
