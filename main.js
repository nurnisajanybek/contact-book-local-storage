let btnadd = document.querySelector(".btn-add");
let inpname = document.querySelector(".inp-name");
let inpemail = document.querySelector(".inp-email");
let inpimg = document.querySelector(".inp-image");
let list = document.querySelector(".contact-list");

btnadd.addEventListener("click", (e) => {
  if (!inpname.value.trim()) {
    alert("fill");
    return;
  } else if (!inpemail.value.trim()) {
    alert("fill");
    return;
  } else if (!inpimg.value.trim()) {
    alert("filll");
    return;
  }

  let obj = {
    name: inpname.value,
    email: inpemail.value,
    image: inpimg.value,
  };
  setItemToStorage(obj);
  createElement();
  inpname.value = "";
  inpemail.value = "";
  inpimg.value = "";
});

createElement();

function setItemToStorage(info) {
  let data = JSON.parse(localStorage.getItem("contact"));
  data.push(info);
  localStorage.setItem("contact", JSON.stringify(data));
}

function createElement() {
  list.innerHTML = "";
  if (!localStorage.getItem("contact")) {
    localStorage.setItem("contact", "[]");
  }

  let newData = JSON.parse(localStorage.getItem("contact"));
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    let btnEdit = document.createElement("button");
    let btnDelete = document.createElement("button");

    li.innerHTML = `Name : ${item.name}  email: ${item.email}  image : <img src="${item.image}"> <img/>`;
    btnEdit.innerHTML = "EDIT";
    btnDelete.innerHTML = "DELETE";

    li.append(btnEdit);
    li.appendChild(btnDelete);

    btnDelete.addEventListener("click", () => {
      deleteLi(index);
    });

    btnEdit.addEventListener("click", () => {
      editLi(index, item);
    });
    list.appendChild(li);
  });
}

function deleteLi(li) {
  let data = JSON.parse(localStorage.getItem("contact"));
  data.splice(li, 1);
  localStorage.setItem("contact", JSON.stringify(data));
  createElement();
}

let mainModal = document.querySelector(".main-modal");
let inpedit1 = document.querySelector(".inp-edit1");
let inpedit2 = document.querySelector(".inp-edit2");
let inpedit3 = document.querySelector(".inp-edit3");
let btnClose = document.querySelector(".btn-close");

function editLi(index, item) {
  mainModal.style.display = "block";
  inpedit1.setAttribute("id", index);
  inpedit1.value = item.name;
  inpedit2.setAttribute("id", index);
  inpedit2.value = item.emal;
  inpedit3.setAttribute("id", index);
  inpedit3.value = item.image;
}

let btnsave = document.querySelector(".btn-save");
btnsave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("contact"));
  let index = inpedit1.id;
  let newObj = {
    name: inpedit1.value,
    email: inpedit2.value,
    image: inpedit3.value,
  };
  data.splice(index, 1, newObj);
  localStorage.setItem("contact", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});

btnClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});
