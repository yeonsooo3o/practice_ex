const images = ["1.png", "2.png", "3.png", "4.jpg"];

const chosenImages = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);

const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);

("use strict");

const toDoForm = document.getElementById("todo_form");
const toDoInput = toDoForm.querySelector("#todo_form input");
const toDoList = document.getElementById("todo_list");

const TODOS_KEY = "savedToDo";

let savedToDo = [];

toDoForm.addEventListener("submit", handleToDoSubmit);

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";

  const newToDoObj = {
    text: newToDo,
    ID: Date.now()
  };
  savedToDo.push(newToDoObj);
  paintToDo(newToDoObj);
  storageToDo();
}

function paintToDo(newToDo) {
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);

  const createList = document.createElement("ul");
  createList.ID = newToDo.ID;
  const createSpan = document.createElement("span");
  createSpan.innerText = newToDo.text;

  createList.appendChild(createSpan);
  createList.appendChild(button);

  toDoList.appendChild(createList);
}

function deleteToDo(event) {
  const deleteList = event.target.parentElement;
  deleteList.remove();
  savedToDo = savedToDo.filter((toDo) => toDo.ID !== parseInt(deleteList.ID));
  storageToDo();
}

function storageToDo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(savedToDo));
}

const getSavedToDo = localStorage.getItem(TODOS_KEY);

if (getSavedToDo !== null) {
  const parsedSavedToDo = JSON.parse(getSavedToDo);

  savedToDo = parsedSavedToDo;
  parsedSavedToDo.forEach(paintToDo);
}
