/* http://127.0.0.1:3011/public/assets/html/layer/test/demo.html */
$(function () {
    var inArea = {};
    var timer = {};
    function getContentTextWidth($ele) {
        var $child = $('<span/>').text($ele.text()).css({ opacity: 0, position: "absolute", "z-index": -1 }).appendTo($("body"));
        var widthChild = $child.width();
        $child.remove();
        return widthChild;
    }
    function closeTips(vlayerIndex) {
        /* 标记清除 */
        delete inArea[vlayerIndex];
        if (timer[vlayerIndex]) {
            clearTimeout(timer[vlayerIndex]);
        }
        timer[vlayerIndex] = setTimeout(() => {
            if (inArea[vlayerIndex]) {
                return;
            } else {
                layer.close(vlayerIndex);
                delete timer[vlayerIndex];
            }
        }, 200);
    }
    function enter(vlayerIndex) {
        inArea[vlayerIndex] = true;
    }
    $(document).on(
        "mouseenter.layer_tips",
        "[data-tips]",
        function (event) {
            /* tips enter */
            try {
                var $ele = $(this);
                var vlayerIndex = ($ele.attr("data-tips"));
                if (timer[vlayerIndex]) {
                    enter(vlayerIndex);
                    clearTimeout(timer[vlayerIndex]);
                    return;
                }
                var width = $ele.width();
                var widthChild = getContentTextWidth($ele);
                if (width < widthChild) {
                    var tipsConfigs = {
                        tips: [1, "#fff"],
                        time: 1000 * 60 * 1
                    };
                    // var tipsContent = `<div style="overflow:auto;max-height:500px;" class="beautiful-scroll">${$ele.text()}</div>`;
                    var tipsContent = $ele.text();
                    vlayerIndex = layer.tips(tipsContent, this, tipsConfigs);
                    enter(vlayerIndex);
                    $ele.attr("data-tips", vlayerIndex);
                }
            } catch (e) {
                console.warn(e);
            }
        }
    );
    $(document).on(
        "mouseenter.layer_tips",
        ".layui-layer.layui-layer-tips[id^=layui-layer]",
        function (event) {
            /* content enter */
            try {
                var $content = $(this);
                var contentId = $content.attr("id");
                var vlayerIndex = contentId.match(/\d/)[0];
                enter(vlayerIndex);
            } catch (e) {
                console.warn(e);
            }
        }
    );
    /*  */
    $(document).on(
        "mouseleave.layer_tips",
        "[data-tips]",
        function (event) {
            /* leave tips */
            try {
                var $ele = $(this);
                var vlayerIndex = ($ele.attr("data-tips"));
                if (vlayerIndex > -1) {
                    closeTips(vlayerIndex);
                }
            } catch (e) {
                console.warn(e);
            }
        }
    );
    $(document).on(
        "mouseleave.layer_tips",
        ".layui-layer.layui-layer-tips[id^=layui-layer]",
        function (event) {
            /* leave content */
            try {
                var $content = $(this);
                var contentId = $content.attr("id");
                var vlayerIndex = (contentId.match(/\d/)[0]);
                closeTips(vlayerIndex);
            } catch (e) {
                console.warn(e);
            }
        }
    );
});


