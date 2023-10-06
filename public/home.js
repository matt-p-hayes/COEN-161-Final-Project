//checks to make sure the http response does not have an error
const checkResponse = (response) => {
    console.log('RESPONSE', response);
    return response.ok ? response.json() : Promise.reject(response.status);
}

//creates a person and updates the total based on information entered into the form
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name');
    const amount = document.getElementById('amount');
    const obj = {"name":name.value, "amount":amount.value};

    fetch("/coen-161/final/raffle/updateTotal", {
        method: "PUT",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({newTotal: (amount.value * 5)})
    })
    .then(response => checkResponse(response))
    .then(total => { 
        const display = document.getElementById("raffleAmount");
        display.value = "$" + total;
    })

    fetch("/coen-161/final/raffle/makePerson", {
        method:"POST",
        header: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(result => { 
        //resets the form values
        name.value = '';
        amount.value = 1;
    });
});

//deletes everyone from the raffle and resets the total to 0
const deleteButton = document.getElementById('delete');
deleteButton.addEventListener("click", () => {
    fetch("/coen-161/final/raffle/resetTotal", {
        method: "PUT",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ total: 0 })
      });

    fetch("/coen-161/final/raffle/deletePersons", {
    method: "DELETE",
    header: {
        "Content-Type": "application/json"
    },
    });

    setTimeout(() => {
    location.reload();
    }, 6000);
});

//gets the total amount of money that is currently in the raffle
const getTotal = () => {
    fetch("/coen-161/final/raffle/getTotal", {
        method: "GET",
        header: {
          "Content-Type": "application/json"
        }
      })
      .then(response => checkResponse(response))
      .then(total => { 
          const display = document.getElementById("raffleAmount");
          display.innerText = "$" + total.total;
      });
}

//get the total number of tickets that have been sold
const getEntries = () => {
    fetch("/coen-161/final/raffle/getEntries", {
        method: "GET",
        header: {
          "Content-Type": "application/json"
        }
      })
      .then(response => checkResponse(response))
      .then(total => { 
          const display = document.getElementById("ticketAmount");
          display.innerText = total;
      });
}

//gets the total and number of entries every 5 seconds in case they've been changed
setInterval(getTotal, 2000);
setInterval(getEntries, 2000);




// fetch("/updateTotal", {
//     method: "PUT",
//     header: {
//         "Content-Type": "application/json"
//     },
//     //CHANGE TO BE DYNAMIC
//     body: JSON.stringify({newTotal: 50})
// })
// .then(response => checkResponse(response))
// .then(total => { 
//     const display = document.getElementById("raffleAmount");
//     display.innerText = total.total;
// });