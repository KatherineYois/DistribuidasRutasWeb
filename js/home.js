firebase.initializeApp({
    apiKey: "AIzaSyA5z2ntUcJZQpQeODDPN4F7ru_qdka6Il8",
    authDomain: "rutabusaqpdb.firebaseapp.com",
    projectId: "rutabusaqpdb"
});

var db = firebase.firestore();


var btnLogin = document.getElementById('btnLogin');
var btnLogout = document.getElementById('btnLogout');
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

//Para iniciar sesion
btnLogin.addEventListener("click",function(){
	event.preventDefault();

	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
	
	firebase.auth().signInWithPopup(provider)
	.then(function(datosUsuario){
		console.log(datosUsuario)
		db.collection("Usuario").add({
	      	uid: datosUsuario.user.uid,
			displayName: datosUsuario.user.displayName,
			email: datosUsuario.user.email
	 }).catch(function(err){
		console.log(err)
	})
})
});
//Para cerrar sesion
btnLogout.addEventListener("click",function(){
	event.preventDefault();
	firebase.auth().signOut().then(function(){
		alert("Cerrar Sesion");
	})
});


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