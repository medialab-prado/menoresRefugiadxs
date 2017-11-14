viewStatus= "story" /* data story */
pagesLoaded= 0
totalPages=7;
currentPage=0;
mode="desktop"
sufix="desk"

window.onload = function() {
    wwidth=$( window ).width();
    if(wwidth<900) {
        mode="mobile"
        sufix="mob"
    }

    loadData()
    /**** mobile ****/
    windowWidth = $(window).width();
   $(window).resize(function(){

       // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
           if ($(window).width() != windowWidth) {
               // Update the window width for next time
               windowWidth = $(window).width();
               // Do stuff here
               if(windowWidth>900) location.reload();
           }
   })
}

function reloadEvents(){
    $('a[href^="#"].link-menu').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);
        //$('.link-menu.active').removeClass("active")
        //$(this).addClass("active")
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    $('.next').on('click',function (e) {
        renderPage(++currentPage)
    });

    $('.prev').on('click',function (e) {
        renderPage(--currentPage)
    });

    $('#page-6').on("click",'.carousel-btn a', function(e){
        $('.carousel-btn a.active').removeClass("active")
        $(this).addClass("active")
    });

    Waypoint.destroyAll()
    var waypoints = $('#story, #mapa, #datos').waypoint({
      handler: function(direction) {
          console.log(direction)
          if(direction=="down")
            enableMenuElement(this.element.id)
        },
        offset: '11%'
    })
    var waypoints = $('#story, #mapa, #datos').waypoint({
      handler: function(direction) {
          console.log(direction)
          if(direction=="up")
            enableMenuElement(this.element.id)
        },
        offset: '-11%'
    })

    var modal2=
    new jBox('Modal', {
        width: '90%',
        height: '90%',
      attach: '#referencias-page-btn-'+currentPage,
      //content: $('#referencias-page-'+j),
      ajax: {
        url: 'referencias/page'+currentPage+".html",
        reload: 'strict'
        },
      closeButton: 'box'
    });

/*    var waypoints = $('#mapa').waypoint({
      handler: function(direction) {
        enableMenuElement(this.element.id)
      }
    })
    var waypoints = $('#datos').waypoint({
      handler: function(direction) {
        enableMenuElement(this.element.id)
      }
  })*/
}
function enableMenuElement(idElement){
    console.log(idElement)
    $('.link-menu.active').removeClass("active")
    var menu_el=$('a[href^="#'+idElement+'"].link-menu')
    $(menu_el).addClass("active")
}


function loadData(){
    $.getJSON( "data/textos.json", function( data ) {

      n_projects=Object.keys(data).length;
      paginasData=data;

      renderPage(currentPage)

    });
}

function renderPage(pageNumber ){
    //$("body").fadeOut();
    console.log(pageNumber)
    $("body").empty();
    if(pageNumber==0){
        my.utils().renderExtTemplate({ name: 'portada_'+sufix, selector: 'body', data: {}  })
    }
    else if(pageNumber==6){
        var mdata=paginasData[pageNumber-1]
        mdata.showPrev=mdata.showNext=true
        my.utils().renderExtTemplate({ name: 'page6_'+sufix, selector: 'body', data: mdata  })
    }
    else{
        var mdata=paginasData[pageNumber-1]
        mdata.showPrev=mdata.showNext=true
        //if(pageNumber==1) mdata.showPrev=false;
        if(pageNumber==7) mdata.showNext=false;
        my.utils().renderExtTemplate({ name: 'page_'+sufix, selector: 'body', data: mdata })
    }
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
              afterLoading();
         });
    };

    return {
        getPath: getPath,
        renderExtTemplate: renderExtTemplate
    };
});
function afterLoading(){
    $("body").fadeIn();
    reloadEvents();
}
