//create one object to store input values
const inputValues = {
  VName: "",
  Vmail: "",
  Vdob: "",
};
const itemLists = document.querySelector(".item-list");
const additembtn = document.getElementById("add-item-btn");
const servRes = document.querySelector(".ser-res");
//value of name
const Name = document.getElementById("name");
//value of email
const mail = document.getElementById("mail");
//value of dob
const dob = document.getElementById("dob");
//adding event listner on the add items button

additembtn.addEventListener("click", function (event) {
  event.preventDefault();

  const enteredText = Name.value + " " + mail.value + " " + dob.value;
  inputValues.VName = Name.value;
  inputValues.Vmail = mail.value;
  inputValues.Vdob = dob.value;
  let textNode = document.createTextNode(enteredText);

  //adding into newLi
  //creating new list element, edit button and delete button
  const newLi = document.createElement("li");
  newLi.setAttribute("class", "new-item");
  const editbtn = document.createElement("button");
  editbtn.setAttribute("class", "btn-btn");
  editbtn.innerText = "EDIT";
  const dltbtn = document.createElement("button");
  dltbtn.setAttribute("class", "btn-btn");
  dltbtn.innerText = "DELETE";

  // newLi.appendChild(textNode);
  // newLi.append(editbtn, dltbtn);
  // console.log(newLi);
  // itemLists.appendChild(newLi);
  //calling the axios server
  axios
    .post(
      "https://crudcrud.com/api/0c381dbe42b24c6e96f2c6fb05219735/appontDetails",
      inputValues
    )
    .then((response) =>{  
      
      newLi.appendChild(textNode);
       newLi.append(editbtn, dltbtn);
      // console.log(newLi);
      itemLists.appendChild(newLi);
      
    })
    .catch((error) =>{
      newLi.appendChild(document.createTextNode("some error exist"));
      itemLists.appendChild(newLi);
    });
    

  //on delete delete the list item
  dltbtn.addEventListener("click", () => newLi.remove());
  //on edit ,edit the list item
  editbtn.addEventListener("click", () => {
    document.getElementById("name").value = inputValues.VName;
    document.getElementById("mail").value = inputValues.Vmail;
    document.getElementById("dob").value = inputValues.Vdob;
    newLi.remove();
  });
  console.log(inputValues);

  


  Name.value = "";
  mail.value = "";
  dob.value = "";
});

document.addEventListener("DOMContentLoaded", (event) => {
  axios
    .get(
     "https://crudcrud.com/api/0c381dbe42b24c6e96f2c6fb05219735/appontDetails?_limit=5"
    )
    .then((response) => 
    {
      for(let i=0;i<response.data.length;i++)
      {
        servRes.appendChild(document.createTextNode(JSON.stringify(response.data[i])))
      }
    })
    .catch((error) => servRes.appendChild(document.createTextNode(JSON.stringify(error))));
});
// axios
//     .get(
//      "https://crudcrud.com/api/0c381dbe42b24c6e96f2c6fb05219735/appontDetails"
//     )
//     .then((response) => 
//     {
//       for(let i=0;i<response.data.length;i++)
//       {
//         servRes.appendChild(document.createTextNode(JSON.stringify(response.data[i])))
//       }
//     })
//     .catch((error) => servRes.appendChild(document.createTextNode(JSON.stringify(response))));


    