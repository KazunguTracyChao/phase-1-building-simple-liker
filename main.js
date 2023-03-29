// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const modal = document.querySelector('#modal');
const likeBtn = document.querySelector('.like-glyph');

modal.classList.add('hidden');  // Add .hidden class to error modal in HTML

likeBtn.addEventListener('click', (e) => {  // When the like button is clicked
  mimicServerCall()  // simulate making a server request
    .then(response => {
      if (response === "success") {  // when the "server" returns a success status
        e.target.innerText = '❤️';  // update the heart to be full
        e.target.classList.add('activated-heart');  // add the class to make the heart red
      } else {  // when the "server" returns a failure status
        modal.classList.remove('hidden');  // display the error modal by removing .hidden class
        const errorMessage = document.querySelector('#modal p');
        errorMessage.innerText = "Oops! Something went wrong!";  // display the server error message
        setTimeout(() => modal.classList.add('hidden'), 3000);  // hide the modal after 3 seconds
      }
    })
    .catch(error => {
      modal.classList.remove('hidden');  // display the error modal by removing .hidden class
      const errorMessage = document.querySelector('#modal p');
      errorMessage.innerText = "Oops! Something went wrong!";  // display the server error message
      setTimeout(() => modal.classList.add('hidden'), 3000);  // hide the modal after 3 seconds
    });
});

likeBtn.addEventListener('dblclick', (e) => {  // When the full heart is clicked
  e.target.innerText = '♡';  // set the heart back to empty
  e.target.classList.remove('activated-heart');  // remove the class to make the heart red
});




/// MORE ADVANCED SOLUTION ///

// const glyphStates = {
//   "♡": "♥",
//   "♥": "♡"
// };

// const colorStates = {
//   "red" : "",
//   "": "red"
// };

// const articleHearts = document.querySelectorAll(".like-glyph");

// function likeCallback(e) {
//   const heart = e.target;
//   mimicServerCall("bogusUrl", {forceFailure: true})
//     .then(function(){
//        heart.innerText = glyphStates[heart.innerText];
//        heart.style.color = colorStates[heart.style.color];
//     })
//     .catch(function(error) {
//       const modal = document.getElementById("modal");
//       modal.className = "";
//       modal.innerText = error;
//       setTimeout(() =>  modal.className = "hidden", 3000);
//     });
// }

// for (const glyph of articleHearts) {
//   glyph.addEventListener("click", likeCallback);
// }



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
