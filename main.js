// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const hearts = document.querySelectorAll(".like-glyph");

   // Hide the error modal by default
   errorModal.classList.add("hidden");

  // Attach event listeners to empty hearts
  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          // Success: Change the heart to full and add activated-heart class
          if (heart.textContent === EMPTY_HEART) {
            heart.textContent = FULL_HEART;
            heart.classList.add("activated-heart");
          } else {
            // If it's a full heart, change it back to empty and remove activated-heart class
            heart.textContent = EMPTY_HEART;
            heart.classList.remove("activated-heart");
          }
        })
        .catch((error) => {
          // Error: Display the error modal with the message and hide it after 3 seconds
          const errorMessage = document.getElementById("modal-message");
          errorMessage.textContent = error;
          errorModal.classList.remove("hidden");
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });
  
})

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
