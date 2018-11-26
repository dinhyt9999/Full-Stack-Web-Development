var questionId = window.location.pathname.split("/")[2];
console.log(questionId);
$.ajax({
    url:"http://localhost:1447/question/"+questionId,
    type:"post",
    data: {
        questionId
    },
    success: function(data) {
        $("#question").text(data.question.content);
        let totalVote = data.question.yes + data.question.no;
        $("#vote").text("Vote: " + totalVote);
        if(data.question.yes == 0){
            $("#voteYes").text("").css('width', '0%');
            $("#voteNo").text("100%").css('width','100%');
        } else if(data.question.no == 0){
            $("#voteNo").text("").css('width', '0%');
            $("#voteYes").text("100%").css('width','100%');
        } else{
            $("#voteYes").text((data.question.yes*100/totalVote).toFixed(2) + "%").css('width', data.question.yes*100/totalVote+'%');
            $("#voteNo").text((data.question.no*100/totalVote).toFixed(2) + "%").css('width', data.question.no*100/totalVote+'%');
        }
    },
    error: function(err) {
        console.log("die!");
    }
});
$("#other-question").on("click", function(){
    window.location.href = "/"
});