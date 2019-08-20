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
            var movie = data.results;
            console.log(movie);


            //ciclo per traversare l'array ottenuto dall'API
            for (var i = 0; i < movie.length; i++) {
              var eachMovie = movie[i];
              console.log("eachmovie " , eachMovie);

              //trasformo il voto da 1a10 decimale a 1a5 intero e arrotondo per eccesso
              var vote1to5 = Math.round(eachMovie.vote_average / 2);

              //assegno i segnaposto
              var context =
              {
                // poster_path: "https://image.tmdb.org/t/p/w342" + eachMovie.poster_path,
                title: eachMovie.title,
                original_title: eachMovie.original_title,
                original_language: eachMovie.original_language,
                vote_average: vote1to5
              };

              var html = template(context);

              //stampo a schermo
              $(".container_movie").append(html);
            }

            ratingStar();
          },
          error : function(richiesta, stato, errore) {
            alert("E' avvenuto un errore. " + errore);
          }
        }
      );
    }
  ); //fine metodo click


  //funzione per creare la votazione con le stelle
  function ratingStar() {
    $(".rate_star").each(
      function() {

        var num = $(this).attr("data-numero");
        var diff = 5 - num;
        //stelle piene
        for (var i = 0; i < num; i++) {
          $(this).append("<i class='fas fa-star'></i>").addClass("yellow");
        }
        //stelle vuote
        for (var i = 0; i < diff; i++) {
          $(this).append("<i class='far fa-star'></i>");
        }
      }
    )
  }



});
