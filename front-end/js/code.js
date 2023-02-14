const urlBase = 'http://group10spring23.me/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

let pageNum = 1;
let contactsNum = 7;
let currentContacts = 0;
let totalContacts = 0;
let totalPages = 0;

function doLogin(){
    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;

    if(validLogin(login, password) == false){
        document.getElementById("loginResult").innerHTML = "Invalid login, please try again";
    }

    document.getElementById("loginResult").innerHTML = "";

    let tmp = {Login: login,
                Password: password};

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/Login." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try{
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if(userId < 1){
                    document.getElementById("loginResult").innerHTML = "* Either Username or Password is incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;
                saveCookie();

                window.location.href = "contacts.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){
        document.getElementById("loginResult").innerHTML = err.message;
    }
}

function doRegister(){
    userId = 0;
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    
    let username = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let email = document.getElementById("email").value;
    
    if(validRegister(firstName, lastName, username, password, email) == false){
        document.getElementById("registerResult").innerHTML = "invalid register, please try again";
        console.log("error");
        return;
    }
    console.log("error");
    document.getElementById("registerResult").innerHTML = "";

    let tmp = {
        FirstName: firstName,
        LastName: lastName,
        Login: username,
        Password:password,
        Email: email,
        Phone: phoneNumber};
    
    let jsonPayload = JSON.stringify(tmp);
    
    let url = urlBase + "/Register." + extension;
    console.log(tmp);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-type", "application/json; charset= UTF-8");
    try{
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4){
                console.log("readyState: " + this.readyState);
                return;
            }
            if(xhr.status == 409){
                document.getElementById("registerResult").innerHTML = "User already exists";
                console.log("error");
            }
            if(xhr.status == 200){
                console.log("error");
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;
                document.getElementById("registerResult").innerHTML = "User added";
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;
                saveCookie();
                window.location.href = "index.html";
            }
        };
        xhr.send(jsonPayload);
        console.log("error");
    }
    catch(err){
        console.log("error");
        document.getElementById("registerResult").innerHTML = err.message;
    }
}

function saveCookie(){
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
    else
	{
        firstName = firstName[0].toUpperCase() + firstName.substring(1);
        lastName = lastName[0].toUpperCase() + lastName.substring(1);
		document.getElementById("welcomeName").innerHTML = "Welcome to Paradise " + firstName + " " + lastName;
	}
}

function validRegister(firstName, lastName, username, password, email){
    var fNameFlag, lastNameFlag, userFlag, passFlag, emailFlag;
    fNameFlag = lastNameFlag = userFlag = passFlag = emailFlag = true;

    if(firstName == ""){
        document.getElementById("registerResult").innerHTML = "First Name is blank";
        console.log("error");
    }
    else{
        fNameFlag = false;
    }

    if(lastName == ""){
        console.log("error");
        document.getElementById("registerResult").innerHTML = "Last Name is blank";
    }
    else{
        lastNameFlag = false;
    }
    
    if(username == ""){
        console.log("error");
        document.getElementById("registerResult").innerHTML = "Username is blank";
    }
    else{
        var userCheck = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{2,19}$/g;
        if(userCheck.test(username) == false){
            document.getElementById("registerResult").innerHTML = "Username is not valid";
            console.log("error");
        }
        else{
            userFlag = false;
        }
    }

    if(password == ""){
        document.getElementById("registerResult").innerHTML = "Password is blank";
        console.log("error");
    }
    else{
        /*var passCheck = /(?=.*\d)(?=.*[A-Za-z]).{8,32}/g;*/
        var passCheck = /(?=.*[A-Za-z0-9]).{7,33}/g;
        if((passCheck.test(password) == false)){
            document.getElementById("registerResult").innerHTML = "Password is not valid";
            console.log("error");
        }
        else{
            passFlag = false;
            console.log("error");
        }
    }

    if(email == ""){
        document.getElementById("registerResult").innerHTML = "Email Address is blank";
        console.log("error");
    }
    else{
        var emailCheck = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-z]+$/g;
        if(emailCheck.test(email) == false){
            document.getElementById("registerResult").innerHTML = "Email Address is not valid";
            console.log("error");
        }
        else{
            emailFlag = false;
        }
    }

    if((fNameFlag || lastNameFlag || userFlag || passFlag || emailFlag) == true){
        return false;
        console.log("error");
    }
    return true;
}

function validLogin(username, password){
    var userFlag, passFlag;
    userFlag = passFlag = true;

    if(username == ""){
        document.getElementById("loginResult").innerHTML = "username is blank";
    }
    else{
        var userCheck = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{2,19}$/g;
        if(userCheck.test(username) == false){
            document.getElementById("loginResult").innerHTML = "username is invalid";
        }
        else{
            userFlag = false;
        }
    }

    if(password == ""){
        document.getElementById("loginResult").innerHTML = "Password is blank";
    }
    else{
        var passCheck = /([a-zA-Z0-9]).{7,33}/g;
        if((passCheck.test(password) == false)&& password.length >= 8 && password.length <= 32){
            document.getElementById("loginResult").innerHTML = "Password is invalid";
        }
        else{
            passFlag = false;
        }
    }

    if((userFlag || passFlag) == true){
        return false;
    }
    return true;
}

function showContacts(search){
    let tmp ={
        Search: search,
        UserID: userId,
        PageNumber: pageNum,
        ResultsPerPage: contactsNum
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/SearchContactsPagination." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try{
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let jsonObject = JSON.parse(xhr.responseText);
                if(jsonObject.error){
                    document.getElementById("tBody").innerHTML = "<tBody style='display:none;'></tbody>"
                    console.log(jsonObject.error);
                    return;
                }
                let text = "<table border='1'>";
                for(let i = 0; i <jsonObject.results.length; i++){
                    currentContacts = i;
                    text = text + "<tr id = 'tableRow'>";
                    text = text + "<td style='display:none;' id = 'contactID" + i + "'>" + jsonObject.results[i].ContactID + "</td>"
                    text = text + "<td id='firstName" + i + "'><span>" + jsonObject.results[i].FirstName + "</span></td>";
                    text = text + "<td id='lastName" + i + "'><span>" + jsonObject.results[i].LastName + "</span></td>";
                    text = text + "<td id='email" + i + "'><span>" + jsonObject.results[i].Email + "</span></td>";
                    text = text + "<td id='phone" + i + "'><span>" + jsonObject.results[i].Phone + "</span></td>";
                    text = text + '<td><button type ="button" id ="editBtn' + i + '" class ="submit-btn" onclick ="editContact(' + i+ ');"'
                                + 'title="Edit" date-toggle="tooltip"/><i class ="material-icons">&#xE254;</i></button>';
                    text = text + '<button type ="button" id ="confirmBtn' + i + '" class ="submit-btn" onclick ="saveContact(' + i + ');"'
                                + 'title="Confirm" date-toggle="tooltip" style="display:none;"/><i class ="material-icons">&#xE03B;</i></button>';
                    text = text + '<button type ="button" id ="deleteBtn' + i + '" class ="submit-btn" onclick ="deleteContact(' + i + ');"'
                                + 'title="Delete" date-toggle="tooltip"/><i class ="material-icons">&#xE872;</i></button></td>';
                    text = text + "</tr>";
                    totalContacts = jsonObject.totalrecords;
                    totalPages = jsonObject.totalpages;
                    getContactNum();
                }
                text = text + "</table>"
                document.getElementById("tBody").innerHTML = text;
                disablePrev();
            }
        }
        xhr.send(jsonPayload);
    }
    catch(error){
        console.log(error.message);
    }
}

function doLogout(){
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact(){
    let firstNameAdd = document.getElementById("firstNameAdd").value;
    let lastNameAdd = document.getElementById("lastNameAdd").value;
    let emailAdd = document.getElementById("emailAdd").value;
    let phoneAdd = document.getElementById("phoneNumberAdd").value;

    if(validAdd(firstNameAdd, lastNameAdd, emailAdd, phoneAdd) == false){
        document.getElementById("contactAddResult").innerHTML = "Invalid Contact, Please check information again"
        return;
    }
    document.getElementById("contactAddResult").innerHTML = "";
	let tmp = {FirstName: firstNameAdd,
                LastName: lastNameAdd,
                Phone: phoneAdd,
                Email: emailAdd,
                UserID: userId};

	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type" , "application/json; charset=UTF-8");
    try{
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                document.getElementById("addContactForm").reset();
                currentContacts++;
                totalContacts++;
                pageNum = 1;
                showContacts("");
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){
        document.getElementById("contactAddResult").innerHTML = err.message;
        console.log(err.message);
    }
    closeAdd();
}

/*function validAdd(firstName, lastName, email, phone){
    var fNameFlag, lNameFlag, emailFlag, phoneFlag;
    fNameFlag = lNameFlag = emailFlag = phoneFlag = true;

    if(firstName == "")
        document.getElementById("contactAddResult").innerHTML = "First Name is invalid";
    else
        fNameFlag = false;
    if(lastName == "")
        document.getElementById("contactAddResult").innerHTML = "Last Name is invalid";
    else
        lNameFlag = false;
    
    if(email == "")
        document.getElementById("contactAddResult").innerHTML = "Email Address is blank";
    else{
        var emailCheck = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-z]+$/g;
        if(emailCheck.test(email) == false){
            document.getElementById("contactAddResult").innerHTML = "Email Address is invalid";
        }
        else{
            emailFlag = false;
        }
    }

    if(phone == "")
        document.getElementById("contactAddResult").innerHTML = "Phone Number is blank";
    else{
        var phoneCheck = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g;
        if(phoneCheck.test(phone) == false){
            document.getElementById("contactAddResult").innerHTML = "Phone Number is invalid";
        }
        else{
            phoneFlag = false;
        }
    }

    if((fNameFlag || lNameFlag || emailFlag || phoneFlag) == true){
        return false;
    }

    return true;
}*/

function openAdd(){
    document.getElementById("addContactPopup").style.display = "block";
    document.getElementById('blur').classList.toggle('active');
    console.log("in openAdd");
}

function closeAdd(){
    document.getElementById("addContactPopup").style.display = "none";
    document.getElementById('blur').classList.toggle('active');
    document.getElementById("addContactForm").reset();
}

function editContact(id){
    document.getElementById("confirmBtn" + id).style.display = "inline-block";
    document.getElementById("editBtn" + id).style.display = "none";

    let firstNameEdit = document.getElementById("firstName" + id).innerText;
    let lastNameEdit = document.getElementById("lastName" + id).innerText;
    let emailEdit = document.getElementById("email" + id).innerText;
    let phoneEdit = document.getElementById("phone" + id).innerText;

    document.getElementById("firstName" + id).innerHTML = "<input type ='text' id='firstNameEdit" + id + "' value='" + firstNameEdit + "' class='editFirstName'>";
    document.getElementById("lastName" + id).innerHTML = "<input type ='text' id='lastNameEdit" + id + "' value='" + lastNameEdit + "' class='editLastName'>";
    document.getElementById("email" + id).innerHTML = "<input type ='text' id='emailEdit" + id + "' value='" + emailEdit + "'class='editEmail'>";
    document.getElementById("phone" + id).innerHTML = "<input type ='text' id='phoneEdit" + id + "' value='" + phoneEdit + "'class='editPhone'>";
}

function saveContact(id){
    var firstNameSave = document.getElementById("firstNameEdit" + id).value;
    var lastNameSave = document.getElementById("lastNameEdit" + id).value;
    var emailSave = document.getElementById("emailEdit" + id).value;
    var phoneSave = document.getElementById("phoneEdit" + id).value;
    var contactIDSave = document.getElementById("contactID" + id).innerText;
    
    document.getElementById("firstName" + id).innerHTML = firstNameSave;
    document.getElementById("lastName" + id).innerHTML = lastNameSave;
    document.getElementById("email" + id).innerHTML = emailSave;
    document.getElementById("phone" + id).innerHTML = phoneSave;

    document.getElementById("confirmBtn" + id).style.display = "none";
    document.getElementById("editBtn" + id).style.display = "inline-block";

    let tmp = { FirstName: firstNameSave,
                LastName: lastNameSave,
                Phone: phoneSave,
                Email: emailSave,
                UserID: userId,
                ContactID: contactIDSave
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/UpdateContact." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try{
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log("contact updated");
                showContacts("");
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){
        console.log(err.message);
    }
}


function deleteContact(i){
    console.log("totalContact: " + totalContacts);
    console.log("currentContacts: " + currentContacts);
    let firstNameDlt = document.getElementById("firstName" + i).innerText;
    let lastNameDlt = document.getElementById("lastName" + i).innerText;
    let contactId = document.getElementById("contactID" + i).innerText;
    console.log("firstName" + i + " = " + firstNameDlt);
    let alert = confirm("Are you sure you want to delete " + firstNameDlt + " " + lastNameDlt);
    if(alert == true){
            let tmp = { ContactID: contactId,
                        FirstName: firstNameDlt,
                        LastName: lastNameDlt,};

        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + "/DeleteContact." + extension;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try{
            xhr.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    currentContacts--;
                    totalContacts--;
                    pageNum = 1;
                    showContacts("");
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err){
            console.log(err.message);
        }
    }
    else{
        console.log("Contact deletion canceled");
    }
}


function searchContact(){
    let search = document.getElementById("search_input").value;
    console.log("in search: " + search);
    pageNum = 1;
    showContacts(search);
}

function showNextPage(){
    pageNum++;
    showContacts("");
    disableNext();
}

function showPrevPage(){
    pageNum--;
    disablePrev();
    showContacts("");
}
function ready(){
    document.getElementById("prevBtn").style.pointerEvents = "none";
    document.getElementById("prevBtn").style.cursor = "default";
    document.getElementById("prev").style.backgroundColor = "lightgrey";
}
function disablePrev(){
    if(pageNum == 1){
        document.getElementById("prevBtn").style.pointerEvents = "none";
        document.getElementById("prevBtn").style.cursor = "default";
        document.getElementById("prev").style.backgroundColor = "lightgrey";
    }
    document.getElementById("nextBtn").style.pointerEvents = "auto";
    document.getElementById("nextBtn").style.cursor = "pointer";
    document.getElementById("next").style.backgroundColor = "white";
}

function disableNext(){
    console.log("totalPages: " + totalPages);
    console.log("CurrentPage: " + pageNum);
    console.log("bool :" + (pageNum >= (totalPages - 2)));
    if(pageNum >= (totalPages - 2)){
        document.getElementById("nextBtn").style.pointerEvents = "none";
        document.getElementById("nextBtn").style.cursor = "default";
        document.getElementById("next").style.backgroundColor = "lightgrey";
    }
    document.getElementById("prevBtn").style.pointerEvents = "auto";
    document.getElementById("prevBtn").style.cursor = "pointer";
    document.getElementById("prev").style.backgroundColor = "white";

}


function getContactNum(){
    contactMod = pageNum * contactsNum;
    let secondNum = pageNum * (currentContacts + 1);
    if(currentContacts != (contactsNum - 1)){
        secondNum = totalContacts;
    }
    document.getElementById("contactCount").innerHTML = (contactMod - (contactsNum - 1)) + "-" + secondNum + " of " + totalContacts;
}