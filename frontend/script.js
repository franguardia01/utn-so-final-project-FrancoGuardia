document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});
// Tarea 2: Saludo;
var miBoton = document.getElementById("greetBtn");

miBoton.onclick = function() {
  var miInput = document.getElementById("nameInput");
  var miParrafo = document.getElementById("greetingMessage");
  var nombre = miInput.value;

  fetch("/api/greet?name=" + nombre)
    .then(function(respuesta){
      return respuesta.json();
    })
    .then(function(datos){
      miParrafo.innerText = datos.message;
    })
  }
  
  //Tarea 4: Logica para agregar estudiante
  var botonAgregar = document.getElementById("addStudentBtn");

  botonAgregar.onclick = function() {
    var inputNuevoEstudiante = document.getElementById("studentNameInput");
    var nombreEstudiante = inputNuevoEstudiante.value;

    if(nombreEstudiante === ""){
      alert("Por favor, escribe un nombre");
      return;
    }

    fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: nombreEstudiante})
    })
    .then(function(respuesta){
      if(respuesta.ok) {
        inputNuevoEstudiante.value = "";

        document.getElementById("loadButton").click();
      } else {
        alert("Hubo un error al guardar");
      }
    });
  };


