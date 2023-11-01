var selectedRow = null

var fname = document.getElementById("name").value;
var phone = document.getElementById("phone").value;
var email = document.getElementById("email").value;
var course = document.getElementById("course").value;
var price = document.getElementById("price").value;
var date = document.getElementById("date").value;
var linkedin = document.getElementById("linkedin").value;
var github = document.getElementById("github").value;
var behance = document.getElementById("behance").value;

const errorContainer = document.getElementById("error")

var id = 0;

let formImage = document.getElementById("formImage");
let picture = document.getElementById("picture");

let storeImg = []

picture.onchange = function(){
    formImage.src = URL.createObjectURL(picture.files[id]);
    storeImg.push(picture.files[id])
    
}

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
    hideData();
}


function readFormData() {
    var formData = {};
    formData["id"] = id;
    formData["name"] = document.getElementById("name").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["email"] = document.getElementById("email").value;
    formData["course"] = document.getElementById("course").value;
    formData["price"] = document.getElementById("price").value;
    formData["date"] = document.getElementById("date").value;
    formData["linkedin"] = document.getElementById("linkedin").value;
    formData["github"] = document.getElementById("github").value;
    formData["behance"] = document.getElementById("behance").value;
    return formData;
}

function insertNewRecord(data) {
    id++;
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = id;
    cell1.setAttribute("class","block-600");
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = `<img src="${storeImg[id]}">`;
    cell2.setAttribute("class","block-600");
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.name;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.phone;
    cell4.setAttribute("class","block-600");
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.email;
    cell5.setAttribute("class","block-600");
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.course;
    cell6.setAttribute("class","block-600");
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.price;
    cell7.setAttribute("class","block-600");
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = `<i class="fa-solid fa-pen-to-square" onClick="onEdit(this)"></i>`;
    cell9 = newRow.insertCell(8);
    cell9.innerHTML = `<i class="fa-solid fa-trash-can" onClick="onDelete(this)"></i>`;
    cell10 = newRow.insertCell(9);
    cell10.innerHTML = `<i class="fa-solid fa-file-lines" onClick="onInfo(this)"></i>`;
    cell11 = newRow.insertCell(10);
    cell11.innerHTML = `<span class="none">${data.linkedin}</span>`;
    cell12 = newRow.insertCell(11);
    cell12.innerHTML = `<span class="none">${data.github}</span>`;
    cell13 = newRow.insertCell(12);
    cell13.innerHTML = `<span class="none">${data.behance}</span>`;
    cell14 = newRow.insertCell(13);
    cell14.innerHTML = `<span class="none">${data.date}</span>`;
    errorContainer.classList.add("primary-bg");
    errorContainer.innerHTML = `<p class="primary">Data created successfully <i class="fa-solid fa-clipboard-check"></i></p>`;
    setTimeout(function(){
        errorContainer.classList.remove("primary-bg")
        errorContainer.innerHTML = "";
    },3000);
}

function resetForm() {
    document.getElementById("formId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("formImage").setAttribute("src","images/profile.png");
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
    document.getElementById("price").value = "";
    document.getElementById("date").value = "";
    document.getElementById("linkedin").value = "";
    document.getElementById("github").value = "";
    document.getElementById("behance").value = "";
    document.getElementById("submitBtn").value = "Create";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("formId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("name").value = selectedRow.cells[2].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
    document.getElementById("email").value = selectedRow.cells[4].innerHTML;
    document.getElementById("course").value = selectedRow.cells[5].innerHTML;
    document.getElementById("price").value = selectedRow.cells[6].innerHTML;
    document.getElementById("date").value = selectedRow.cells[13].innerHTML;
    document.getElementById("linkedin").value = selectedRow.cells[10].textContent;
    document.getElementById("github").value = selectedRow.cells[11].textContent;
    document.getElementById("behance").value = selectedRow.cells[12].textContent;
    document.getElementById("submitBtn").value = "Update";
    submitBtnColor();
}

function updateRecord(formData) {
    console.log(formData);
    selectedRow.cells[0].innerHTML = document.getElementById("formId").value;
    selectedRow.cells[1].innerHTML = `<img src="${storeImg[id]}">`;
    selectedRow.cells[2].innerHTML = formData.name;
    selectedRow.cells[3].innerHTML = formData.phone;
    selectedRow.cells[4].innerHTML = formData.email;
    selectedRow.cells[5].innerHTML = formData.course;
    selectedRow.cells[6].innerHTML = formData.price;
    selectedRow.cells[7].innerHTML = `<i class="fa-solid fa-pen-to-square" onClick="onEdit(this)"></i>`;
    selectedRow.cells[8].innerHTML = `<i class="fa-solid fa-trash-can" onClick="onDelete(this)"></i>`;
    selectedRow.cells[9].innerHTML = `<i class="fa-solid fa-file-lines" onClick="onInfo(this)"></i>`;
    selectedRow.cells[10].innerHTML = `<span class="none">${formData.linkedin}</span>`;
    selectedRow.cells[11].innerHTML = `<span class="none">${formData.github}</span>`;
    selectedRow.cells[12].innerHTML = `<span class="none">${formData.behance}</span>`;
    selectedRow.cells[13].innerHTML = `<span class="none">${formData.date}</span>`;
    document.getElementById("submitBtn").value = "Create";
    errorContainer.classList.add("success-bg");
    errorContainer.innerHTML = `<p class="success">Data updated successfully <i class="fa-solid fa-file-pen"></i></p>`;
    setTimeout(function(){
        errorContainer.classList.remove("success-bg")
        errorContainer.innerHTML = "";
    },3000)
    submitBtnColor();
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
        errorContainer.classList.add("danger-bg");
        errorContainer.innerHTML = `<p class="danger">Data deleted successfully <i class="fa-solid fa-eraser"></i></p>`;
        setTimeout(function(){
            errorContainer.classList.remove("danger-bg")
            errorContainer.innerHTML = "";
        },3000)
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("name").value == "") {
        isValid = false;
        errorContainer.classList.add("danger-bg")
        errorContainer.innerHTML = `<p class="danger">Fill up the required fields <i class="fa-solid fa-triangle-exclamation"></i></p>`;
        setTimeout(function(){
            errorContainer.classList.remove("danger-bg")
            errorContainer.innerHTML = "";
        },3000)
    } else {
        isValid = true;
        // if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
        //     document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}


function hideData(){
    const tCol = document.querySelectorAll(".none");

    tCol.forEach(function(col){
    if (col.classList.contains("none")) {
        col.parentElement.style.display = "none";
    }
})
}

function submitBtnColor(){
    if(document.getElementById("submitBtn").value == "Create"){
        document.getElementById("submitBtn").style.backgroundColor = "#2194ff";
        document.getElementById("submitBtn").style.color = "#fff";
    }
    
    if(document.getElementById("submitBtn").value == "Update"){
        document.getElementById("submitBtn").style.backgroundColor = "#4BB543";
        document.getElementById("submitBtn").style.color = "#fff";
    }
}

submitBtnColor();

var scrollHeight;

function onInfo(td){

    scrollHeight = window.scrollY;

    if (scrollHeight > 70) {
        document.getElementById("moreInfo").style.top = (scrollHeight + 40 + "px");
        document.querySelector("body").classList.add("body-bg");
    }else{
        document.getElementById("moreInfo").style.top = (scrollHeight + 80 + "px");
        document.querySelector("body").classList.add("body-bg");
    }


    const rowSelected = td.parentElement.parentElement;
    document.getElementById("infoName").innerHTML = rowSelected.cells[2].innerHTML;
    document.getElementById("infoPhone").innerHTML = rowSelected.cells[3].innerHTML;
    document.getElementById("infoEmail").innerHTML = rowSelected.cells[4].innerHTML;
    document.getElementById("infoCourse").innerHTML = rowSelected.cells[5].innerHTML;
    document.getElementById("infoPrice").innerHTML = rowSelected.cells[6].innerHTML;
    document.getElementById("infoDate").innerHTML = rowSelected.cells[13].innerHTML;
    document.getElementById("infoLinkedin").innerHTML = ` <a href="${rowSelected.cells[10].lastChild.innerHTML}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>`;
    document.getElementById("infoGithub").innerHTML = ` <a href="${rowSelected.cells[11].lastChild.innerHTML}" target="_blank"><i class="fa-brands fa-square-github"></i></a>`;
    document.getElementById("infoBehance").innerHTML = ` <a href="${rowSelected.cells[12].lastChild.innerHTML}" target="_blank"><i class="fa-brands fa-square-behance"></i></a>`;
}

function closeInfo(){

    if (scrollHeight > 70) {
        document.getElementById("moreInfo").style.top = "-" + (scrollHeight + 510) + "px";
        document.querySelector("body").classList.remove("body-bg");
    } else {
        document.getElementById("moreInfo").style.top = "-" + (scrollHeight + 550) + "px";
        document.querySelector("body").classList.remove("body-bg"); 
    }
}




