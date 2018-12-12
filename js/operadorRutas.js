firebase.initializeApp({
    apiKey: "AIzaSyA5z2ntUcJZQpQeODDPN4F7ru_qdka6Il8",
    authDomain: "rutabusaqpdb.firebaseapp.com",
    projectId: "rutabusaqpdb",
    databaseURL: "https://rutabusaqpdb.firebaseio.com",
    storageBucket: "rutabusaqpdb.appspot.com"
});

//Mapa.js, llamado de markers
var puntosMapa = markersEnvio();
var db = firebase.firestore();
var storage = firebase.storage().ref();

//Boton Examinar
var btnExaminar = document.getElementById("btnExaminar");

//Llenar ComboBox de Alias de Empresas de Transporte
var selectAlias = document.getElementById("idAlias");
db.collection("EmpresaTransporte").onSnapshot((querySnapshot) =>{
  selectAlias.innerHTML = '';
  querySnapshot.forEach((doc) =>{
    selectAlias.innerHTML += `
    <select>
      <option><value ="${doc.data().Alias}">${doc.data().Alias}
      </option>
    </select>
    `
  });
});

//Reconocer cambio en el combobox
var rPuntos, idET, idRazonSocialET, idAliasET;
function cambio(){
  var a =document.getElementById("idAlias").value;
  db.collection("EmpresaTransporte").where("Alias", "==", a).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          idET = doc.id;
          idAliasET =doc.data().Alias;
          idRazonSocialET = doc.data().RazonSocial;
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}

///IMAGENES 
//Mostrar imagen
btnExaminar.addEventListener("change",subirImagen,false);

//Subir imagen
function subirImagen() {
  var imagenSubir = btnExaminar.files[0];
  var uploadTask = storage.child('rutas/' + imagenSubir.name).put(imagenSubir);
  uploadTask.on('state_changed',function(snapshot){
  },function(error){
    alert("Error: ", error);
  },function(){
    var downloadURL = uploadTask.snapshot.downloadURL;
    document.getElementById("idImagen").value = imagenSubir.name;
    var result = '<br><img id="idImagenRuta" height="200" width="200" src="'+downloadURL+'"/>';
    document.getElementById("imagen_Ruta").innerHTML += result;
  });
}

//INSERTAR
function insertar(){
  var etID = idET;
  var razonSocialET = idRazonSocialET;
  var alias = document.getElementById("idAlias").value;
  var ruta = document.getElementById("idRuta").value;
  var codweb = document.getElementById("idCodWeb").value;
  var vigenciaInicio = new Date(document.getElementById("idVigenciaInicio").value);
  var vigenciaFin = new Date(document.getElementById("idVigenciaFin").value);
  var imagen = document.getElementById("idImagen").value;

  db.collection("Ruta").add({
      IDEmpresaTransporte: etID,
      RazonSocialET: razonSocialET,
      Alias: alias,
      Ruta: ruta,
      CodigoWeb: codweb,
      VigenciaInicio: vigenciaInicio,
      VigenciaFin: vigenciaFin,
      Imagen: imagen
  })
  .then(function(docRef) {
      document.getElementById('idAlias').value = '';
      document.getElementById('idRuta').value = '';
      document.getElementById('idCodWeb').value = '';
      document.getElementById('idVigenciaInicio').value = '';
      document.getElementById('idVigenciaFin').value = '';
      document.getElementById('idImagen').value = '';
      document.getElementById('idImagenRuta').removeAttribute('src');
      document.getElementById('idImagenRuta').width = 0;
      document.getElementById('idImagenRuta').height = 0;
      agregarPuntos(docRef.id);
      console.log("Insertó");
  })
  .catch(function(error) {
      console.error("Error: ", error);
  });
  
}

function agregarPuntos(puntosRuta){
  for (var i = 0; i < puntosMapa.length; i++) {
    //Transformando ID
    var str = "" + i
    var pad = "000"
    var newI = pad.substring(0, pad.length - str.length) + str
    puntosMapa[i];
    var puntos = new firebase.firestore.GeoPoint(puntosMapa[i].position.lat(),puntosMapa[i].position.lng());
    console.log(puntosMapa[i].position.lat(),puntosMapa[i].position.lng());
      db.collection('Ruta').doc(puntosRuta).collection("Puntos").doc(newI).set({
          Punto :puntos
      })
      .then(function(docRef) {
          eliminarMarkers();
      })
      .catch(function(error) {
          console.error("Error: ", error);
      });
  }
 console.log("Se inserto puntos");
}

var tabla = document.getElementById('contenidoRuta');
db.collection("Ruta").onSnapshot((querySnapshot) => {
  tabla.innerHTML ='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML +=`
        <tr>
          <td>${doc.data().Alias}</td>
          <td>${doc.data().Ruta}</td>   
          <td>${doc.data().CodigoWeb}</td>
          <td>${doc.data().VigenciaInicio}</td>
          <td>${doc.data().VigenciaFin}</td>
          <td>${doc.data().Imagen}</td>

          <td><button class="button" onclick="eliminar('${doc.id}')">ELIMINAR</button></td>
          <td><button class="button" onclick="actualizar(
          '${doc.id}',
          '${doc.data().Alias}',
          '${doc.data().Ruta}',
          '${doc.data().CodigoWeb}',
          '${doc.data().VigenciaInicio}',
          '${doc.data().VigenciaFin}',
          '${doc.data().Imagen}')">ACTUALIZAR</button></td>
      </tr>
    `
    });
});

//ELIMINAR
function eliminar(id){
  db.collection("Ruta").doc(id).delete().then(function() {
      console.log("Ruta eliminada");
  }).catch(function(error) {
      console.error("Error: ", error);
  });
}

//ACTUALIZAR
function actualizar(alias,ruta,codweb,vigenciaInicio,vigenciaFin,imagen,puntos){
  document.getElementById('idAlias').value = alias;
  document.getElementById('idRuta').value = ruta;
  document.getElementById('idCodWeb').value = codweb;
  document.getElementById('idVigenciaInicio').value = vigenciaInicio;
  document.getElementById('idVigenciaFin').value = vigenciaFin;
  document.getElementById('idImagen').value = imagen;
  //document.getElementById('idPuntos').value = puntos;


  var boton = document.getElementById('btnInsertar');
  boton.innerHTML = 'Guardar actualizacion'

  boton.onclick = function(){
    var alias = document.getElementById("idAlias").value;
    var ruta = document.getElementById("idRuta").value;
    var codweb = document.getElementById("idCodWeb").value;
    var vigenciaInicio = document.getElementById("idVigenciaInicio").value;
    var vigenciaFin =document.getElementById("idVigenciaFin").value;
    var imagen =document.getElementById("idImagen").value;
    //var puntos =document.getElementById("idPuntos").value;

    return RutaRef.update({
      Alias: alias,
      Ruta: ruta,
      CodigoWeb: codweb,
      VigenciaInicio: vigenciaInicio,
      VigenciaFin: vigenciaFin,
      Imagen: imagen
      //Puntos: puntos
    })
    .then(function() {
        console.log("Ruta actualizada");
        boton.innerHTML = 'INSERTAR'
          document.getElementById('idAlias').value = '';
          document.getElementById('idRuta').value = '';
          document.getElementById('idCodWeb').value = '';
          document.getElementById('idVigenciaInicio').value = '';
          document.getElementById('idVigenciaFin').value = '';
          document.getElementById('idImagen').value = '';
          //document.getElementById('idPuntos').value = '';
        boton.onclick = insertar;
    })
    .catch(function(error) {
        console.error("Error: ", error);
    });
  }  
}

//INICIO DE SESIÓN
//Login
var btnLogin = document.getElementById('btnLogin');
var btnLogout = document.getElementById('btnLogout');
var btnHome = document.getElementById('btnHome');

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    console.log(user.displayName);
    console.log(user.email);
    console.log(user.uid);
    console.log(user.photoURL)
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
