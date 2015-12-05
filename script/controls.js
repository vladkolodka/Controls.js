$(function (){
    
    
    $(".roller").each(function (index, element) {
        element = $(element);
        var elements = element.find(".point");
        var elementsCount = elements.size();
        var lastPoint = elements.last();
        var offset = (element.width() / (elementsCount - 1)) - lastPoint.width() / 2;

        alert(offset);
        lastPoint.css("left", element.width() - (lastPoint.width() / 2));

        var localOffset = offset;
        elements.each(function (index, element) {
            if(index == 0 || index == elementsCount - 1) return true;

            $(element).css("left", localOffset);
            localOffset += offset;
        });
    });

});