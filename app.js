// Cargar JSON
// Cómo cargar un fichero un fichero JSON: TODO

// Vamos a cargar el fichero JSON y lo vamos a guardar en una variable que a ser un array de objetos

// importar el módulo interno de NodeJS FileSystem; que nos permite manipular el sistema de ficheros
const fs = require('fs');

// quiero leer el fichero atp.json ubicado en esta misma carpeta que tiene por condifación utf-8
const data = fs.readFileSync('atp.json', 'utf8');

// JSON.parse va a convertir el string JSON en un array de objetos que podamos manejar
const tournaments = JSON.parse(data);

// MANDAMIENTO 1: Para los ejercicios de servdiro NodeJS NO USAMOS Live Server. NodeJS va a ser nuestro LiveServer.

// Importar el módulo interno http. El módulo http nos va a permitir crear servidores
let http = require("http");

// Crear un servidor que acepte cualquier petición del cliente y muestre un texto por el terminal random. La función que le pasemos por parámetro va a ser ejecutada CADA VEZ que el servidor reciba una petición HTTP

let servidor = http.createServer((req, res) => {
  // Hola hola! Vamos a responder con este mensaje al cliente

  // Nos piden crear una página about-us
  // http://localhost:3000/about-us

  console.log("petición url: ", req.url);

  // endpoint /about-us
  if (req.url.includes("about-us")) {
    // servir la página de about-us
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    res.write("<h1 style='color:red'>Bienvenido a la página de ABOUT US</h1>");
    res.write("<a href='/about-us'>About us</a>")
    res.end();
    console.log("Sigo haciendo cosas como procesar información y guardarla en un archivo");
    return;
  }

  // endpoint /atp-form . Comprobamos si la ruta URL que ha introducido el usuario contiene la subcadena atp-form. En dicho caso, le devolvemos un formulario HTML completo (esto no lo haremos así en el futuro)
  else if (req.url.includes("atp-form")) {
    let formulario = `<!DOCTYPE html>
<html>
  <meta charset="UTF-8">

<body>

<h1>BUSCAR EN ATP</h1>

<p>Selecciona un criterio de búsqueda.</p>

<form action="/search">
  <label for="player">Selecciona jugador:</label>
  <select name="player" id="player">
    <option value="104745">Rafa Nadal</option>
    <option value="104925">Novak Djokovic</option>
    <option value="103819">Roger Federer</option>
  </select>
  <br><br>
  <input type="submit" value="Buscar">
</form>

</body>
</html>
`;
    return res.end(formulario);
  }

  // endpoint /search
  else if (req.url.includes("search")) {
    // Vamos a enviar un JSON con los resultados de momento. (mañana)

    // Cómo obtengo el id del jugador por el cual queremos buscar los partidas ganador a partir de la varible req.url
    let id = req.url.split("player=")[1];

    // Mostrar por consola:  recuperar un array con todos los partidos que ha ganado el jugador identificado con valor de la variable id.

    // tournaments. Recuperar todos los objetos tales que la propiedad winner_id == id

    // Opción 1: Recorrer todo el array torunaments y quedarte solo con los objetos talesque winner_id == id

    // Opción 2: Utilizar adecuadamente el método filter para quedarte solo con los objetos que cumplen que winner_id == id

    // Quiero filtrar todos los objetos que cumplen con la condición que el campo winner_id es exactamente el mismo que hemos pasado por parámetro en la QueryString. Además, uso .map para quedarme solo con el campo "torneu_name";

    const tournamentsWon = tournaments.filter(t => t.winner_id == id);

    res.write(`<head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>`);

    res.write(`<h1>Torneos ganados por el jugador con id ${id} </h1>`)

    // TODO: forEach: crear un string enorme de varias <p>
    res.write("<table>");
    res.write("<tr>")
    res.write("<th>");
    res.write("Nombre Torneo")
    res.write("</th>");
    res.write("<th>");
    res.write("Jugador derrotado")
    res.write("</th>");
    res.write("</tr>")


    // generar tantas filas como elementos hay en el array
    tournamentsWon.forEach(t => {
      res.write("<tr>");
      res.write("<td>");
      res.write(t.tourney_name);
      res.write("</td>");
      res.write("<td>");
      res.write(t.loser_name);
      res.write("</td>");
      res.write("</tr>");

    })

    res.write("</table>");


    return res.end();

  }

  // endpoint 

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  res.write("<h1>Bienvenido a la página de estadísticas de la ATP crada por the Mooners</h1>");
  res.write("<a href='/about-us'>About us</a>")
  res.end();
});

// Queremos que nuestro servidor empiece a escuchar peticiones por el puerto 3000 (a partir del puerto 1024 tu puedes el que quieras).

servidor.listen(3000);