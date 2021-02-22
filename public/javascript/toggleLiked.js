// heart/like button toggle
function toggleLiked() {
  console.log("clicked");
  if (this.style.color === "") {
    this.style.color = "green";
    var isLiked = true
  } else {
    this.style.color = "";
    var isLiked= false
  }
  return isLiked;
}

$("i.like").on('click', toggleLiked);
