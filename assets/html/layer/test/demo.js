$(function () {
    //关于

    $(document).on("click", "[v-tips]", function (ele) {
        try {
            var $ele = $(this);
            var width = $ele.width();
            var $child = $('<span/>').text($ele.text()).css({ opacity: 0, position: "absolute" }).appendTo($("body"));
            var widthChild = $child.width();
            $child.remove();
            if (width < widthChild) {
                layer.tips($ele.text(), this, {
                    tips: 1
                });
            }
        } catch (e) {
            console.error(e);
        }

    });

    $("#about").on("click", function () {
        //页面一打开就执行，放入ready是为了layer所需配件（css、扩展模块）加载完毕
        layer.ready(function () {
            layer.open({
                type: 2,
                title: "欢迎页",
                maxmin: true,
                area: ["800px", "500px"],
                content: "/",
                end: function () {
                    layer.tips("Hi", "#about", { tips: 1 });
                }
            });
        });
    });
});