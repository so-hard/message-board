var cookieArr = decodeURI(document.cookie); //cookie 转码
// var carContainer = $("main .container");
var textbordBtn = $(".text-bord .bord-buton .btn");
var textcarContainer = $(".text-bord .container");
var textInput = $(".text-bord textarea");
var signOut = $(".side-nav .sign-out");
var navName = $(".side-nav .user-view .name ");
var publicBorad = $('main .public-board-con');
var privateBorad = $('main .your-board-con');
var tabPub = $('header ul .tab .public-board');
var tabPri = $('header ul .tab .private-borad');
var main = $('main');
var iPage = 1;

function scrollLoading() {
    main.scroll(
        console.log(1),
        function () {
            if (main.height() + main.scrollTop() + 200 >= publicBorad.height()) {
                iPage++;                                
                showList();
            }
        }
    )
}




function showList() {
    $.ajax({
        type: "get",
        url: "guestbook/index.php",
        data: "m=index&a=getList&n=6&page=" + iPage,
        dataType: "json",
        success: function (data) {
            var data = data.data;
            if (data) {
                console.log(data);                
                for (var i = 0; i < data.list.length; i++) {
                    creactNode(data.list[i]);
                }
            }
        }
    })
}

function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (let i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0] == key) {
            return arr2[1];
        }
    }
};

function checkCookie() {
    var uid = getCookie('uid');
    var username = getCookie('username');
    if (!uid) {
        window.location.href = "login.html"
    }
    navName.html(username);
}

// 创造节点.. 
function creactNode(data) {
    var time = new Date(data.dateline * 1000);
    var timeYear = time.toLocaleDateString();
    var timeHours = time.getHours();
    var timeMiu = time.getMinutes();
    var carTime = $("<span>", {
        class: "right",
        html: timeYear + "－" + timeHours + ":" + timeMiu
    })
    //以上 time
    var carBox = $("<div class = 'card horizontal changgeC'></div>");
    var varImgA = $("<a>", {
        href: "#"
    }).append($("<img>", {
        src: "img/one.jpeg",
        class: "circle"
    }));
    var carImg = $("<div class='card-image'></div>").append(varImgA);
    var carStacked = $("<div class = 'card-stacked'></div>");
    var carContent = $("<div class = 'card-content'></div>").append($("<p>", {
        html: data.content
    }));
    var carAction = $("<div class='card-action'></div>");
    var supportA = $("<a>", {
        href: "#",
        html: data.support
    });
    var opposeA = $("<a>", {
        href: "#",
        html: data.support
    });
    supportA.append($("<i class='material-icons'>thumb_up</i>"));
    opposeA.append($("<i class='material-icons'>thumb_down</i>"));
    carStacked.append($("<p>", {
        class: "card-name",
        html: data.username
    }))
    carAction.append(supportA);
    carAction.append(opposeA);
    carAction.append(carTime);
    carStacked.append(carContent);
    carStacked.append(carAction);
    carBox.append(carImg);
    carBox.append(carStacked);
    publicBorad.append(carBox);
}

$(document).ready(checkCookie());
$(".button-collapse").sideNav();
showList();
scrollLoading();

tabPub.click(
    function () {
        var pubDis = publicBorad.css("display");
        var priDis = privateBorad.css("display");
        tabPri.removeClass('shadow');
        $(this).addClass('shadow');
        if (priDis == 'block' && pubDis == 'none') {
            privateBorad.hide('fast');
            publicBorad.show(500);
            Materialize.toast('Public Borad', 3000, 'cyan accent-2 black-text');
        }
    })

tabPri.click(
    function () {
        var pubDis = publicBorad.css("display");
        var priDis = privateBorad.css("display");
        tabPub.removeClass('shadow');
        $(this).addClass('shadow');
        if (priDis == 'none' && pubDis == 'block') {
            publicBorad.hide('fast');
            privateBorad.show(500);
            Materialize.toast('Your Borad', 3000, 'cyan accent-2 black-text');

        }
    }
)

//  发表留言
textbordBtn.click(function () {
    $.ajax({
        type: "Post",
        url: "guestbook/index.php",
        data: 'm=index&a=send&content=' + encodeURI(textInput.val()),
        dataType: 'json',
        success: function (data) {
            Materialize.toast(data.message, 3000, 'green accent-2 black-text');
            textInput.val("");
            if (!data.code) {
                creactNode(data.data);
                console.log(data)
            }
        }

    })
});



// 退出按钮
signOut.click(function () {
    $.ajax({
        type: "get",
        url: "guestbook/index.php",
        data: "m=index&a=logout",
        dataType: "json",
        success: function (data) {
            console.log(data);
            Materialize.toast(data.message, 3000, 'yellow black-text');
            setTimeout("checkCookie()", "1000");
        }
    })
})

