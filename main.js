/*ESERCIZIO BOOLFLIX*/


$(document).ready(function() {

  $("#search_button").click(searchClick);

  //funzione search
  function searchClick() {
      //salvo l'input utente in una variabile
      var inputUser = $(".input_user").val().toUpperCase();
      console.log(inputUser);
      //svuoto l'input
      $(".input_user").val("");

      //pulisco il campo ad ogni ricerca per non accavallare i risultati di più ricerche
      $(".container_movie").empty();

      callMovie(inputUser);
      callTVseries(inputUser);
  }

  // avvio la ricerca premendo il pulsante "invio" da tastiera
  $(".input_user").keypress(
    function(invio) {
      if (invio.which == 13) {
        searchClick();
      }
    }
  );

  //funzione con chiamata ajax per i film
  function callMovie(inputUser) {
    //chiamata ajax (film) in base all'input dell'utente
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

          print("Movie", movie);
        },
        error : function(richiesta, stato, errore) {
          alert("E' avvenuto un errore. " + errore);
        }
      }
    );
  }

  //funzione con chiamata ajax per le serie tv
  function callTVseries(inputUser) {
    $.ajax(
      {
        url : "https://api.themoviedb.org/3/search/tv",
        data :
        {
          "api_key": "441a2539412b4c453d7f9aa009a7dfc3",
          "query": inputUser,
          "language": "it-IT"
        },
        method : "GET",
        success : function(data) {

          var tvSeries = data.results;
          console.log(tvSeries);

          print("Tv", tvSeries);
        },
        error : function(richiesta, stato, errore) {
          alert("E' avvenuto un errore. " + errore);
        }
      }
    );
  }

  //funzione generale per stampare a video i risultati
  function print(type, movie) {

    //ciclo per traversare l'array ottenuto dall'API
    for (var i = 0; i < movie.length; i++) {
      var eachMovie = movie[i];
      console.log("eachmovie " , eachMovie);

      //compilo il template per i film con handlebars
      var source = $("#template_movie").html();
      var template = Handlebars.compile(source);

      title = "";
      originalTitle = "";

      if (type == "Movie") {
        title = eachMovie.title;
        originalTitle = eachMovie.original_title;
      } else {
        title = eachMovie.name;
        originalTitle = eachMovie.original_name;
      }

      //assegno i segnaposto
      var context =
      {
        poster_path: getPosterimg(eachMovie.poster_path),
        type: type,
        title: title,
        original_title: originalTitle,
        original_language: getFlag(eachMovie.original_language),
        vote_average: getStar(eachMovie.vote_average),
        overview: getOverview(eachMovie.overview)
      };

      var html = template(context);

      //stampo a schermo
      $(".container_movie").append(html);
    }
  }

  // funzione per trasformare la votazione da 1 a 5 e tramutarla in stelle
  function getStar(rate) {
    var roundVote = Math.round(rate / 2);

    var graphStar = "";
    for (var i = 0; i < 5; i++) {
      if (i < roundVote) {
        graphStar += "<i class='fas fa-star'></i>"; //stelle piene
      } else {
        graphStar += "<i class='far fa-star'></i>"; //stelle vuote
      }
    }

    return graphStar;
  }

  //funzione per associare le bandiere alla lingua
  function getFlag(lang) {
    // creo un array con le bandiere disponibili
    var availableFlag = [
      "cn",
      "de",
      "en",
      "es",
      "fr",
      "in",
      "it",
      "ja",
      "pt",
      "ru",
      "usa",
      "sv",
      "da",
      "no"
    ];

    var flag = "";
    if (availableFlag.includes(lang)) {
      flag = "<img src='img/" + lang + ".png'>";
    } else {
      flag = lang;
    }

    return flag;
  }

  //funzione per recuperare i poster (film + serieTV)
  function getPosterimg(url) {

    var imgTag = "";
    if (url) {
      imgTag = "<img src='https://image.tmdb.org/t/p/w342" + url + "' class='poster'/>";
    }
    else {
      imgTag = "<img src='img/imgnotavailable.png'/>";
    }

    return imgTag;
  }

  //funzione per recuperare le overview
  function getOverview(description) {

    var overview = "";
    if (description) {
      overview = description;
    } else {
      overview = "n/d";
    }

    return overview;
  }



});
