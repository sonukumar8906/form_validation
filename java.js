const form = document.querySelector("form");
const main_data = document.querySelector(".data");
form.addEventListener("submit", (e) => {
  let name = e.target.uname.value;
  let email = e.target.email.value;
  let phone = e.target.phone.value;
  let match_data = 0;

  let my_data = JSON.parse(localStorage.getItem("data_details"));
  if (!my_data) {
    my_data = [];
  }
  for (let v of my_data) {
    if (v.email == email || v.phone == phone) {
      match_data = 1;
      console.log(match_data);
    }
  }

  if (match_data == 1) {
    alert("phone number or email address already exit");
  } else {
    my_data.push({
      name: name,
      email: email,
      phone: phone,
    });
  }
  localStorage.setItem("data_details", JSON.stringify(my_data));
  e.target.reset();
  displayData();
  // console.log(name, email , phone)
  e.preventDefault();
});

const displayData = () => {
  let my_data = JSON.parse(localStorage.getItem("data_details"));
  if (!my_data) {
    my_data = [];
  }
  // console.log(my_data);
  let show_data = "";
  my_data.forEach((element, i) => {
    show_data += `
 <div class="item">
   <span onclick="removeData(${i})">&times</span>
    <h4>Name</h4>
    <div>${element.name}</div>
    
    <h4>email</h4>
    <div>${element.email}</div>
    
    <h4>phone</h4>
    <div>${element.phone}</div>

  </div>
 `;
  });
  main_data.innerHTML = show_data;
};

const removeData = (index) => {
  let my_data = JSON.parse(localStorage.getItem("data_details"));
  if (!my_data) {
    my_data = [];
  }
  my_data.splice(index, 1);
  localStorage.setItem("data_details", JSON.stringify(my_data));
  displayData();
};
displayData();

clear_all.addEventListener('click', () => {
    localStorage.clear("data_details")
    displayData();
})
