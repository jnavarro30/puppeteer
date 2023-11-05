// import axios from "axios";

const containerElement = document.getElementsByClassName("container")[0];

const fetchHTML = () => {
  fetch("http://localhost:3000/html")
    .then(response => response.json())
    .then(json => {
      console.log(json);
      containerElement.innerHTML = JSON.parse(json);
    })
    .catch(err => {
      console.log(err);
    });
};

fetchHTML();
