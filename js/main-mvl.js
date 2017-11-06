viewStatus= "story" /* data story */
pagesLoaded= 0
totalPages=7;
currentPage=0;
window.onload = function() {
    loadData()
    /**** mobile ****/
}

function reloadEvents(){
    $('a[href^="#"].link-menu').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);
        $('.link-menu.active').removeClass("active")
        $(this).addClass("active")
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
        my.utils().renderExtTemplate({ name: 'portadamvl', selector: 'body', data: {}  })
    }
    else{
        var mdata=paginasData[pageNumber-1]
        mdata.showPrev=mdata.showNext=true
        if(pageNumber==1) mdata.showPrev=false;
        if(pageNumber==7) mdata.showNext=false;
        my.utils().renderExtTemplate({ name: 'index_mob', selector: 'body', data: mdata })
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
