var lastEl;
var activeCls = 'ui-reelList-shortcut-active';

function getCurActive() {
	return document.querySelectorAll('.ui-reelList-active')[0];
}

function addClass(el, cls) {
	el.className += ' ' + cls;
}

function delClass(el, cls) {
	var oldCls = el.className;
	if (oldCls.indexOf(cls) != - 1) {
		el.className = oldCls.replace(new RegExp('\\s*' + cls + '\\s*', 'g'), '');
	}
}

function getId(el) {
	return $(el).attr('reellist-row')
}

function move(dir) {
	if (!lastEl) {
		lastEl = getCurActive();
	}

	var oldEl = lastEl;
	var oldId = getId(oldEl);
    var total = +$('.amount .amount').text();

	//尝试用索引去找
	if (dir == 'next') {
		oldId++;
	} else {
		oldId--;
	}

    if( oldId < 0 || oldId == total ) {
        return false;
    }

	lastEl = $('div[reellist-row="' + oldId + '"]');

	if (!lastEl) {
		lastEl = oldEl;
		return false;
	}

	$(oldEl).removeClass(activeCls);
	$(lastEl).addClass(activeCls);

	//滚动到可视区域内
	listView.list.reelList('scrollToRow', oldId)
}

function del() {
	if (!lastEl) {
		lastEl = getCurActive();
	}

	//百度音乐的全局变量, 接收参数为元素上的reellist-row
	boxCtrl.removeSong(getId(lastEl));
}

function play() {
	$(lastEl).dblclick();
}

function help() {
	var html = '<div class="baidu-music-shortcut">\
                    <table width="300">\
                        <tbody>\
                            <tr>\
                                <td  class="l" width="80" valign="top">\
                                    <strong>快捷键</strong>\
                                </td>\
                                <td class="r" width="220" valign="top">\
                                    <strong>说明</strong>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="l" width="389" valign="top">\
                                    j或↑\
                                </td>\
                                <td class="r" width="389" valign="top">\
                                    前一首\
                                </td>\
                            </tr>\
                            <tr>\
                                <td  class="l" width="389" valign="top">\
                                    k或↓\
                                </td>\
                                <td class="r" width="389" valign="top">\
                                    下一首\
                                </td>\
                            </tr>\
                            <tr>\
                                <td class="l"  width="389" valign="top">\
                                    #\
                                </td>\
                                <td class="r" width="389" valign="top">\
                                    删除当前\
                                </td>\
                            </tr>\
                            <tr>\
                                <td  class="l" width="389" valign="top">\
                                    o或enter\
                                </td>\
                                <td  class="r"width="389" valign="top">\
                                    播放选中的\
                                </td>\
                            </tr>\
                            <tr>\
                                <td  class="l" valign="top" colspan="1" rowspan="1" style="">\
                                    ?\
                                </td>\
                                <td  class="r" valign="top" colspan="1" rowspan="1" style="">\
                                    显示本帮助\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                    <div class="info">\
                    作者:<a target="_blank" href="http://jser.me">草依山</a> &nbsp;&nbsp;&nbsp; <a target="_blank" href="http://weibo.com/ihubo">微博</a>&nbsp;&nbsp;&nbsp; <a href="https://github.com/jserme/baidu-music-shortcut" target="_blank">源码</a>\
                    </div>\
        </div>\
    ';

	$('body').append(html);

	var el = $('.baidu-music-shortcut');
	var h = el.height();
	var w = el.width();

	el.css({
		left: ($(document).width() - w) / 2,
		top: document.body.scrollTop + ($(document).height() - h) / 2
	});

	$(document).one('click', function() {
		el.remove();
	})
}

function star() {

}

key('j', function() {
	move('next')
});

key('down', function() {
	move('next')
});

key('k', function() {
	move('previous')
});
key('up', function() {
	move('previous')
});

key('o', play);
key('enter', play);

//key('s', star);
key('shift+3', del) //#
key('delete', del)

key('shift+/', help); //?

