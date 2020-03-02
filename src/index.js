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
        renderToy(toy)
      })
    })
}

function postToy(name, url) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'image': url,
      'likes': 0
      
    })
  })
  .then(function(response) {
    response.json()
  })
  .then(function(object) {
    console.log(object)
  })
  .catch(function(error) {
    document.body.innerHTML = error.message
  })
}

function renderToy(toy) {
  const toyCollection = document.getElementById('toy-collection')
  const toyDiv = document.createElement('div')
  toyDiv.setAttribute('class', 'card')

  const toyName = document.createElement('h2')
  toyName.innerText = toy.name

  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.setAttribute('class', 'toy-avatar')

  const toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} Likes`
  
  const likeBtn = document.createElement('button')
  likeBtn.innerText = 'Like <3'
  likeBtn.setAttribute('class', 'like-btn')
  
  toyDiv.appendChild(toyName)
  toyDiv.appendChild(toyImg)
  toyDiv.appendChild(toyLikes)
  toyDiv.appendChild(likeBtn)
  toyCollection.appendChild(toyDiv)
}