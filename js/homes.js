firebase.initializeApp({
    apiKey: "AIzaSyA5z2ntUcJZQpQeODDPN4F7ru_qdka6Il8",
    authDomain: "rutabusaqpdb.firebaseapp.com",
    projectId: "rutabusaqpdb"
});
//Uso de la variable firestore
var db = firebase.firestore();

//Botones para el Logeo
var btnLogin = document.getElementById('btnLogin');
var btnLogout = document.getElementById('btnLogout');
var btnHome = document.getElementById('btnHome');

//Array de operadores
var operadores = [];
db.collection("Operadores").get().then(function(querySnapshot) {     
    querySnapshot.forEach((doc) => {
    	return operadores.push(`${doc.data().Operador}`);
    	console.log(operadores);
    });
});

//Para iniciar sesion con autenticación de Google 
btnLogin.addEventListener("click",function(){
	event.preventDefault();
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
	firebase.auth().signInWithPopup(provider)
	.then(function(datosUsuario){
		console.log(datosUsuario)
	 }).catch(function(err){
		console.log(err)
	})
});

var usuarios = [];
db.collection("Usuarios").get().then(function(querySnapshot) {     
    querySnapshot.forEach((doc) => {
    	return usuarios.push(`${doc.data().Email}`);
    	console.log(usuarios);
    });
});

//Redireccionar al usuario que inicio sesión dependiento del rol que tiene
firebase.auth().onAuthStateChanged(function(user){
	if(user){
		var displayName = user.displayName;
		var email = user.email;
		var uid = user.uid;
		var photoURL = user.photoURL;
		agregarUsuario(uid,displayName,email,photoURL);
		mostrarLogout();
		if(operadores.includes(user.email)){
			location.href = "operadorOpciones.html";
		}else{
			location.href = "usuario.html";
		}
	}else{
		mostrarLogin();
	}
});

//Agregar Usuario 
function agregarUsuario(u,d,e,p){
	db.collection("Usuarios").add({
    	UID: u,
    	DisplayName : d,
    	Email : e,
    	PhotoURL : p
    })	
	.then(function(docRef){
	    console.log("Usuario: ", docRef.id);
	})
    .catch(function(error){
    	console.error("Error: ",error);
    });
}

function mostrarLogin(){
	console.log("funcion Login");
	btnLogout.style.display ="none";
	btnLogin.style.display = "block";
}
function mostrarLogout(){
	console.log("funcion Logout");
	btnLogout.style.display ="block";
	btnLogin.style.display = "none";
}