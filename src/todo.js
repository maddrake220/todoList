const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishList = document.querySelector(".js-finishList");

const TODOS_LS = "toDos";
const FINISH_TODOS_LS = "finishToDos";

let toDos = [];
let finishToDos = [];

function createUUID() {
  let dt = new Date().getTime();

  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );

  return uuid;
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function savefinishToDos() {
  localStorage.setItem(FINISH_TODOS_LS, JSON.stringify(finishToDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const stagingBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");

  stagingBtn.addEventListener("click", stagingTodo);
  delBtn.addEventListener("click", deleteTodo);
  const newId = createUUID();
  stagingBtn.innerText = "🏴";
  delBtn.innerText = "❌";
  span.innerText = text;
  li.appendChild(stagingBtn);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  console.log(toDos);
  saveToDos();
}

function unstagingpaintToDo(text) {
  const li = document.createElement("li");
  const stagingBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");

  stagingBtn.addEventListener("click", stagingTodo);
  delBtn.addEventListener("click", deleteTodo);
  const newId = createUUID();
  stagingBtn.innerText = "🏴";
  delBtn.innerText = "❌";
  span.innerText = text.text;
  li.appendChild(stagingBtn);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text.text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function deleteTodo(e) {
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== li.id;
  });
  toDos = cleanToDos;
  saveToDos();
}

function deletefinishToDo(e) {
  const btn = e.target;
  const li = btn.parentNode;
  finishList.removeChild(li);
  const cleanToDos = finishToDos.filter(function (toDo) {
    return toDo.id !== li.id;
  });
  finishToDos = cleanToDos;
  savefinishToDos();
}

function unstagingfinishToDo(e) {
  const btn = e.target;
  const list = btn.parentNode;
  const text = finishToDos.filter(function (toDo) {
    if (toDo.id === list.id) {
      return toDo.text;
    }
  });

  console.log(text);
  finishList.removeChild(list);
  const cleanToDos = finishToDos.filter(function (toDo) {
    return toDo.id !== list.id;
  });
  finishToDos = cleanToDos;
  savefinishToDos();

  unstagingpaintToDo(text[0]);
}

function stagingTodo(e) {
  const btn = e.target;
  const list = btn.parentNode;
  const text = toDos.filter(function (toDo) {
    if (toDo.id === list.id) {
      return toDo.text;
    }
  });

  console.log(text);

  toDoList.removeChild(list);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== list.id;
  });

  toDos = cleanToDos;
  saveToDos();

  paintfinishToDo(text[0]);
}

function lpaintfinishToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const unStagingBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.addEventListener("click", deletefinishToDo);
  unStagingBtn.addEventListener("click", unstagingfinishToDo);
  const newId = createUUID();
  delBtn.innerText = "❌";
  unStagingBtn.innerText = "‍🍏";

  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(unStagingBtn);
  li.appendChild(span);
  li.id = newId;
  finishList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  finishToDos.push(toDoObj);
  savefinishToDos();
}

function paintfinishToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const unStagingBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.addEventListener("click", deletefinishToDo);
  unStagingBtn.addEventListener("click", unstagingfinishToDo);
  const newId = createUUID();
  delBtn.innerText = "❌";
  unStagingBtn.innerText = "‍🍏";

  span.innerText = text.text;
  li.appendChild(delBtn);
  li.appendChild(unStagingBtn);
  li.appendChild(span);
  li.id = newId;
  finishList.appendChild(li);

  const toDoObj = {
    text: text.text,
    id: newId,
  };
  finishToDos.push(toDoObj);
  savefinishToDos();
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadfinishToDos() {
  const loadedToDos = localStorage.getItem(FINISH_TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      lpaintfinishToDo(toDo.text);
    });
  }
}
function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue === "") {
    alert("Write Something...");
    return false;
  }
  paintToDo(currentValue);
  toDoInput.value = "";
}
function init() {
  loadToDos();
  loadfinishToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
