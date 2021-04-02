$(document).ready(function() {
  console.log("ready!");

  // toggle Hamgburger menu
  $("span#hamburger").click(function() {
    toggleHamburger();
  });

  function toggleHamburger() {
    var menu = document.getElementById("navbarText");
    if (menu.style.display === "none") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }

  $("#navbarText").on("click", function() {
    $("a.nav-link").click(function() {
      $("#navbarText").css("display", "none");
    });
  });

  function goBack() {
    window.history.back();
  }

  function goForward() {
    window.history.forward();
  }

  // heart/like button toggle
  function toggleLiked() {
    var artistLike = document.getElementsByClassName(".artistLike");
    console.log("clicked");
    if (this.classList.contains("far")) {
      this.classList.remove("far");
      this.classList.add("fas");
      this.classList.add("mustShow");
      this.style.color = "green";
      this.style.padding = "0";
      this.style.display = "flex";
      this.style.justifyContent = "center";
      artistLike.style.visibility = "visible !important";

      var isLiked = true;
    } else {
      this.classList.remove("fas");
      this.classList.add("far");
      this.classList.remove("mustShow");
      this.style.color = "";
      var isLiked = false;
      this.style.padding = "0";
      this.style.display = "flex";
      this.style.justifyContent = "center";

    }

    return isLiked;
  }

  $("i.like").on("click", toggleLiked);

  function hoverShowOptions(song) {
    var optionsIcon = song.getElementsByClassName("options")[0];
    optionsIcon.style.display = "block";
  }

  function hoverHideOptions(song) {
    var optionsIcon = song.getElementsByClassName("options")[0];
    optionsIcon.style.display = "none";
  }


  function hoverShowPlay(song) {
    var playButton = song.getElementsByClassName("artistPlay")[0];
    var number = song.getElementsByClassName("artistIndex")[0];
    // playButton.style.visibility = "visible";
    // number.style.visibility = "hidden"


    playButton.style.visibility = "visible"
    number.style.display = "none"

  }

  function hoverHidePlay(song) {
    var number = song.getElementsByClassName("artistIndex")[0];
    var playButton = song.getElementsByClassName("artistPlay")[0];
    number.style.visibility = "visible"
    number.style.display = "block"
    playButton.style.visibility = "hidden";
    playButton.style.dispaly = "none";
  }


  
  function hoverShowLike(song) {
    var heart = song.getElementsByClassName("artistLike")[0];
    heart.style.visibility = "visible";
  }

  function hoverHideLike(song) {
    var heart = song.getElementsByClassName("like")[0];
    var heartDiv = song.getElementsByClassName("artistLike")[0];
    console.log(song);
    heartDiv.style.visibility = "hidden";
  }

  let songs = document.querySelectorAll(".songRow");

  songs.forEach(song => {
    song.addEventListener("mouseover", e => {
      hoverShowOptions(song);
      hoverShowLike(song);
      hoverShowPlay(song);
    });
  });

  songs.forEach(song => {
    song.addEventListener("mouseout", e => {
      hoverHideOptions(song);
      hoverHideLike(song);
      hoverHidePlay(song);
    });
  });

  // add song to a playlist
  var playlistChoices = document.querySelectorAll("li p.playlistChoice");

  playlistChoices.forEach(choice => {
    choice.addEventListener("click", e => {
      console.log("clicked");
    });
  });
  var meatballs = document.querySelectorAll(".meatball");

  meatballs.forEach(menu => {
    menu.addEventListener("click", e => {
      console.log("clicked");
    });
  });

  searchBar = document.getElementById("searchBar");

  $("#searchBar").submit(function(e) {
    e.preventDefault();
  });

  searchBar.addEventListener("keyup", e => {
    console.log(e.target.value);
  });
});
