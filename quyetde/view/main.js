$.ajax({
    url:"http://localhost:1447/randomquestion",
    type:"GET",
    success:function(data){
        $("#question").text(data.questions.content);
        $("#question").attr("data-question",data.questions._id);
        let totalVote = data.questions.yes + data.questions.no;
        $("#vote").text("Vote: " + totalVote);
        if (totalVote == 0){
            $("#voteYes").text("50%").css('width', '50%');
            $("#voteNo").text("50%").css('width', '50%');
        } else {
            if(data.questions.yes == 0){
                $("#voteYes").text("").css('width', '0%');
                $("#voteNo").text("100%").css('width','100%');
            } else if(data.questions.no == 0){
                $("#voteNo").text("").css('width', '0%');
                $("#voteYes").text("100%").css('width','100%');
            } else{
                $("#voteYes").text((data.questions.yes*100/totalVote).toFixed(2) + "%").css('width', data.questions.yes*100/totalVote+'%');
                $("#voteNo").text((data.questions.no*100/totalVote).toFixed(2) + "%").css('width', data.questions.no*100/totalVote+'%');
            }
        }
    },
    error: function(err){
        console.log(err);
    }    
});

$("#no, #yes").on('click',function(){
    $.ajax({
        url:"http://localhost:1447/answer",
        type:"post",
        data: {
            questionId: $("#question").attr("data-question"),
            vote: $(this).attr("id")
        },
        success: function() {
            $("#questionInfo").css('display', 'block');
            $("#answer").css('display', 'none');
        },
        error: function(err) {
            console.log("die!");
        }
    });
});

$("#viewQuestionInfo").on("click",function(){
    $("#questionInfo").css('display', 'block');
    $("#answer").css('display', 'none');
});
$("#other-question").on("click",function(){
    window.location.href = "/";
});