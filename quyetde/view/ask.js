const totalChar = 200;

document.getElementById("textInput").addEventListener("input", function(){
  let remainChar = totalChar - document.getElementById("textInput").value.length;
  document.getElementById("remain").innerText = "còn" + remainChar +"/200 ký tự";
});