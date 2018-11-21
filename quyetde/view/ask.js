const totalChar = 200;

// document.getElementById("textInput").addEventListener("input", function(){
//   let remainChar = totalChar - document.getElementById("textInput").value.length;
//   document.getElementById("remain").innerText = "còn" + remainChar +"/200 ký tự";
// });

$("#textInput").on("input",function() {
  let remainChar = totalChar - $("#textInput").val().length;
  $("#remain").text("còn" + remainChar + "/200 ký tự");
});

$("#answer").on("click",function(){
  window.location.href = "http://localhost:1447/"
});