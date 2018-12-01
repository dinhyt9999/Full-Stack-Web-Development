$.ajax({
    url:"/randomquestion",
    type:"GET",
    success:function(data){
        $("#question").text(data.questions.content);
        $("#question").attr("data-question",data.questions._id);
    },
    error: function(err){
        console.log(err);
    }    
});

$("#no, #yes").on('click',function(){
    $.ajax({
        url:"/answer",
        type:"post",
        data: {
            questionId: $("#question").attr("data-question"),
            vote:$(this).attr("id")
        },
        success: function(data) {
            window.location.href = "/question/"+data.questions._id; 
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
$("#viewQuestionInfo").on("click",function(){
    window.location.href = "/question/"+ $("#question").attr("data-question");
});