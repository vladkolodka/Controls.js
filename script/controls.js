$(function (){

    
    $(".roller").each(function (index, element) {
        var positions = [];

        element = $(element);
        var elements = element.find(".point");
        var elementsCount = elements.size();
        var lastPoint = elements.last();
        var offset = (element.width() / (elementsCount - 1)) - lastPoint.width() / 2;
        var pointer = element.find(".pointer");
        var width = element.width() - lastPoint.width();
        elements.first().css("left", 0);
        lastPoint.css("left", element.width() - (lastPoint.width()));

        var localOffset = offset;
        elements.each(function (index, point) {
            point = $(point);

            // set point position if it is not first or last point
            if(index != 0 && index != elementsCount - 1){
                point.css("left", localOffset);

                // increase offset
                localOffset += offset;
            }

            // if point checked
            if(point.attr("data-checked")){
                element.find(".pointer").css("left", point.css("left"));
                element.attr("data-value", point.attr("data-value"));
            }

            // write point coors to array
            positions.push([point.attr("data-value"), parseInt(point.css("left"))]);

        });
        pointer.mousedown(function (event) {
            var pointerOffset = event.clientX - pointer.offset().left + parseInt(pointer.css("marginLeft"));
            $("html").bind("mousemove", function (e) {
               var pos = e.clientX - element.offset().left - pointerOffset;
               if(pos < 0 || pos > width) return false;
                pointer.css("left", pos);
           }).bind("mouseup", function () {
                $("html").unbind("mousemove").unbind("mouseup");

                var pos = parseInt(pointer.css("left"));
                var first = 0;

                for(var i = 0; i < positions.length; i++){
                    if(positions[i][1] < pos) first = i;
                    else break;
                }

                var val1 = pos - positions[first][1];
                var val2 = positions[first + 1][1] - pos;


                if(val1 >= val2){ // правая точка
                    first++;
                }
                pointer.animate({left: positions[first][1]}, 100, "swing");
                element.attr("data-value", positions[first][0]);
            });

        });
    });
});