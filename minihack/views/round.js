var gameId = window.location.pathname.split("/")[2];
var dataGame = null;
$.ajax({
    url:"/"+gameId,
    type:"get",
    success: function(dataRes){
        $("#sumOfScope").append(`
            <td>${dataRes.gameRes.totalScore[0]}</td>
            <td>${dataRes.gameRes.totalScore[1]}</td>
            <td>${dataRes.gameRes.totalScore[2]}</td>
            <td>${dataRes.gameRes.totalScore[3]}</td>`
        );
        dataRes.gameRes.roundScore.forEach((element,index) => {
            console.log(element);
            $("#tableScore").append(`
                <tr id="${index+1}">
                    <td>Round ${index+1}</td>
                    <td>
                        <input type="number" class="score" id="player1" name="tentacles1" min="0" max="50" value="${element.score1}">
                    </td>
                    <td>
                        <input type="number" class="score" id="player2" name="tentacles2" min="0" max="50" value="${element.score2}">
                    </td>
                    <td>
                        <input type="number" class="score" id="player3" name="tentacles3" min="0" max="50" value="${element.score3}">
                    </td>
                    <td>
                        <input type="number" class="score" id="player4" name="tentacles4" min="0" max="50" value="${element.score4}">
                    </td>
                </tr>`
            );
        });
        dataGame = dataRes.gameRes;
    },
    error: function(err){
        console.log("die");
    }
});
$("#addRound").on("click",function(){
    $("#tableScore").append(`
        <tr id="${dataGame.roundScore.length+1}">
            <td>Round ${dataGame.roundScore.length+1}</td>
            <td>
                <input type="number" class="score" id="player1" name="tentacles1" min="0" max="50" value="0">
            </td>
            <td>
                <input type="number" class="score" id="player2" name="tentacles2" min="0" max="50" value="0">
            </td>
            <td>
                <input type="number" class="score" id="player3" name="tentacles3" min="0" max="50" value="0">
            </td>
            <td>
                <input type="number" class="score" id="player4" name="tentacles4" min="0" max="50" value="0">
            </td>
        </tr>`
    );
    $.ajax({
        url:"/addRound/"+gameId,
        type:"post",
        data:{
            score1:0,
            score2:0,
            score3:0,
            score4:0 
        },
        success:function(dataRes){
            console.log(dataRes);
        },
        error:function(err){}
    });
});
// $(".score").on("blur",function(){
//     let score1
//     if($("#1").val()==null) score1 =0
//     else score1 = $("#1").val()
//     $.ajax({
//         url:"/game/"+gameId,
//         type:"post",
//         data:{
//             score1
//         },
//         success:function(){
            
//         }
//     });
// });
