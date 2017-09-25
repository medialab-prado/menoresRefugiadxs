
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
        var modal = new jBox('Modal', {
          attach: '#map-btn-page-1',
          content: $('#map-page-1'),
          closeButton: 'box'
        });
    })

    $('#page-2').load("templates/page2.html",function(){
        var modal = new jBox('Modal', {
          attach: '#map-btn-page-2',
          content: $('#map-page-2'),
          closeButton: 'box'
        });
    })

    $('#page-3').load("templates/page3.html",function(){
        var modal = new jBox('Modal', {
          attach: '#map-btn-page-3',
          content: $('#map-page-3'),
          closeButton: 'box'
        });
    })
    $('#page-4').load("templates/page4.html",function(){
        var modal = new jBox('Modal', {
          attach: '#map-btn-page-4',
          content: $('#map-page-4'),
          closeButton: 'box'
        });
    })
    turnEventsOn();
}

function turnEventsOn(){
        /*$('#timeline').on("click",'.btn-navigation', function(e){
            $('.btn-navigation.active').removeClass('active')
            $(this).addClass('active')
        })*/


    }
