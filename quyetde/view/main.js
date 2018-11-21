$.ajax({
    url:"http://localhost:1447/randomquestion",
    type:"GET",
    success:function(data){
        $("#question").text(data.questions.content);
        $("#question").attr("data-question",data.questions._id);
        let totalVote = data.questions.yes + data.questions.no;
        $("#vote").text("Vote: " + totalVote);
        $("#voteYes").text("Vote Yes: " + (data.questions.yes*100/totalVote) + "%");
        $("#voteNo").text("Vote No: " + (data.questions.no*100/totalVote) + "%");
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
        success: function(data) {
            window.location.href = "/question/"+data.questions.id;
            console.log(data.questions.questionId);
        },
        error: function(err) {
            console.log("die!");
            console.log(data.questions.id);
        }
    });
});

$("#viewQuestionInfo").on("click",function(){
    $("#questionInfo").css('display', 'block');
    $("#answer").css('display', 'none');
});
$("#other-question").on("click",function(){
    window.location.href ="/";
});

$("#ask").on("click",function(){
    window.location.href ="/ask"
});