$(document).ready(function(){
    let nextPageToken = null;
    let onLoadMoreResult = false;
    let timeOutSearch = null;
    $("#keyword").on("input",function(){
        clearTimeout(timeOutSearch);
        timeOutSearch = setTimeout(function(){
            if($("#keyword").val() != ""){
            $.ajax({
                url:`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${$("#keyword").val()}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
                type:"get",
                success:function(data){
                    $(".result").remove();
                    if(data.items && data.items.length > 0){
                        for(let i = 0; i < data.items.length; i++){
                        $("#result-list").append(`
                            <a class="result" href="http://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true target="_blank">
                                <div class="row">
                                <img class="col-md-3" src="${data.items[i].snippet.thumbnails.high.url}" alt="">
                                <div class="video_info col-md-9">
                                    <h2 class="title">${data.items[i].snippet.title}</h2>
                                    <p class="description">${data.items[i].snippet.description}</p>
                                    <span>View >></span>
                                </div>
                                </div>
                            </a>`);
                        }
                    } else {
                        $(".result").remove();
                        $("#result-list").append(`
                            <span class="result">Không có kết quả tìm kiếm</span>`);
                    }
                    
                    if(data.nextPageToken){
                        nextPageToken = data.nextPageToken;
                    } else {
                        nextPageToken = null;
                    } 
                },
                error:function(err){
                    console.log(err);
                }
            });
            }
        },1000);
    });
    $(window).scroll(function(){
        if(window.innerHeight+$(window).scrollTop() >= document.body.clientHeight && !onLoadMoreResult){
            onLoadMoreResult = true;
            const keyword = $("#keyword").val();
            $.ajax({
                url:`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${$("#keyword").val()}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
                type:"get",
                success:function(data){
                    if(data.items && data.items.length > 0){
                        for(let i = 0; i < data.items.length; i++){
                        $("#result-list").append(`
                            <a class="result" href="http://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true target="_blank">
                                <div class="row">
                                <img class="col-md-3" src="${data.items[i].snippet.thumbnails.high.url}" alt="">
                                <div class="video_info col-md-9">
                                    <h2 class="title">${data.items[i].snippet.title}</h2>
                                    <p class="description">${data.items[i].snippet.description}</p>
                                    <span>View >></span>
                                </div>
                                </div>
                            </a>`);
                        }
                        if(data.nextPageToken){
                            nextPageToken = data.nextPageToken;
                        } else {
                            nextPageToken = null;
                        }
                        onLoadMoreResult = false;
                    }
                }
            })
        }
    });
});