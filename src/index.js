let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  getToys()
});

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(function(response) {
      return response.json()
    })
    .then(function(object) {
      object.forEach(toy => {
        const toyCollection = document.getElementById('toy-collection')
        const toyDiv = document.createElement('div')
        const toyName = document.createElement('h2')
        const toyImg = document.createElement('img')
        const toyLikes = document.createElement('p')
        const likeBtn = document.createElement('button')
        toyName.innerText = toy.name
        toyImg.src = toy.image
        toyLikes.innerText = `${toy.likes} Likes`
        likeBtn.innerText = 'Like <3'
        toyDiv.appendChild(toyName)
        toyDiv.appendChild(toyImg)
        toyDiv.appendChild(toyLikes)
        toyDiv.appendChild(likeBtn)
        toyCollection.appendChild(toyDiv)
      })
    })
}