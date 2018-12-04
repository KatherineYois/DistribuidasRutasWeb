firebase.initializeApp({
    apiKey: "AIzaSyA5z2ntUcJZQpQeODDPN4F7ru_qdka6Il8",
    authDomain: "rutabusaqpdb.firebaseapp.com",
    projectId: "rutabusaqpdb"
});
//Uso de la variable firestore
var db = firebase.firestore();

var btnLogin = document.getElementById('btnLogin');
var btnLogout = document.getElementById('btnLogout');
var btnHome = document.getElementById('btnHome');
var operadores = ["k.yois0232@gmail.com", "jcpdpersempre@gmail.com"];

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		console.log(user.displayName);
		console.log(user.email);
		console.log(user.uid);
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

//Para iniciar sesion con autenticación de Google 
btnLogin.addEventListener("click",function(){
	event.preventDefault();
	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
	firebase.auth().signInWithPopup(provider)
	.then(function(datosUsuario){
		console.log(datosUsuario)
		var uid = datosUsuario.user.uid;
    	var displayname = datosUsuario.user.displayName;
    	var email = datosUsuario.user.email;
    	var photourl = datosUsuario.user.photoURL;
    	agregarUsuario(uid,displayname,email,photourl);
	 }).catch(function(err){
		console.log(err)
	})
});

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
/*
//Preguntar si tenemos un usuario dentro de Firebase, agregamos a la base de datos
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var displayName = user.displayName;
    var email = user.email;
    var photoURL = user.photoURL;
    var uid = user.uid;

    db.collection("Usuarios").add({
    	UID: uid,
    	DisplayName : displayName,
    	Email : email,
    	PhotoURL : photoURL
    })
	.then(function(docRef){
	    console.log("Usuario: ", docRef.id);
	})
    .catch(function(error){
    	console.log("Error: ",error)
    });
  } else {
  	console.log("Necesita iniciar sesión");
  }
});
*/
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