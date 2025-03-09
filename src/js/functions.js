function url_query( query ) {
    query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var expr = "[\\?&]"+query+"=([^&#]*)";
    var regex = new RegExp( expr );
    var results = regex.exec( window.location.href );
    if ( results !== null ) {
        return results[1];
    } else {
        return false;
    }
}
function draw_feature(feature_key, feature_class) {
    feature_value = url_query( feature_key );
    if (typeof feature_value === "undefined") {

        $("#label").find("."+feature_key).remove();
    }
    else if (feature_value === "NA") {
        $("#label").find("."+feature_key).remove();
    }
    else if (feature_value === false) {
        $("#label").find("."+feature_key).remove();
    }
    else {
        $("#label").find("."+feature_key).remove();
        //$("#label").append('<span class="'+feature_class+' '+feature_key+'"></span>');
        $("#label").append('<img class="svg '+feature_class+' '+feature_key+'" src="/src/images/label-'+feature_key+'-'+feature_value+'.svg" height="30" alt="Open Ethics '+feature_key+': '+feature_value+'">');
    }
}

function replace_svg(selector) {
    $(selector).each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');
            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            $svg.find("style").remove();
            

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });

}

function apply_branding() {
    var palette = {
        "main": "FFFFFFFF", //white
        "bg": "333333FF", //dark gray
        "accent": "333333FF",
        "accent_oe": "3E8914FF",
        "accent_pb": "333333FF"
    }
    color_main = url_query( "main" );
    color_bg = url_query( "bg" );
    color_accent = url_query( "accent" );
    color_accent_oe = url_query( "accent_oe" );
    color_accent_pb = url_query( "accent_pb" );

    //Background color default is transparent
    if (typeof color_bg ==="undefined" || color_bg === false) {
        color_bg = palette.bg;
    }
    else {
        palette.bg = color_bg;
    }
    if (typeof color_main ==="undefined" || color_main === false) {
        color_main = palette.main;
    }
    else {
        palette.main = color_main;
    }
    if (typeof color_accent === "undefined" || color_accent === false) {
        color_accent = palette.accent;
    }
    else {
        palette.accent = color_accent;
    }
    if (typeof color_accent_oe === "undefined" || color_accent_oe === false) {
        color_accent_oe = palette.accent;
    }
    else {
        palette.accent_oe = color_accent_oe;
    }
    if (typeof color_accent_pb === "undefined" || color_accent_pb === false) {
        color_accent_pb = palette.accent;
    }
    else {
        palette.accent_pb = color_accent_pb;
    }
    
        $("#label").css("background-color", "#"+color_bg);
        $(".svg .branding-main").css("fill", "#"+color_main);
        $("#label").css("border-color", "#"+color_main);
        $(".svg .branding-accent").attr("fill", "#"+color_accent);
        $(".svg .branding-accent_oe").attr("fill", "#"+color_accent_oe);
        $(".svg .branding-accent_pb").attr("fill", "#"+color_accent_pb);

}


$(document).ready(function () {
    
    // Example usage - 
    // http://oel/?partner=mc&data=open&source=open&decision=unrestricted&bg=00000000&accent=FFE699FF&main=000000FF&accent_oe=FFE699FF

    var f1 = draw_feature("partner", "network_partner");
    var f2 = draw_feature("data", "feature divider");
    var f3 = draw_feature("source", "feature");
    var f4 = draw_feature("decision", "feature"); 

    replace_svg("img.svg");
    setTimeout(() => { apply_branding(); }, 100);

});