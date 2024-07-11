const url = `https://jsonplaceholder.typicode.com/todos`;

const container = document.querySelector(".container");
const paginationBtns = document.querySelectorAll(".pagination-btn");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

let currentPage = 1;
let totalPage = 10;
let currentBtn = paginationBtns[currentPage - 1];
currentBtn.classList.add("active");

getData(`${url}?_page=${currentPage}&_limit=20`);

prevBtn.addEventListener("click", prevBtnFunc);

paginationBtns.forEach((ele) => {
  ele.addEventListener("click", () => {
    paginationBtns[currentPage - 1].classList.remove("active");
    currentPage = parseInt(ele.textContent);
    paginationBtns[currentPage - 1].classList.add("active");
    getData(`${url}?_page=${currentPage}&_limit=20`);
  });
});

nextBtn.addEventListener("click", nextBtnFunc);

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayData(data);
  } catch (error) {
    console.log(error);
  }
}

function displayData(data) {
  container.innerHTML = "";
  data.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h3");
    title.innerText = `Title: ${element.title}`;

    const status = document.createElement("div");
    status.classList.add("status");
    status.innerText = `Status: ${
      element.completed ? "Completed" : "Not Completed"
    }`;

    card.append(title, status);
    container.append(card);
  });
}

function prevBtnFunc() {
  if (currentPage > 1) {
    paginationBtns[currentPage - 1].classList.remove("active");
    currentPage--;
    paginationBtns[currentPage - 1].classList.add("active");
    getData(`${url}?_limit=20&_page=${currentPage}`);
  }
}

function nextBtnFunc() {
  if (currentPage < totalPage) {
    paginationBtns[currentPage - 1].classList.remove("active");
    currentPage++;
    paginationBtns[currentPage - 1].classList.add("active");
    getData(`${url}?_limit=20&_page=${currentPage}`);
  }
}
