
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
    $('#page-1').load("templates/page1.html",function(){console.log("loaded1")})
    $('#page-2').load("templates/page2.html",function(){})
    $('#page-3').load("templates/page3.html",function(){})
    $('#page-4').load("templates/page4.html",function(){})
}

function turnEventsOn(){
        $('#timeline').on("click",'.btn-navigation', function(e){
            $('.btn-navigation.active').removeClass('active')
            $(this).addClass('active')
        })

    }
