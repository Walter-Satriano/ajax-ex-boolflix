/*Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo
scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
film trovato:
1. Titolo
2. Titolo Originale
3. Lingua
4. Voto*/


$(document).ready(function() {


  //compilo il template con handlebars
  var source = $("#template").html();
  var template = Handlebars.compile(source);


  $("#search_button").click(
    function() {

      //salvo l'input utente in una variabile
      var inputUser = $(".input_user").val().toUpperCase();
      console.log(inputUser);

      //svuoto l'input
      $(".input_user").val("");

      //chiamata ajax in base all'input dell'utente
      $.ajax(
        {
          url : "https://api.themoviedb.org/3/search/movie",
          data :
          {
            "api_key": "441a2539412b4c453d7f9aa009a7dfc3",
            "query": inputUser,
            "language": "it-IT"
          },
          method : "GET",
          success : function(data) {
            // if (data.success) { //se inserisco questo controllo non funziona più
              var movie = data.results;
              console.log(movie);

              //ciclo per traversare l'array ottenuto dall'API
              for (var i = 0; i < movie.length; i++) {
                var eachMovie = movie[i];
                console.log("eachmovie " , eachMovie);

                //assegno i segnaposto
                var context =
                {
                  title: movie[i].title,
                  original_title: movie[i].original_title,
                  original_language: movie[i].original_language,
                  vote_average: movie[i].vote_average
                };

                var html = template(context);

                //stampo a schermo
                $(".container_movie").append(html);
              }
            // }
          },
          error : function(richiesta, stato, errore) {
            alert("E' avvenuto un errore. " + errore);
          }
        }
      );
    }
  );
});
