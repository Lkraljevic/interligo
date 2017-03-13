var startPageflip;
var unlock;
var bindDownload;

function showPasswordDialog() {
	var el = document.getElementById('popup');
	el.classList.add('active');
}

function hidePasswordDialog() {
	var el = document.getElementById('popup');
	el.classList.remove('active');
	var input = document.getElementById('password');
	input.value = '';
}

function submitPassword() {
	var input = document.getElementById('password');
	var error = document.getElementById('error');
	var v = validate(input.value);
	if(v) {
		error.innerHTML = v;
	} else {
		error.innerHTML = '';
		hidePasswordDialog();
	}
}

function validate(value) {
	if(value == 'a0217') {
		document.cookie = "unlock=a0217";
		unlock();
		startPageflip('apartman_plus_02_2017_web', true);
		return false
	}
	else
		return 'Kriva lozinka!'
}

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
			apartman_plus_02_2017_web: {
				PageDataFile: (getCookie("unlock") == 'a0217')?"books/apartman-plus-02-2017_web/index.html":"books/apartman-plus-02-2017_web/locked.html",
				DownloadLink: 'books/apartman-plus-02-2017_web/Apartman-plus-02-2017.pdf',
				PageWidth: 734,
				PageHeight: 980,
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
		defaultID = "apartman_plus_02_2017_web",	//"demo1",
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
			bindDownload = function() {
				var downloadLink = document.getElementById('b-download');
				console.log(bookConfig[id].DownloadLink);
				downloadLink.onclick=function(){window.open(bookConfig[id].DownloadLink);}
				downloadLink.ontouchstart=function(){window.open(bookConfig[id].DownloadLink);}
			}
		}
	};
	
	unlock = function() {
		bookConfig = {
		/* book ID - used as CSS class name */
	apartman_plus_02_2017_web: {
		PageDataFile: (getCookie("unlock") == 'a0217')?"books/apartman-plus-02-2017_web/index.html":"books/apartman-plus-02-2017_web/locked.html",
		DownloadLink: 'books/apartman-plus-02-2017_web/Apartman-plus-02-2017.pdf',
		PageWidth: 734,
		PageHeight: 980,
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
};
		document.body.classList.add('unlock');	
	}
	
	if( bookConfig[id] && defaultID!=id ) {  startID = id; } 
	else { 
		if( $("#"+id).length ) 
			gotoAnchor( "#"+id ); 
	}

	startPageflip( startID ); 
	
	if(getCookie("unlock") == 'a0217')
		unlock();

});