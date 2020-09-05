var x = (function () {
    var current = 1;
    function createCarousel(obj) {
        var str = '', figure = '', pagechange = '', circular = '';
        for (let i = 0; i < obj.src.length; i++) {
            figure += `<img src="${obj.src[i]}">`
        }
        figure = `
            <figure>
            <img src="${obj.src[obj.src.length - 1]}" >
                ${figure}
            <img src="${obj.src[0]}" alt="">
            </figure>`
        pagechange = `
                <div class="pagechange">
                    <div id="prev"><img src="img/prev.png"></div>
                    <div id="next"><img src="img/next.png"></div>
                </div>`
        for (let i = 0; i < obj.src.length; i++) {
            circular += `<li></li>`
        }
        if (obj.circular) {
            circular = `
                <div div class="circular" >
                    <ul>${circular}</ul>
                </div>`
        } else {
            circular = ''
        }
        str = figure + pagechange + circular;
        return `<div id="CarouselBox"><div id="viewport">${str}</div></div>`;
    }
    function init(obj) {
        $('#viewport').css({
            width: obj.width + 'px',
            height: obj.height + 'px',
        })
        $('figure').css({
            width: obj.width * (obj.src.length + 2) + 'px',
            height: obj.height + 'px',
            left: -obj.width + 'px',
            transition: 'all 0.3s'
        })
        $('figure img').css({
            width: obj.width + 'px',
            height: obj.height + 'px',
        })
        $('.circular').css({
            width: 26 * obj.src.length + 'px',
        })
        $('.circular li').eq(current - 1).addClass('cirthis')
    }
    function event(obj) {
        // 按钮
        $('#prev').click(function () {
            prevPic();
        })
        $('#next').click(function () {
            nextPic();
        })
        //圆点
        $('.circular li').click(function () {
            let i = this;
            $('.circular li').each(function (index) {
                if (i === this) {
                    current = index + 1;
                    picChange(current);
                }
            })
        })
        //自动轮播
        var interval = setInterval(nextPic, obj.AutoTime);
        $('img').mouseover(function () {
            clearInterval(interval);
        })
        $('img').mouseout(function () {
            interval = setInterval(nextPic, obj.AutoTime);
        })
        // 手势
        if (obj.gesture) {
            var x;
            $('figure').on('mousedown', 'img', function (e) {
                e.preventDefault();
                x = e.offsetX;
            })
            $('figure').on('mouseup', 'img', function (e) {
                if (e.offsetX - x < 0) {
                    nextPic();
                }
                if (e.offsetX - x > 0) {
                    prevPic();
                }
            })
        }
    }
    function nextPic() {
        if ($('figure').css('transition') != 'all 0.3s') {
            $('figure').css({ transition: 'all 0.3s' })
        }
        current++;
        picChange(current);
        if (current > obj.src.length) {
            picChange(current);
            setTimeout(function () {
                current = 1;
                $('figure').css({
                    transition: 'all 0s'
                })
                picChange(current);
            }, 300)
        }
    }
    function prevPic() {
        if ($('figure').css('transition') != 'all 0.3s') {
            $('figure').css({ transition: 'all 0.3s' })
        }
        current--;
        picChange(current);
        if (current < 1) {
            picChange(current);
            setTimeout(function () {
                current = obj.src.length;
                $('figure').css({ transition: 'all 0s' })
                picChange(current);
            }, 300)
        }
    }
    function picChange(i) {
        $('figure').css({ left: i * (-obj.width) + 'px' })
        $('.circular li').removeClass('cirthis')
        $('.circular li').eq(current - 1).addClass('cirthis')
    }
    return {
        createCarousel: createCarousel,
        init: init,
        addEvent: event
    }
}
)()