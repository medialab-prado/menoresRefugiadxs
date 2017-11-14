viewStatus= "story" /* data story */
pagesLoaded= 0
totalPages=8;
var windowWidth = $(window).width();


window.onload = function() {
    width = 1000,
    height = 1000;

    loadData();
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
    });  //turnEventsOn();
    windowWidth = $(window).width();
   $(window).resize(function(){

       // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
           if ($(window).width() != windowWidth) {
               // Update the window width for next time

               windowWidth = $(window).width();
               // Do stuff here
               if(windowWidth<900) location.reload();
           }
   })
}

function loadData(){
    $.getJSON( "data/textos.json", function( data ) {
      n_projects=Object.keys(data).length;
      paginasData=data;
      console.log("astas")
      loadPageTemplates()
    }).fail(function() {
        console.log( "error" );
    })
}

sufix="desk"
n_projects=7;
function renderPage(pageNumber ){
    //$("body").fadeOut();
    console.log(pageNumber)
    //$("body").empty();
    if(pageNumber==0){
        my.utils().renderExtTemplate({ name: 'portada_'+sufix, selector: 'body', data: {}  })
    }
    else if(pageNumber==6){
        var mdata=paginasData[pageNumber-1]
        my.utils().renderExtTemplate({ name: 'page6_'+sufix, selector: '#page-'+pageNumber, index : pageNumber, data: mdata  })
    }
    else{
        var mdata=paginasData[pageNumber-1]
        my.utils().renderExtTemplate({ name: 'page_'+sufix, selector: '#page-'+pageNumber, index : pageNumber, data: mdata })
    }
}


function loadPageTemplates(){
    my.utils().renderExtTemplate({ name: 'portada_'+sufix, selector: '#portada', data: {}, index : 0  })
    /*$('#portada').load("templates/portada.html",function(){
        loadModalEvent(0);
    })*/

    for (var i=1; i<= totalPages-1; i++){
        /*(function (n) {
            $('#page-'+n).load("templates/page"+n+".html",function(){
                counterLoading();
                loadModalEvent(n);
            })
        })(i)*/
        renderPage(i)
    }
    //turnEventsOn();
}

function loadModalEvent(j){
    //console.log(j)
    var modal = new jBox('Modal', {
      attach: '#map-btn-page-'+j,
      content: $('#map-page-'+j),
      closeButton: 'box'
    });

    var modal2=
    new jBox('Modal', {
        width: '60%',
        height: '80%',
      attach: '#referencias-page-btn-'+j,
      //content: $('#referencias-page-'+j),
      ajax: {
        url: 'referencias/page'+j+".html",
        reload: 'strict'
        },
      closeButton: 'box'
    });

}

function counterLoading(){
    pagesLoaded++;
    $('.verstory-btn').hide();
    if(pagesLoaded >= totalPages){
        var ssize=$( window ).height();
        var bottomSize=$( "#timeline" ).height();
        $('.story-content').css("height",ssize-bottomSize+'px')
        $('.data-content').css("height",ssize-bottomSize+'px')
        //Todas las plantillas cargadas
        $('.extra-btn-container').on("click",'.switchMode', function(e){
            if(viewStatus=="story")
            {
                viewStatus="data"
            }
            else{
                 viewStatus="story"
            }
            if(viewStatus=="story"){
                $('.story-content, .menu-story-content').show();
                $('.data-content, .menu-data-content').hide();
                $('.verstory-btn').hide();
                $('.vergrafico-btn').show();
                //$('.menu-content .switchMode').empty().html("ver datos")
            }
            else{
                $('.story-content, .menu-story-content').hide();
                $('.data-content, .menu-data-content').show();
                $('.vergrafico-btn').hide();
                $('.verstory-btn').show();
                //$('.menu-content .switchMode').empty().html("ver historia")
            }
        })

        $('#page-6').on("click",'.carousel-btn a', function(e){
            $('.carousel-btn a.active').removeClass("active")
            $(this).addClass("active")
        });


    }
}

function turnEventsOn(){
        /*$('#timeline').on("click",'.btn-navigation', function(e){
            $('.btn-navigation.active').removeClass('active')
            $(this).addClass('active')
        })*/
}

var my = my || {};
my.utils = (function() {
    var getPath = function(name) {
        return 'templates/' + name + '.tmpl.html';
    },
    renderExtTemplate = function(item) {
        var file = getPath( item.name );
        $.when($.get(file))
         .done(function(tmplData) {
             n_projects--;
             var tmpl= $.templates( tmplData );
             var rendered=tmpl.render(item.data)
             $(item.selector).append(rendered);
              //setCardSizes();
              afterLoading(item.index);
         });
    };

    return {
        getPath: getPath,
        renderExtTemplate: renderExtTemplate
    };
});
function afterLoading(i){
    //$("body").fadeIn();
    //reloadEvents();
    if(i>0)loadModalEvent(i)
    counterLoading();
}
