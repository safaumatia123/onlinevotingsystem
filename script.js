//const api_url = "<heroku_app_url>"
const api_url = "https://tcetvotingsystem.herokuapp.com/user"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].name}</td>`;
		table_data += `<td>${records[i].age}</td>`;
		table_data += `<td>${records[i].fathername}</td>`;
		table_data += `<td>${records[i].dob}</td>`;
		table_data += `<td>${records[i].email}</td>`;
		table_data += `<td>${records[i].voteridno}</td>`;
		table_data += `<td>${records[i].address}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("name").value = data.name;
		document.getElementById("age").value = data.age;
		document.getElementById("fathername").value = data.fathername;
		document.getElementById("dob").value = data.dob;
		document.getElementById("email").value = data.email;
		document.getElementById("voteridno").value = data.voteridno;
		document.getElementById("address").value = data.address;
	})
}


function postData() {
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;
	var fathername = document.getElementById("fathername").value;
	var dob = document.getElementById("dob").value;
	var email = document.getElementById("email").value;
	var voteridno = document.getElementById("voteridno").value;
	var address = document.getElementById("address").value;
	
	data = {name: name, age: age, fathername: fathername, dob: dob, email: email, voteridno:voteridno, address: address};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;
	var fathername = document.getElementById("fathername").value;
	var dob = document.getElementById("dob").value;
	var email = document.getElementById("email").value;
	var voteridno = document.getElementById("voteridno").value;
	var address = document.getElementById("address").value;
	
	data = {_id: _id, name: name, age: age, fathername: fathername, dob: dob, email: email, voteridno:voteridno, address: address};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}