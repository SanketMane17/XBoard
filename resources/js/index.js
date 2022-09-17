// Implementing accordion component

let createAccordion = (title, id) => {
  return `
 
    <div class="accordion-item"  id="${id}">
      <h2 class="accordion-header" id="heading${id}">
        <button id="no-hover"
        style="width: 100%"
        class=" btn btn-text "  type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
        <div id="button-title"> ${title} </div> 
       
        </button>
      </h2>
      <div id="collapse${id}" class="collapse" aria-labelledby="heading${id}" data-bs-parent="#accordionId">
       
      </div>
    </div>`;
};

//Implementing carousel Component

let outerCarousel = (id, innerId) => {
  return `
 
   <div id="carouselExampleControls${id}" class="carousel slide" data-bs-ride="carousel">
   <div class="carousel-inner" id="${innerId}">
   </div>
   
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
   </button>
 </div>
   `;
};

let innerCarousel = (id, active) => {
  return `
   <div class="carousel-item ${active ? "active" : ""}" id="${id}"></div>`;
};

// Implementing card-body

function cardBody(item) {
  //converting date
  let date = new Date(item["pubDate"]);
  let formated_date =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear().toString().substring(-2);

  return `
    <a style="text-decoration:none ; color: black" href="${item["link"]}" target="_blank" >  
     <div class="card d-block">
        <img
        src=${item["enclosure"]["link"]}
        alt=""
        class="img-responsive card-img-top carousel-img"
        />
        <div class="card-body">
           <h5 class="card-title">${item["title"]}</h5>
 
           <div style="color:gray" class="d-flex py-2">
              <h6 class="card-subtitle  ">${item["author"]}</h6> 
              <span class="circle"></span>     
              <h6 style="padding-left:18" class="card-subtitle ">${formated_date}</h6>
           </div>
           
           <p class="card-text">${item["description"]}</p>
           
        </div>
     </div>
   </a>
     `;
}

let ID = () => Math.random().toString(36).substr(2, 9);

// fetch the data from magazines
// loop through magazines
let fetchData = async () => {
  for (let i = 0; i < magazines.length; i++) {
    let url = magazines[i];
    // fetch the data
    let response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${url}`
    );

    let result = await response.json();

    //create accordian

    let accordionId = ID();
    let accordian = createAccordion(result["feed"]["title"], accordionId);

    console.log(accordian);
    document.getElementById("accordionId").innerHTML += accordian;

    if (i == 0) {
      document.getElementById(`collapse${accordionId}`).classList.add("show");
    }

    //create carousel

    let carouselId = ID();
    let carouselInnerId = ID();
    let carousel = outerCarousel(carouselId, carouselInnerId);
    console.log(carousel);

    document.getElementById(`collapse${accordionId}`).innerHTML = carousel;

    //add cards

    let items = result["items"];
    for (let item in items) {
      let card = cardBody(items[item]);
      console.log(card);
      let innerCarouselId = ID();
      let innerCarouselCard = innerCarousel(innerCarouselId, item == 0);
      console.log(innerCarouselCard);
      document.getElementById(`${carouselInnerId}`).innerHTML +=
        innerCarouselCard;
      document.getElementById(`${innerCarouselId}`).innerHTML += card;
    }
  }
};

fetchData();
