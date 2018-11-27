firebase.initializeApp({
    apiKey: "AIzaSyA5z2ntUcJZQpQeODDPN4F7ru_qdka6Il8",
    authDomain: "rutabusaqpdb.firebaseapp.com",
    projectId: "rutabusaqpdb"
});


var db = firebase.firestore();

function insertar(){
  var ruc = Number(document.getElementById("idRuc").value);
  var razonSocial = document.getElementById("idRazonSocial").value;
  var alias = document.getElementById("idAlias").value;
  var representante = document.getElementById("idRepresentante").value;
  var direccion =document.getElementById("idDireccion").value;
  db.collection("EmpresaTransporte").add({
      Ruc: ruc,
      RazonSocial : razonSocial,
      Alias: alias,
      Representante: representante,
      Direccion: direccion
  })
  .then(function(docRef) {
      document.getElementById('idRuc').value = '';
      document.getElementById('idRazonSocial').value = '';
      document.getElementById('idAlias').value = '';
      document.getElementById('idRepresentante').value = '';
      document.getElementById('idDireccion').value = '';
  })
  .catch(function(error) {
      console.error("Error: ", error);
  });
}

var tabla = document.getElementById('contenidoEmpTrans');
db.collection("EmpresaTransporte").onSnapshot((querySnapshot) => {
  tabla.innerHTML ='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML +=`
        <tr>
          <th>${doc.id}</th>
          <td>${doc.data().Ruc}</td>
          <td>${doc.data().RazonSocial}</td> 	 
          <td>${doc.data().Alias}</td>
          <td>${doc.data().Representante}</td>
          <td>${doc.data().Direccion}</td>

          <td><button onclick="eliminar('${doc.id}')">ELIMINAR</button></td>
          <td><button onclick="actualizar(
          '${doc.id}',
          '${doc.data().Ruc}',
          '${doc.data().RazonSocial}',
          '${doc.data().Alias}',
          '${doc.data().Representante}',
          '${doc.data().Direccion}')">ACTUALIZAR</button></td>
      </tr>
    `
    });
});


function eliminar(id){
  db.collection("EmpresaTransporte").doc(id).delete().then(function() {
      console.log("Empresa de Transporte eliminada");
  }).catch(function(error) {
      console.error("Error: ", error);
  });
}

function actualizar(id,ruc,razonSocial,alias,representante,direccion){
  document.getElementById('idRuc').value = ruc;
  document.getElementById('idRazonSocial').value = razonSocial;
  document.getElementById('idAlias').value = alias;
  document.getElementById('idRepresentante').value = representante;
  document.getElementById('idDireccion').value = direccion;
  var boton = document.getElementById('btnInsertar');
  boton.innerHTML = 'Guardar actualizacion'

  boton.onclick = function(){
    var EmpresaTransporteRef = db.collection("EmpresaTransporte").doc(id);
    var ruc = document.getElementById("idRuc").value;
    var razonSocial = document.getElementById("idRazonSocial").value;
    var alias = document.getElementById("idAlias").value;
    var representante = document.getElementById("idRepresentante").value;
    var direccion =document.getElementById("idDireccion").value;

    return EmpresaTransporteRef.update({
      Ruc: ruc,
      RazonSocial : razonSocial,
      Alias: alias,
      Representante: representante,
      Direccion: direccion
    })
    .then(function() {
        console.log("Empresa de Transporte actualizada");
        boton.innerHTML = 'INSERTAR'
        document.getElementById('idRuc').value = '';
        document.getElementById('idRazonSocial').value = '';
        document.getElementById('idAlias').value = '';
        document.getElementById('idRepresentante').value = '';
        document.getElementById('idDireccion').value = '';
        boton.onclick=insertar;
    })
    .catch(function(error) {
        console.error("Error: ", error);
    });
  }  
}

