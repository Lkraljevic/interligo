var startPageflip;

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$( function() {
	var $pageflip = $("#pageflip"),
		pageflip,
		
		/* Book configurations, each is an object, with the book id as identifier */
		bookConfig = {
				/* book ID - used as CSS class name */
			meetpageflip: {
				/* Configuration options */
					PageDataFile: "books/template1_meet_pageflip/meetpageflip.html",
					PageWidth: 450,
					PageHeight: 600,
					FullScreenEnabled: true,
					Transparency: true,
					Margin: 32,
					MarginBottom: 64,
					AutoScale: true,
					//FullScale: true,
					AlwaysOpened: false,
					AutoFlipLoop: -1,
					CenterSinglePage: true,
					DropShadowOpacity: 0.3,
					FlipTopShadowOpacity: 0.2,
					FlipShadowOpacity: 0.2,
					HardFlipOpacity: 0.3,
					EmbossOpacity: 0.2,
					SecondaryDragArea: 32,
					Transparency: true,
					ControlbarFile: "common/controlbar_svg.html",
					GoogleAnalytics: true,
					HashControl: true,
					ShareLink: "http://pageflip-books.com",
					ShareText: "Pageflip5, The Book Template for the Web",
					ShareVia: "@MaccPageFlip",
					ShareImageURL: "http://pageflip-books.com/images/shareimage.jpg",
					ShowCopyright: false,
					Copyright: Key.Copyright,
					Key: Key.Key
				},
			demo2: {
					/* Configuration options */
					PageDataFile: "books/template2_demobook2/demobook2.html",
					PageWidth: 434,
					PageHeight: 568,
					HardPages: true,
					FullScreenEnabled: true,
					Transparency: true,
					Margin: 0,
					AutoScale: true,
					//FullScale: true,
					FlexibleContent: true,
					StartPage: 1,
					AutoFlipLoop: -1,
					Thumbnails: true,
					ThumbnailsToFront: true,
					ThumbnailsAutoHide: 5000,
					ThumbnailsHidden: true,
					ThumbnailAlwaysCentered: true,
					ThumbnailWidth: 104,
					ThumbnailHeight: 120,
					ControlbarFile: "common/controlbar_svg.html",
					ControlbarToFront: true,
					Preflip: false,
					HashControl: true,
					ShareLink: "http://pageflip-books.com",
					ShareText: "Pageflip5, The Book Template for the Web",
					ShareVia: "@MaccPageFlip",
					ShareImageURL: "http://pageflip-books.com/images/shareimage2.jpg",
					Copyright: Key.Copyright,
					Key: Key.Key
				},
			book: {
					/* Configuration options */
					PageDataFile: "books/template3_empty/book.html",
					PageWidth: 400,
					PageHeight: 500,
					FullScreenEnabled: true,
					Margin: 34,
					MarginBottom: 64,
					AutoScale: true,
					AutoStageHeight: true,
					StartPage: 1,
					AutoFlipLoop: -1,
					ControlbarFile: "common/controlbar_svg.html",
					ControlbarToFront: true,
					HashControl: true,
					ShareLink: "http://pageflip-books.com",
					ShareText: "Pageflip5, The Book Template for the Web",
					ShareVia: "@MaccPageFlip",
					ShareImageURL: "http://pageflip-books.com/images/shareimage2.jpg",
					Copyright: Key.Copyright,
					Key: Key.Key
				},
			casopis: {
					/* Configuration options */
					PageDataFile: "books/casopis/casopis.html",
					PageWidth: 450,
					PageHeight: 600,
					FullScreenEnabled: true,
					Transparency: true,
					Margin: 32,
					MarginBottom: 64,
					AutoScale: true,
					//FullScale: true,
					AlwaysOpened: false,
					AutoFlipLoop: -1,
					CenterSinglePage: true,
					DropShadowOpacity: 0.3,
					FlipTopShadowOpacity: 0.2,
					FlipShadowOpacity: 0.2,
					HardFlipOpacity: 0.3,
					EmbossOpacity: 0.2,
					SecondaryDragArea: 32,
					Transparency: true,
					ControlbarFile: "common/controlbar_svg.html",
					GoogleAnalytics: true,
					HashControl: true,
					ShowCopyright: false,
					Copyright: Key.Copyright,
					Key: Key.Key
				},
			casopis1: {
					PageDataFile: (getCookie("unlock") == '0702')?"books/casopis1/index.html":"books/casopis/casopis.html",
					PageWidth: 600,
					PageHeight: 800,
					Margin: 32,
					MarginBottom: 64,
					PerformanceAware: false,
					AutoScale: true,
					//FullScale: true,
					HardCover: true,
					HardPages: false,
					RightToLeft: false,
					VerticalMode: false,
					AlwaysOpened: false,
					AutoFlipEnabled: false,
					StartAutoFlip: false,
					AutoFlipLoop: -1,
					DropShadow: true,
					NoFlipShadow: false,
					Emboss: true,
					DropShadowOpacity: 0.2,
					FlipTopShadowOpacity: 0.2,
					FlipShadowOpacity: 0.2,
					HardFlipOpacity: 0.2,
					EmbossOpacity: 0.2,
					HashControl: true,
					PageCache: 5,
					MouseControl: true,
					HotKeys: true,
					ControlbarFile: "common/controlbar_svg.html",
					ControlbarToFront: false,
					FullScreenEnabled: true,
					ShareLink: window.location.href,
					ShareText: 'Interligo',
					ShareVia: '@Interligo',
					ShareImageURL: 'page0.jpg',
					DisableSelection: true,
					CenterSinglePage: true,
					SinglePageMode: false,
					ShowCopyright: false,
					//Copyright: '©Interligo2017 ',
					//Key: 'XGDCWcVcHA1yksRaYzDv'
					Copyright: Key.Copyright,
					Key: Key.Key
				}
			

		},
		defaultID = "casopis1",	//"demo1",
		startID = defaultID,
		loadedID,
		closing,
		
		/* initial hash check (multibook feature: which book to load first?) */
		getHashID = function() {
			var h = location.hash;
			return h.substr( 1 ).split("/")[0];
		},
		
		id = getHashID();
				
	/* start the first book automatically! */
	startPageflip = function( id , force) {
		if( !force && (closing || id==loadedID)) return
		if( loadedID ) {
			/* we have a loaded book, so unload it first */
			closing = true;
			loadedID = undefined;
			pageflip.closePageflip( function() { closing = false; startPageflip( id ); } );
		} else {
			/* load the book */
			loadedID = id;
			var h = getHashID();
			if( ( defaultID==id && h && h!=id ) || ( defaultID!=id && h!=id ) ) 
				location.hash = id;
			$pageflip.pageflipInit( bookConfig[id], id );
			pageflip = $pageflip.pageflip();
			window.pageflip = pageflip;
		}
	};
	
	if( bookConfig[id] && defaultID!=id ) {  startID = id; } 
	else { 
		if( $("#"+id).length ) 
			gotoAnchor( "#"+id ); 
	}

	startPageflip( startID );

});