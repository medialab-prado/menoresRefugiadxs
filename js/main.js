viewStatus= "story" /* data story */
pagesLoaded= 0
totalPages=7;
window.onload = function() {
    width = 1000,
    height = 1000;
    loadPageTemplates()

    $('#pagepiling').pagepiling({
	    menu: null,
        anchors: ["portada","page1","page2","page3","page4","page5","page6","page7"],
        direction: 'horizontal',
        verticalCentered: true,
        scrollingSpeed: 800,
        easing: 'swing',
        normalScrollElements:'div',
        afterLoad: function(anchorLink, index){
			//using index

            index-=1;
            console.log(index)
            if(index<=0){
                    $('#timeline').fadeOut();
            }else{
                    $('#timeline').fadeIn();
            }


            $('.btn-navigation.active').removeClass('active')
            $('#nav-btn-page'+index + " a").addClass('active')
        }
    });
    //turnEventsOn();

}

function loadPageTemplates(){

    $('#portada').load("templates/portada.html")
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
                $('.story-content, .menu-story-content').show();
                $('.data-content, .menu-data-content').hide();
                //$('.menu-content .switchMode').empty().html("ver datos")
            }
            else{
                $('.story-content, .menu-story-content').hide();
                $('.data-content, .menu-data-content').show();
                //$('.menu-content .switchMode').empty().html("ver historia")
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
