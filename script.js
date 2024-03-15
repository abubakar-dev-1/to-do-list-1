let note = JSON.parse(localStorage.getItem("list")) || [];
let state;
function saveNoteToLocalStorage() {
  localStorage.setItem("list", JSON.stringify(note));
}
if (note) {
    for (let index = note.length-1; index >= 0; index--) {
      console.log("length: ", note.length-1);
      const element = note[index];
      if (note[index].check === true) {
        console.log("inn")
        note.splice(index, 1);
      } else {
        let p = document.createElement("p");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        console.log("todos:", note[index].toDos);
        p.innerHTML = note[index].toDos;
        p.prepend(checkbox);
        p.innerHTML += "<hr>";
        document.querySelector(".note").prepend(p);
        console.log("hi");
      }
      if (note.length === 1) {
        const lastCheckbox = document.querySelector(".note input[type='checkbox']");
        if (lastCheckbox===true) {
          console.log("parent")
          lastCheckbox.parentElement.remove();
          note.splice(index, 0);
        }
      }
    }
    saveNoteToLocalStorage();
};

document.querySelector("button").addEventListener("click", () => {
  let n = prompt("Enter your note");
  if (n) {
    let obj = {
      toDos: "",
      check: state,
    };
    obj.toDos = n;
    obj.check = false;
    console.log(obj.key);
    note.push(obj);
    saveNoteToLocalStorage();
    let text = document.createElement("p");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    text.innerHTML = n;
    text.prepend(checkbox);
    text.innerHTML += "<hr>";
    document.querySelector(".note").append(text);
  }
});
document.querySelector(".note").addEventListener("change", (event) => {
  if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
    const index = Array.from(
      document.querySelectorAll("input[type='checkbox']")
    ).indexOf(event.target);
    note[index].check = event.target.checked;
    console.log(".note")
    saveNoteToLocalStorage();
  }
});
const timeElapsed = Date.now();
const currentDate = new Date(timeElapsed);
let date = document.createElement("div");
date.className = "date";
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDayIndex = currentDate.getDay();
const day = daysOfWeek[currentDayIndex];
let dayHead = document.createElement("h1");
dayHead.innerHTML = day;
const options = { year: 'numeric', month: 'long', day: 'numeric' };
let formattedDate = document.createElement("span");
formattedDate.innerHTML = currentDate.toLocaleDateString(undefined, options);

document.querySelector("body").prepend(date);
date.append(dayHead);
date.append(formattedDate);
let tag = document.createElement("h1");
tag.className = "tag";
tag.innerHTML = "To-Do List";
document.querySelector("body").prepend(tag);
