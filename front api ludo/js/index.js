  fetch('http://localhost:5000/api/user/')
  .then(res => res.json()).then(res =>console.log(res));
 

  function RedirectionJavascript(){
	document.location.href="../html/profil.html"; 
  }
/***************************LOGIN**************************/

const FormLogin = document.getElementById('formlogin');
FormLogin.addEventListener('submit', (event) => {
	event.preventDefault();
  
	const dataForm = {
		
		
		email: document.getElementById('email').value,
		password: document.getElementById('password').value,
		
	};

	const options = {
		method: 'POST',
		body: JSON.stringify(dataForm),
		headers: {
			'Content-Type': 'application/json',
			
		},
	};

	fetch('http://localhost:5000/api/user/login', options)
	.then((res) => res.json())
	.then((data) => { if (data.errors) {
		return console.log(data.errors)
	}
	else {
		localStorage.setItem('user', JSON.stringify(data.user));
		RedirectionJavascript();
	}
})

});
