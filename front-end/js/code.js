const urlBase = 'http://group10spring23.me/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

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
        return;
    }
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

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-type", "application/json; charset= UTF-8");
    try{
        xhr.onreadystatechange = function(){
            if(xhr.readyState != 4){
                console.log("error line 83");
                return;
            }
            if(xhr.status == 409){
                document.getElementById("registerResult").innerHTML = "User already exists";
            }
            if(xhr.status == 200){
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;
                document.getElementById("registerResult").innerHTML = "User added";
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;
                saveCookie();
                window.location.href = "login.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){
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
    }
    else{
        fNameFlag = false;
    }

    if(lastName == ""){
        document.getElementById("registerResult").innerHTML = "Last Name is blank";
    }
    else{
        lastNameFlag = false;
    }
    
    if(username == ""){
        document.getElementById("registerResult").innerHTML = "Username is blank";
    }
    else{
        var userCheck = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{3,18}$/g;
        if(userCheck.test(username) == false){
            document.getElementById("registerResult").innerHTML = "Username is not valid";
        }
        else{
            userFlag = false;
        }
    }

    if(password == ""){
        document.getElementById("registerResult").innerHTML = "Password is blank";
    }
    else{
        /*var passCheck = /(?=.*\d)(?=.*[A-Za-z]).{8,32}/g;*/
        var passCheck = /(?=.*[A-Za-z0-9]).{8,32}/g;
        if((passCheck.test(password) == false)){
            document.getElementById("registerResult").innerHTML = "Password is not valid";
        }
        else{
            passFlag = false;
        }
    }

    if(email == ""){
        document.getElementById("registerResult").innerHTML = "Email Address is blank";
    }
    else{
        var emailCheck = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-z]+$/g;
        if(emailCheck.test(email) == false){
            document.getElementById("registerResult").innerHTML = "Email Address is not valid";
        }
        else{
            emailFlag = false;
        }
    }

    if((fNameFlag || lastNameFlag || userFlag || passFlag || emailFlag) == true){
        return false;
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
        var userCheck = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{3,18}$/g;
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
        var passCheck = /([a-zA-Z0-9]).{8,32}/g;
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

function sayName(){
    document.getElementById("welcomeName").innerHTML = firstName + " in sayName" + lastName;
}

function showContacts(){
    let tmp ={
        Search: "",
        UserID: userId
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/SearchContacts." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try{
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let jsonObject = JSON.parse(xhr.responseText);
                if(jsonObject.error){
                    console.log(jsonObject.error);
                    return;
                }
                let text = "<table border='1'>";
                for(let i = 0; i <jsonObject.results.length; i++){
                    text = text + "<tr id = 'tableRow'>";
                    text = text + "<td contenteditable='false'><span>" + jsonObject.results[i].FirstName + "</span></td>";
                    text = text + "<td contenteditable='false'><span>" + jsonObject.results[i].LastName + "</span></td>";
                    text = text + "<td contenteditable='false'><span>" + jsonObject.results[i].Email + "</span></td>";
                    text = text + "<td contenteditable='false'><span>" + jsonObject.results[i].Phone + "</span></td>";
                    text = text + '<td><button type ="button" id ="editBtn" class ="submit-btn" onclick ="editRow();editContact();"'
                                + 'title="Edit" date-toggle="tooltip"/><i class ="material-icons">&#xE254;</i></button>';
                    text = text + '<td><button type ="button" id ="deleteBtn" class ="submit-btn" onclick ="deleteContact();"'
                                + 'title="Delete" date-toggle="tooltip"/><i class ="material-icons">&#xE872;</i></button>';
                    text = text + '<td><button type ="button" id ="confirmBtn" class ="submit-btn" onclick ="editContact();"'
                                + 'title="Confirm" date-toggle="tooltip"/><i class ="material-icons">&#xE03B;</i></button></td>';
                    text = text + "</tr>";
                }
                text = text + "</table>"
                document.getElementById("tBody").innerHTML = text;
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
                console.log("contact added");
                document.getElementById("addContactForm").reset();
                showContacts();
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){
        document.getElementById("contactAddResult").innerHTML = err.message;
        console.log(err.message);
    }
}

function openAdd(){
    document.getElementById("addContactPopup").style.display = "block";
}

function closeAdd(){
    document.getElementById("addContactPopup").style.display = "none";
}

function editContact(){
    let
}

function editRow()
{
    
}
function deleteContact(){

}