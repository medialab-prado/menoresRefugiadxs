viewStatus= "story" /* data story */
pages= 0
totalPages=3;
window.onload = function() {
    console.log("on load")
    width = 1000,
    height = 1000;
    loadPageTemplates()


    $('#pagepiling').pagepiling({
	    menu: null,
        anchors: ["page1","page2","page3","page4"],
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
    console.log("load templates")

    $('#page-1').load("templates/page1.html",function(){
        loadModalEvent(1);
        counterLoading();
    })

    $('#page-2').load("templates/page2.html",function(){
        loadModalEvent(2);
        counterLoading();
    })

    $('#page-3').load("templates/page3.html",function(){
        loadModalEvent(3);
        counterLoading();
    })
    $('#page-4').load("templates/page4.html",function(){
            loadModalEvent(4);
            counterLoading();
    })
    turnEventsOn();

}

function loadModalEvent( i){
    var modal = new jBox('Modal', {
      attach: '#map-btn-page-'+i,
      content: $('#map-page-'+i),
      closeButton: 'box'
    });
}


function counterLoading(){
    pages++;

    if(pages>totalPages){
        $('.menu-content').on("click",'.switchMode', function(e){
            console.log("menu content")
            if(viewStatus=="story") viewStatus="data"
            else{
                 viewStatus="story"
            }

            if(viewStatus=="story"){
                $('.story-content').show();
                $('.data-content').hide();
                $('.menu-content .switchMode').empty().html("ver datos")
            }
            else{
                $('.story-content').hide();
                $('.data-content').show();
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
