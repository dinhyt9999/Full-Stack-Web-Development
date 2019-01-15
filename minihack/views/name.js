$("#submitName").on("click",function(e){
    e.preventDefault();
    $.ajax({
        url: "/",
        type: "post",
        data:{
            player1:$("#player1").val(),
            player2:$("#player2").val(),
            player3:$("#player3").val(),
            player4:$("#player4").val(),
        },
        success:function(dataRes){
            window.location.href = "/game/" + dataRes.dataRes._id
        },
        error:function(){
            console.log("die");
        }
    });
});