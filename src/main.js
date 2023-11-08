const refs = {
    catList: document.querySelector('.categoriesList'),
    catListItem: document.querySelector('.categoriesList'),
    catPage: document.querySelector('.categoryPage'),
    bookPage: document.querySelector('.bookInfoBox'),
    bestSellersPartName: document.querySelector('.bestSellersPartName'),
    partCardsPage: document.querySelector('.partCardsList'),
    btnSeeMore: document.querySelector('.btnBestSellersSeeMore'),
    cardsBookSmall: document.querySelector('.photo-card'),
    shoppingList: document.querySelector('.shoppingList'),
    btnAddtoShList: document.querySelector('.btnAddtoCard'),
    btnRemoveShList: document.querySelector('.btnRemoveCard'),
    btnCloseInfoBook: document.querySelector('.btnCloseInfoBook'),
};
const numberBlocksPage = 4;
//////////////////////////////////////////////////////////////

// ---->>>>>>   Перелік категорій книг  <<<<<<-----//
async function catigoriesList() {
    const BASE_URL = 'https://books-backend.p.goit.global/books/category-list';
    return await fetch(`${BASE_URL}`)
       .then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

const listCat = catigoriesList()
  .then((data) => {
    //   console.log(data);
      creatCatigoriesList(data);
  })
        .catch((err) => console.log(err));

//////////////////////////////////////////////////////////////
function creatCatigoriesList(respArr) {
   const catigoriesList = respArr.map(({list_name}
   ) => `
       <li class="categoryItem">${list_name}</li>
       `).join("");
   refs.catList.innerHTML = catigoriesList;
//    refs.gallery.insertAdjacentHTML('beforeend', markupGel);
}
let selectedCategory;
refs.catListItem.addEventListener('click', onCategoriesSwitch);
// const selectedCategory = onCategoriesSwitch (e) =>

function onCategoriesSwitch(e) {    
    selectedCategory = e.target.textContent;
    // console.log(e.target.textContent);
    booksSelectedCategory(selectedCategory);
    

}

// ---->>>>>>   Книги окремої категорії <<<<<<-----//
// https://books-backend.p.goit.global/books/category?category=selectedCategory?category=Audio+Fiction
async function booksSelectedCategory(selectedCategory) {
    const BASE_URL = 'https://books-backend.p.goit.global/books/category';
    const params = new URLSearchParams({
         category: selectedCategory
    });
    return await fetch(`${BASE_URL}?${params}`)
       .then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
           }
    return resp.json();
       })
      .then((data) => {
    //   console.log(data);
      creatMarkUP(data)
  })
        .catch((err) => console.log(err));

}

function creatMarkUP(respArr) {
    const pageMarkUp = respArr.map(({
        author,
        book_image,
        description,
        amazon_product_url,
        title,
        list_name,
        _id,
    }
   ) => `
       <div class="photo-card" id="${_id}">
             <img class="images" src="${book_image}"
              alt="${title}" loading="lazy" />
                <div class="info">
                   <p class="info-item"><b>${title}</b></p>                
                   <p class="info-item"><b>${author}</b></p>
                </div>
       </div>
       `).join("");
    
     const headPage = `<h1>${selectedCategory}</h1>`;
//    refs.catPage.innerHTML = pageMarkUp;
    // refs.catPage.insertAdjacentHTML('beforeend', pageMarkUp);
    refs.catPage.innerHTML = headPage + pageMarkUp;
}


// ---->>>>>>   Детальна інформація про книгу  <<<<<<-----//??????????????????????????????
async function bookDetail(bookId) {
    return await fetch(`https://books-backend.p.goit.global/books/${bookId}`)
       .then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
           }
          return resp.json();
       })
        .then((resp) => {  
              
    // console.log([resp]);
    creatMarkupBook([resp])
  })
        .catch((err) => console.log(err));
}


function creatMarkupBook(respArr) {

const infoBuyLinks = respArr[0].buy_links.map(({name, url }) =>
     `
     <div class="boxMarketPlace">
     <a href="${url}" class="infoMarketPlace" target="_blank"><b>${name}</b></a>
     </div>
       `).join("");

    const pageMarkupBook = respArr.map(({
        author,
        book_image,
        description,
        buy_links: [{ name, url }],
        buy_links,
        title,
        list_name,
        _id,
    }
   ) => `
       <div class="photo-card" id="${_id}">
       <button class="btnCloseInfoBook">X</button>
             <img class="images" src="${book_image}"
              alt="${title}" loading="lazy" />
                <div class="info">
                   <p class="info-title"><b>${title}</b></p>
                   <p class="info-author"><b>${author}</b></p>
                   <p class="info-buy_links"><b>${infoBuyLinks}</b></p>
                   <p class="info-description">${description}</p>
                   <button class="btnAddtoCard">Add to shopping list</button>
                   <button class="btnRemoveCard hidden">Remove from the shopping list</button>
                </div>
       </div>
       `).join("");
    refs.bookPage.classList.remove('hidden');
    refs.bookPage.innerHTML = pageMarkupBook;
//    refs.bookPage.insertAdjacentHTML('beforeend', pageMarkupBook);
}
//////////////////////////////////////////////////////////////
// ---->>>>>>   Популярні книги, що належать до усіх категорій  <<<<<<-----// 
async function allBooksBackend() {
    const BASE_URL = 'https://books-backend.p.goit.global/books/top-books';
    return await fetch(`${BASE_URL}`)
       .then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

await allBooksBackend()
    .then((data) => {
    //   console.log(data);
       createPageAllBooks(data);
  })
        .catch((err) => console.log(err));

function createPageAllBooks(respArr) {
    const headPage = `<h1 class="mainHeadPage">Best Sellers Books</h1>`;
    let partBoxAllBooks = '';
    let pageAllBooks = '';

    for (let i = 0; i < numberBlocksPage; i++) {
    let categoryName = respArr[i].list_name;
    let categoryArr = respArr[i].books;
    // console.log(categoryArr);
    
    const pageMarkupAllBooks = categoryArr.map(({ _id,
        author,
        book_image,
        title,}
   ) => `
      <div class="partCardsListItem photo-card" id="${_id}" >
         <img class="imgBestSellersItem" src="${book_image}" alt="${title}">
         <p class="nameBestSellersItem">${_id}</p>
         <p class="nameBestSellersItem">${title}</p>
         <p class="authorBestSellersItem">${author}</p>
      </div>
       `).join("");
    
      partBoxAllBooks =
      ` <div class="bestSellersPart">
              <p class="bestSellersPartName">${categoryName}</p>
                 <div class="bestSellersPartCards">
                   <div class="partCardsList">
                   ${pageMarkupAllBooks}
                   </div>
                 </div>
          </div>
          <button class="btnBestSellersSeeMore" category = "${categoryName}">See More</button>
      `
        pageAllBooks += partBoxAllBooks;
    }
    // refs.catPage.insertAdjacentHTML('beforeend', headPage + pageAllBooks);
    refs.catPage.innerHTML = headPage + pageAllBooks;
}

// На стр. BestSellers вікриваемо інфо про книгу або відрацьовуемо клік по кнопці SeeMore
refs.catPage.addEventListener('click', onBookSwitch);

function onBookSwitch(e) {
    const currentBook = e.target.closest(".photo-card")
    const currentCategory = e.target.closest(".btnBestSellersSeeMore")

    if (currentBook) {
        let bookId = currentBook.id;
        bookDetail(bookId);
    } if (currentCategory) {
        let bookCat = currentCategory.getAttribute("category");
        selectedCategory = bookCat;
        booksSelectedCategory(selectedCategory);
        // console.log(bookCat);
     }return
};
//////////////////////////////////////////////////////////////
// localStorage 
// const STORAGE_KEY = 'feedback-form-state';
// const btnAdd = document.getElementsByClassName('btnAddtoCard');
// const btnDel = document.getElementsByClassName('btnRemoveCard');
//  btnAdd.addEventListener('click', onRemShList);
// function onRemShList() {
//         btnDel.classList.remove('hidden');
//     // console.log(refs.btnRemoveShList);
//     };



refs.bookPage.addEventListener('click', onClickBookInfo);
function onClickBookInfo(e) { 
   





    
    const btnAddtoCard = e.target.closest(".btnAddtoCard")
    const btnRemoveCard = e.target.closest(".btnRemoveCard")
    const btnCloseBookPage = e.target.closest(".btnCloseInfoBook")
    if (btnAddtoCard) {
        console.log('btnAddtoCard');
        console.log(refs.btnRemoveShList);
        // refs.btnRemoveShList.classList.remove('hidden');
        //  refs.btnAddtoCard.classList.add('hidden')

    } if (btnRemoveCard) {
        // refs.btnAddtoCard.classList.remove('hidden')
        // refs.btnRemoveCard.classList.add('hidden')
    console.log('btnRemoveCard');
    } if (btnCloseBookPage) {
       refs.bookPage.classList.add('hidden');
     }return




};