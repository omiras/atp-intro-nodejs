// Cargar JSON
// Cómo cargar un fichero un fichero JSON: TODO

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
        res.write("<h1>Bienvenido a la página de ABOUT US</h1>");
        res.write("<a href='/about-us'>About us</a>")
        res.end();
        console.log("Sigo haciendo cosas como procesar información y guardarla en un archivo");
        return;
    }

    // endpoint /atp-form . Comprobamos si la ruta URL que ha introducido el usuario contiene la subcadena atp-form. En dicho caso, le devolvemos un formulario HTML completo (esto no lo haremos así en el futuro)
    else if (req.url.includes("atp-form")) {
        let formulario = `<!DOCTYPE html>
<html>
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
        return res.end("Quiero los partidos ganados por el jugador " + id);

    }

    // endpoint 

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    res.write("<h1>Bienvenido a la página de estadísticas de la ATP crada por the Mooners</h1>");
    res.write("<a href='/about-us'>About us</a>")
    res.end();
});

// Queremos que nuestro servidor empiece a escuchar peticiones por el puerto 3000 (a partir del puerto 1024 tu puedes el que quieras).

servidor.listen(3000);