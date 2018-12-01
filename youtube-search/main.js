$(document).ready(function(){
    var dataSearch = null;
    const count = 3;
    var k=count;
    var j=0;
    // $("#keyword").on("input",function(){
    //     $.ajax({
    //         url:`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${$("#keyword").val()}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
    //         type:"get",
    //         success:function(data){
    //             console.log($("#keyword").val());
    //             $(".result").remove();
    //             dataSearch = data;
    //             k=3;
    //             console.log("search");
    //             if(data.items && data.items.length > 0){
    //                 for(let i = 0; i < k; i++){
    //                 $("#result-list").append(`
    //                     <a class="result" href="http://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true target="_blank">
    //                         <div class="row">
    //                         <img class="col-md-3" src="${data.items[i].snippet.thumbnails.high.url}" alt="">
    //                         <div class="video_info col-md-9">
    //                             <h2 class="title">${data.items[i].snippet.title}</h2>
    //                             <p class="description">${data.items[i].snippet.description}</p>
    //                             <span>View >></span>
    //                         </div>
    //                         </div>
    //                     </a>`);
    //                 }
    //                 j=k;
    //                 k+=count;
    //             }
    //         }
    //     })    
    // });
    // $("#search").on("submit",function(){
    //     event.preventDefault();
    $("#keyword").on("input",function(){
        setTimeout(function(){
            if($("#keyword").val() != ""){
            $.ajax({
                url:`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${$("#keyword").val()}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
                type:"get",
                success:function(data){
                    $(".result").remove();
                    dataSearch = data;
                    k=3;
                    if(data.items && data.items.length > 0){
                        for(let i = 0; i < k; i++){
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
                        j=k;
                        k+=count;
                    } else {
                        $(".result").remove();
                        $("#result-list").append(`
                            <span class="result">Không có kết quả tìm kiếm</span>`);
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
        if(window.innerHeight+$(window).scrollTop() >= document.body.clientHeight && (k-count)<dataSearch.items.length){
            console.log("sajbfewuhfuid");
            if(k>dataSearch.items.length){
                for(let i = j; i < dataSearch.items.length; i++){
                    $("#result-list").append(`
                        <a class="result" href="http://www.youtube.com/watch?v=${dataSearch.items[i].id.videoId}?autoplay=true target="_blank">
                            <div class="row">
                            <img class="col-md-3" src="${dataSearch.items[i].snippet.thumbnails.high.url}" alt="">
                            <div class="video_info col-md-9">
                                <h2 class="title">${dataSearch.items[i].snippet.title}</h2>
                                <p class="description">${dataSearch.items[i].snippet.description}</p>
                                <span>View >></span>
                            </div>
                            </div>
                        </a>`)
                };
                k+=count;
            } else {
                for(let i = j; i < k; i++){
                    $("#result-list").append(`
                        <a class="result" href="http://www.youtube.com/watch?v=${dataSearch.items[i].id.videoId}?autoplay=true target="_blank">
                            <div class="row">
                            <img class="col-md-3" src="${dataSearch.items[i].snippet.thumbnails.high.url}" alt="">
                            <div class="video_info col-md-9">
                                <h2 class="title col-md-9">${dataSearch.items[i].snippet.title}</h2>
                                <p class="description">${dataSearch.items[i].snippet.description}</p>
                                <span>View >></span>
                            </div>
                            </div>
                        </a>`)
                };
                j = k;
                k+=count;
            }
        }
    });
});