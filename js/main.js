viewStatus= "story" /* data story */
pagesLoaded= 0
totalPages=7;
window.onload = function() {
    width = 1000,
    height = 1000;
    loadPageTemplates()

    $('#pagepiling').pagepiling({
	    menu: null,
        anchors: ["page1","page2","page3","page4","page5","page6","page7"],
        direction: 'horizontal',
        verticalCentered: true,
        scrollingSpeed: 800,
        easing: 'swing',
        afterLoad: function(anchorLink, index){
			//using index
            $('.btn-navigation.active').removeClass('active')
            $('#nav-btn-page'+index + " a").addClass('active')
        }
    });
    //turnEventsOn();

}

function loadPageTemplates(){


    for (var i=1; i<= totalPages; i++){
        (function (n) {
            $('#page-'+n).load("templates/page"+n+".html",function(){
                counterLoading();
                loadModalEvent(n);
            })
        })(i)
    }
    //turnEventsOn();
}

function loadModalEvent(j){
    var modal = new jBox('Modal', {
      attach: '#map-btn-page-'+j,
      content: $('#map-page-'+j),
      closeButton: 'box'
    });
}


function counterLoading(){
    pagesLoaded++;
    if(pagesLoaded >= totalPages){
        //Todas las plantillas cargadas
        $('.menu-content').on("click",'.switchMode', function(e){
            if(viewStatus=="story") viewStatus="data"
            else{
                 viewStatus="story"
            }
            if(viewStatus=="story"){
                $('.story-content').css('transform','rotateY(0)')
                $('.data-content').css('transform','rotateY(180deg)')
                $('.menu-content .switchMode').empty().html("ver datos")
            }
            else{
                $('.story-content').css('transform','rotateY(180deg)')
                $('.data-content').css('transform','rotateY(0)')
                $('.menu-content .switchMode').empty().html("ver historia")
            }
        })
    }
}

function turnEventsOn(){
        /*$('#timeline').on("click",'.btn-navigation', function(e){
            $('.btn-navigation.active').removeClass('active')
            $(this).addClass('active')
        })*/
}
