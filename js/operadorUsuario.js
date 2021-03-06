
firebase.initializeApp({
    apiKey: "AIzaSyA5z2ntUcJZQpQeODDPN4F7ru_qdka6Il8",
    authDomain: "rutabusaqpdb.firebaseapp.com",
    projectId: "rutabusaqpdb"
});

var btnLogin = document.getElementById('btnLogin');
var btnLogout = document.getElementById('btnLogout');
var btnHome = document.getElementById('btnHome');
var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		var displayName = user.displayName;
		var email = user.email;
		var uid = user.uid;
		var photoURL = user.photoURL;
		mostrarLogout();
	}else{
		mostarLogin();
	}
});
//Para cerrar sesion
btnLogout.addEventListener("click",function(){
	event.preventDefault();
	firebase.auth().signOut().then(function(){
		alert("Cerrar Sesion");
		location.href = "home.html";
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
	btnHome.style.display = "none";
}

