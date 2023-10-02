// description: js for info page

$('.accordion').on('click', '.accordion-control', function (e) {
    e.preventDefault();
    $(this)
    .next('.accordion-panel')
    .not(':animated')
    .slideToggle();
});

// Remove modal from page
(function(){
    var $content = $('#share-options').detach();

// Click handler to open modal
    $('#share').on('click', function() {
    modal.open({content: $content, width:340, height:300});
    });
}());

// Declare modal object
var modal = (function() {
// Store the window
    var $window = $(window);
    var $modal = $('<div class="modal"/>');
    var $content = $('<div class="modal-content"/>');
    var $close = $('<button role="button" class="modal-close">close</button>');
    
// Add close button to modal
    $modal.append($content, $close);
    
// Close the modal window
    $close.on('click', function(e){
    e.preventDefault();
    modal.close();
    });

return {
    center: function() {
    // Calculate distance from top and left of window to center the modal
    var top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
    var left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;
        $modal.css({
        top:top + $window.scrollTop(),
        left:left + $window.scrollLeft()
    });
    },
    open: function (settings) {
    // Set new content of modal
        $content.empty().append(settings.content);

        $modal.css({
        width: settings.width || 'auto',
        height: settings.height || 'auto'
        }).appendTo('body');

        modal.center();
        // Call it if window resized
        $(window).on('resize', modal.center);
    },
    close: function() {
        $content.empty();
        // Remove modal from page
        $modal.detach();
        $(window).off('resize', modal.center);
    }
    };
}());