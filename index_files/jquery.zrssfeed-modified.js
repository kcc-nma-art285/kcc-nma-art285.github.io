/**
 * Plugin: jquery.zRSSFeed
 * 
 * Version: 1.0.1
 * (c) Copyright 2010, Zazar Ltd
 * 
 * Description: jQuery plugin for display of RSS feeds via Google Feed API
 *              (Based on original plugin jGFeed by jQuery HowTo)
 * 
 * Modified by Richard Mackney (originally for Instagram images, see https://gist.github.com/865838)
 * Modified further by Marie Mosley for a Pinterest "gadget" for Blogger.
 * Modified further further by Zalary Young for a Pinterest widget for TypePad 
 *  -- added extraction of img url and using nailthumb for better resizing 
 **/

(function($){

	var current = null; 
	
	$.fn.rssfeed = function(url, options) {	
	
		// Set plugin defaults
		var defaults = {
			limit: 6,
			titletag: 'h4',
			content: true,
			snippet: true,
			showerror: true,
			errormsg: '',
			key: null
		};  
		var options = $.extend(defaults, options); 
		
		// Functions
		return this.each(function(i, e) {
			var $e = $(e);
			
			// Add feed class to user div
			if (!$e.hasClass('rssFeed')) $e.addClass('rssFeed');
			
			// Check for valid url
			if(url == null) return false;

			// Create Google Feed API address
			var api = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + url;
			if (options.limit != null) api += "&num=" + options.limit;
			if (options.key != null) api += "&key=" + options.key;

			// Send request
			$.getJSON(api, function(data){
				
				// Check for error
				if (data.responseStatus == 200) {
	
					// Process the feeds
					_callback(e, data.responseData.feed, options);
				} else {

					// Handle error if required
					if (options.showerror)
						if (options.errormsg != '') {
							var msg = options.errormsg;
						} else {
							var msg = data.responseDetails;
						};
						$(e).html('<div class="rssError"><p>'+ msg +'</p></div>');
				};
			});				
		});
	};

	
	// Callback function to create HTML result
	var _callback = function(e, feeds, options) {
		if (!feeds) {
			return false;
		}
		var html = '';	
		var row = 'odd';	
		
		
			
		// Add body
		html += '<div class="rssBody">' +
			'<ul>';
		
		// Add feeds
		for (var i=0; i<feeds.entries.length; i++) {
			
			// Get individual feed
			var entry = feeds.entries[i];

			//YY 6/28/2012
//Should hold link string at the end of this process ("http://......fjesio_fjei.jpg")
			var jpgLink = '';
//Temporary variables
			var jpgFound  = -1;
			var jpgTemp = '';
			jpgFound = entry.content.indexOf('><img src="');
			if (jpgFound != -1)
			{
				var jpgTemp = entry.content.substr(jpgFound + '><img src="'.length);
				if (jpgTemp.length > 0)
				{
					jpgFound = jpgTemp.indexOf('"><');
					if (jpgFound != -1)
					{
						jpgLink = jpgTemp.substring(0, jpgFound);
					}
				}
			}
			

			// Add feed row
			html += '<li class="rssRow '+row+'">' + 
				'<'+ options.titletag +'><a href="'+ entry.link +'" title="View this feed at '+ feeds.title +'">'+ entry.title +'</a></'+ options.titletag +'>'
			if (options.date) html += '<div>'+ pubDate +'</div>'
			if (options.content) {
			
				// Use feed snippet if available and optioned
				if (options.snippet && entry.contentSnippet != '') {
					var content = entry.contentSnippet;
				} else {
					var content = entry.content;


				}
				
				html += '<div class="nailthumb-container square"><a href="'+entry.link+'" title="'+ entry.title +' " target="_blank"><img src="'+ jpgLink +'" /></a></div>'
			}
			
			html += '</li>';

			
			// Alternate row classes
			if (row == 'odd') {
				row = 'even';
			} else {
				row = 'odd';
			}			
		}
		
		html += '</ul>' +
			'</div>'

		
		$(e).html(html);

		//correct href for images so they point to Pinterest
			$(function() {
  			$('.rssFeed a').each(function() {
    			var href = $(this).attr('href');
    			$(this).attr('href', '' + href);
  });
});

           
	};
})(jQuery);