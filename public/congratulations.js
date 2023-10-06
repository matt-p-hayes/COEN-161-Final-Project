//checks to make sure that the response does not have an erro
const checkResponse = (response) => {
  //console.log('RESPONSE', response);
  return response.ok ? response.json() : Promise.reject(response.status);
}

//function that displays the winner with a celebratory gif
const displayWinner = (person) => {

  const winnerArea = document.querySelector(".winner");

  //removes all things currently displayed in the winner area in case you need to pick again
  while (winnerArea.firstChild) {
    winnerArea.removeChild(winnerArea.firstChild);
  }
  //console.log('IN DISPLAY WINNER');

  fetch("/coen-161/final/raffle/getTotal", {
    method: "GET",
    header: {
      "Content-Type": "application/json"
    }
  })
  .then(response => checkResponse(response))
  .then(total => { 
    const header = document.createElement("h1");
    header.innerText = " 🎉 Congratulations! 🎉 ";
    const winnerGif = document.createElement("img");
    winnerGif.src = 'https://acegif.com/wp-content/uploads/gift-5.gif';
    winnerGif.classList.add('gif');
    const personElement = document.createElement("p");
    personElement.innerText = `You won, ${person.name}! The grand prize was $${total.total / 2}!!!`; //divide the total by 2 because it is a 50/50 raffle
    winnerArea.append(header);
    winnerArea.append(winnerGif);
    winnerArea.append(personElement);
      
  });
  //creates a header, gif, and paragraph in order to display the winner and adds it to the winner section
  
};

//gets a random person from the database to display as the winner
const pickWinnerButton = document.getElementById('random');
pickWinnerButton.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/coen-161/final/raffle/getRandom", {
    method: "GET",
    header: {
      "Content-Type": "application/json"
    }
  })
  .then(response => checkResponse(response))
  .then(data => displayWinner(data));
})

//console.log('IN CONGRATULATIONS.JS');


// const matter = (data) => {
//   console.log(data)
//   const persons = data.persons;
//   console.log(persons)
//   const el = document.querySelector(".winner");
//   persons.forEach((person) => {
//     console.log(person);
//     const personElement = document.createElement("p");
//     personElement.innerText = `You win, ${person.name}. You entered the raffle with ${person.amount}.`;
//     el.append(personElement);
//   });
// };

// console.log("in script.js");

// fetch("/persons", {
//   method: "GET", 
//   headers: {
//     "Content-Type": "application/json"
//   }
// })
// .then(response => checkResponse(response))
// .then(data => matter(data));