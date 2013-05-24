//分享到QQ空间数据
(function() {
    var p = {
        url : location.href,
        showcount : '1', /*是否显示分享总数,显示：'1'，不显示：'0' */
        desc : '您是否能找到板上所有的匹配？翻转一块墙砖会显示一张图片，然后尝试在其他地方找到其匹配。记住图片的位置，因为如果翻转的墙砖上的图片不匹配，您将必须重试。匹配所有图片才能获胜。', /*默认分享理由(可选)*/
        summary : '翻一下是一款类似小丑配对的游戏，能增加记忆力', /*分享摘要(可选)*/
        title : '翻一下', /*分享标题(可选)*/
        site : 'https://github.com/yanhaijing', /*分享来源 如：腾讯网(可选)*/
        pics : 'http://yanhaijing.github.io/fan1xia/images/fan.gif', /*分享图片的路径(可选)*/
        style:'102',
        width:145,
        height:30
    };
    var s = [];
    for (var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''));
    }
    $("#share-qzone-failed").attr("href", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&'));
})(); 

