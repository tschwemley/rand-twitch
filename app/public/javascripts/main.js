$(document).ready(function() {

    // Initialize multi select before data is returned.
    $('#category-select').selectivity({
        items: [],
        multiple: true,
        placeholder: 'Select games...'
    });

    // Construct multi select and define global items array (default all categories list).
    var items = [];
    $.getJSON('/twitch-api/games', function(data) {
        $.each(data, function(key, value) {
            items[key] = value.game.name;
        });

        $('#category-select').selectivity('setOptions', {items: items});
    });

    // Process form
    $('#video-form').submit(function(e) {
        var categories = $('#category-select').selectivity('data'),
            categoryLength = categories.length,
            category;

        // Choose a random category form all categories (default) or form user selected categories
        if (categoryLength == 0) {
            category = items[Math.floor(items.length * Math.random())];
        } else {
            category = categories[Math.floor(categoryLength * Math.random())].text;     
        }

        // Get the form data
        var formData = {
            'category' : category
        };

        // Process the form
        $.ajax({
            type     : 'POST',
            url      : '/twitch-api/streams',
            data     : formData,
            dataType : 'json'           
        })
        
        // Handle the actual form result
        .done(function(stream) {
            console.log(stream);
            var iframe = '<iframe id="player" type="text/html" width="640" height="360" '
                + 'src="http://www.twitch.tv/' + stream.channel.name + '/embed" frameborder="0"></iframe>';

            var detailsHtml = '<div id="stream-details">' + 
                '<strong>Game:</strong> ' + stream.game + '<br/>' +
                '<strong>Viewers:</strong> ' + stream.viewers + '<br/>' +
                '<strong>Streamer:</strong> <a href="'+ stream.channel.url +'">' + stream.channel.display_name + '</a><br/>' +
                '<strong>Followers:</strong> ' + stream.channel.followers + '<br/>' +
                '<strong>Total Views:</strong> ' + stream.channel.views + '<br/>' +
                '</div>';

            $('#theater').hide().html(detailsHtml + iframe);
            $('#theater').slideDown("slow");
        });

        e.preventDefault();
    });

    $(document).ajaxStart(function() {
        $('#theater').html('<img src="/images/load-bars.svg" alt="Loading icon" />'); 
    });
});
