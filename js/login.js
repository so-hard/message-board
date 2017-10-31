var registeredName = $('.registeredName'); //获取注册用户名
var registeredPaswrod = $('.registeredPassword'); //获取注册密码框
var registeredBut = $('.registeredBtn')[0]; //获取注册按钮
var loginName = $('.login .loginName')[0];//登陆用户名
var loginPassword = $('.login .loginPassword')[0]; // 登陆密码框
var loginBtn = $('.login .loginBtn')[0];//登陆按钮

function getCookie(key) {
	var arr1 = document.cookie.split('; ');
	for (var i=0; i<arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if (arr2[0]==key) {
			return arr2[1];
		}
	}
} ;

function checkCookie ( ) {
    var uid = getCookie('uid');
    if (uid) {
        window.location.href = "index.html";
    }
}


$(document).ready(checkCookie());

// 检测用户名
registeredName.focusout(
    function () {
        $.ajax({
            type: "GET",
            url: "guestbook/index.php",
            data: 'm=index&a=verifyUserName&username=' + this.value,
            dataType: 'json',
            success: function (date) {
                if (date.code) {
                    Materialize.toast(date.message, 3000);
                } else {
                    Materialize.toast(date.message, 3000);
                }
            }
        });
    }

);

//用户注册 
registeredBut.onclick = function () {
    $.ajax({
        type: "Post",
        url: "guestbook/index.php",
        data: 'm=index&a=reg&username=' + registeredName[0].value + '&password=' + registeredPaswrod[0].value,
        dataType: 'json',
        success: function (date) {
            Materialize.toast(date.message, 3000);
        }
    });
};

loginBtn.onclick = function () {
    $.ajax({
        type: 'Post',
        url: "guestbook/index.php",
        data: 'm=index&a=login&username=' + loginName.value + '&password=' + loginPassword.value,
        dataType: 'json',
        success: function (date) {
            console.log(date);
            Materialize.toast(date.message, 3000);
            setTimeout("checkCookie()" ,"1000");
        }
    })
}