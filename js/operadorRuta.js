firebase.initializeApp({
    apiKey: "AIzaSyA5z2ntUcJZQpQeODDPN4F7ru_qdka6Il8",
    authDomain: "rutabusaqpdb.firebaseapp.com",
    projectId: "rutabusaqpdb"
});


var db = firebase.firestore();

function insertar(){
  var alias = document.getElementById("idAlias").value;
  var ruta = document.getElementById("idRuta").value;
  var codweb = document.getElementById("idCodWeb").value;
  var vigenciaInicio = new Date(document.getElementById("idVigenciaInicio").value);
  var vigenciaFin = new Date(document.getElementById("idVigenciaFin").value);
  var imagen =document.getElementById("idImagen").value;
  var puntos =document.getElementById("idPuntos").value;
  
  db.collection("Ruta").add({
      Alias: alias,
      Ruta: ruta,
      CodigoWeb: codweb,
      VigenciaInicio: vigenciaInicio,
      VigenciaFin: vigenciaFin,
      Imagen: imagen,
      Puntos: puntos
  })
  .then(function(docRef) {
      document.getElementById('idAlias').value = '';
      document.getElementById('idRuta').value = '';
      document.getElementById('idCodWeb').value = '';
      document.getElementById('idVigenciaInicio').value = '';
      document.getElementById('idVigenciaFin').value = '';
      document.getElementById('idImagen').value = '';
      document.getElementById('idPuntos').value = '';
  })
  .catch(function(error) {
      console.error("Error: ", error);
  });
}

var tabla = document.getElementById('contenidoRuta');
db.collection("Ruta").onSnapshot((querySnapshot) => {
  tabla.innerHTML ='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML +=`
        <tr>
          <th>${doc.id}</th>
          <td>${doc.data().Alias}</td>
          <td>${doc.data().Ruta}</td>   
          <td>${doc.data().CodigoWeb}</td>
          <td>${doc.data().VigenciaInicio}</td>
          <td>${doc.data().VigenciaFin}</td>
          <td>${doc.data().Imagen}</td>
          <td>${doc.data().Puntos}</td>

          <td><button onclick="eliminar('${doc.id}')">ELIMINAR</button></td>
          <td><button onclick="actualizar(
          '${doc.id}',
          '${doc.data().Alias}',
          '${doc.data().Ruta}',
          '${doc.data().CodigoWeb}',
          '${doc.data().VigenciaInicio}',
          '${doc.data().VigenciaFin}',
          '${doc.data().Imagen}',
          '${doc.data().Puntos}')">ACTUALIZAR</button></td>
      </tr>
    `
    });
});


function eliminar(id){
  db.collection("Ruta").doc(id).delete().then(function() {
      console.log("Ruta eliminada");
  }).catch(function(error) {
      console.error("Error: ", error);
  });
}

function actualizar(alias,ruta,codweb,vigenciaInicio,vigenciaFin,imagen,puntos){
  document.getElementById('idAlias').value = alias;
  document.getElementById('idRuta').value = ruta;
  document.getElementById('idCodWeb').value = codweb;
  document.getElementById('idVigenciaInicio').value = vigenciaInicio;
  document.getElementById('idVigenciaFin').value = vigenciaFin;
  document.getElementById('idImagen').value = imagen;
  document.getElementById('idPuntos').value = puntos;


  var boton = document.getElementById('btnInsertar');
  boton.innerHTML = 'Guardar actualizacion'

  boton.onclick = function(){
    var alias = document.getElementById("idAlias").value;
    var ruta = document.getElementById("idRuta").value;
    var codweb = document.getElementById("idCodWeb").value;
    var vigenciaInicio = document.getElementById("idVigenciaInicio").value;
    var vigenciaFin =document.getElementById("idVigenciaFin").value;
    var imagen =document.getElementById("idImagen").value;
    var puntos =document.getElementById("idPuntos").value;

    return RutaRef.update({
      Alias: alias,
      Ruta: ruta,
      CodigoWeb: codweb,
      VigenciaInicio: vigenciaInicio,
      VigenciaFin: vigenciaFin,
      Imagen: imagen,
      Puntos: puntos
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
          document.getElementById('idPuntos').value = '';

        boton.onclick=insertar;
    })
    .catch(function(error) {
        console.error("Error: ", error);
    });
  }  
}

