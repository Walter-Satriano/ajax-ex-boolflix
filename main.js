/*ESERCIZIO BOOLFLIX*/


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

      //pulisco il campo ad ogni ricerca per non accavallare i risultati di più ricerche
      $(".container_movie").empty();

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
                vote_average: vote1to5,
                overview: eachMovie.overview
              };

              var html = template(context);

              //stampo a schermo
              $(".container_movie").append(html);
            }

            ratingStar();
            flag();
          },
          error : function(richiesta, stato, errore) {
            alert("E' avvenuto un errore. " + errore);
          }
        }
      );
    }
  ); //fine funzione al click


  //funzione per creare la votazione con le stelle
  function ratingStar() {
    $(".rate_star").each(
      function() {

        var num = $(this).attr("data-vote");
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

  //funzione per le bandiere delle Lingue principali
  function flag() {
    $(".flag_lang").each(
      function() {

        var lang = $(this).attr("data-flag")

        // casi bandiera divisi per linguaggio (principali)
        switch (lang) {
          case "en":
            $(this).html("<img src='img/en-flag.png'>")
            break;

          case "it":
            $(this).html("<img src='img/it-flag.png'>")
            break;

          case "cn":
            $(this).html("<img src='img/cn-flag.png'>")
            break;

          case "de":
            $(this).html("<img src='img/de-flag.png'>")
            break;

          case "es":
            $(this).html("<img src='img/es-flag.png'>")
            break;

          case "fr":
            $(this).html("<img src='img/fr-flag.png'>")
            break;

          case "in":
            $(this).html("<img src='img/in-flag.png'>")
            break;

          case "jp":
            $(this).html("<img src='img/jp-flag.png'>")
            break;

          case "pt":
            $(this).html("<img src='img/pt-flag.png'>")
            break;

          case "ru":
            $(this).html("<img src='img/ru-flag.png'>")
            break;

          case "usa":
            $(this).html("<img src='img/usa-flag.png'>")
            break;

          default:
            $(this).html("n/d")
        }
      }
    )
  }



});
