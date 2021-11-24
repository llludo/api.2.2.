/*******************REGISTER******************/
  const Form = document.getElementById('form');
    Form.addEventListener('submit', (event) => {
	event.preventDefault();
  
	const dataForm = {
		
		pseudo: document.getElementById('pseudo').value,
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

	fetch('http://localhost:5000/api/user/register', options)
		.then((res) => {
			if (res.ok) {
				
					document.location.href="../html/login.html"; 
				  
			} else {
				return Promise.reject('Une erreur est survenue');
			}
		})
		.then((res) => console.log(res));
});
