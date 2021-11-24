function logout(){
    localStorage.removeItem('user');
    
}
const pseudo = document.getElementById('pseudo');




fetch('http://localhost:5000/api/user/'+JSON.parse(localStorage.getItem('user'))).then((res)=> res.json())
.then((data)=> {
    var html = `
    <li>${data.pseudo}</li>
    <li>${data.email}</li>
    <li>${data.createdAt}</li>
    <li>${data.updatedAt}</li>
    <li>${data._id}</li>
    <a href="put.html">modifier le pseudo</a>
    `
    pseudo.innerHTML=html
});
console.log(html);



  




