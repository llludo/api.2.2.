
const Form = document.getElementById('form');
    Form.addEventListener('submit', (event) => {
	event.preventDefault();
  
	const dataForm = {
		
		pseudo: document.getElementById('pseudo').value,
		
		
	};

	const options = {
		method: 'PUT',
		body: JSON.stringify(dataForm),
		headers: {
			'Content-Type': 'application/json',
		},
	};

	fetch('http://localhost:5000/api/user/'+JSON.parse(localStorage.getItem('user')), options)
		.then((res) => {
			if (res.ok) {
				console.log("success")
			} else {
				return Promise.reject('Une erreur est survenue');
			}
		})
		.then((res) => console.log(res));
});
