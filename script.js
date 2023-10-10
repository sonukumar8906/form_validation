const form = document.querySelector("form");
const main_data = document.querySelector(".data");

form.addEventListener("submit", (e) => {
  let user_name = e.target.uname.value;
  let user_email = e.target.email.value;
  let user_phone = e.target.phone.value;
  let checkStatus = 0;
  e.preventDefault();

  let store_value = JSON.parse(localStorage.getItem("key_values"));
  if (!store_value) {
    store_value = [];
  }
  for (let v of store_value) {
    if (v.email == user_email || v.phone == user_phone) {
      checkStatus = 1;
      break;
    }
  }
  if (checkStatus == 1) {
    alert("your email and phone number already exit");
  } else {
    let user_data = { name: user_name, email: user_email, phone: user_phone };
    store_value.push(user_data); //if the store_value is empty, push the user
    localStorage.setItem("key_values", JSON.stringify(store_value));
    //  reset the input box
    e.target.reset();
    showUserData();
  }
});

const showUserData = () => {
  let str = "";
  let store_value = JSON.parse(localStorage.getItem("key_values"));
  if (!store_value) {
    store_value = [];
  }
  store_value.forEach((element, index) => {
    str += `
   <div class="item">
   <span onclick="removeData(${index})">&times</span>
    <h4>Name</h4>
    <div>${element.name}</div>
    
    <h4>email</h4>
    <div>${element.email}</div>
    
    <h4>phone</h4>
    <div>${element.phone}</div>

  </div>
   `;
  });
  main_data.innerHTML = str;
};
showUserData();

// delete button function
const removeData = (i) => {
  let store_value = JSON.parse(localStorage.getItem("key_values"));
  if (!store_value) {
    store_value = [];
  }
  store_value.splice(i, 1);
  localStorage.setItem("key_values", JSON.stringify(store_value));
  showUserData();
};

// clear all function here write
clear_all.addEventListener("click", () => {
  localStorage.clear(clear_all);
  showUserData();
});
