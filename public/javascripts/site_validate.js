$(function(){$("#username").verify({rule:/^[\u4e00-\u9fa5a-zA-Z]{2,8}$/,default_msg:"用户名不能为空",error_msg:"用户名长度在2到8位字符之间，仅支持中英文"}),$("#email").verify({rule:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,default_msg:"邮箱地址不能为空",error_msg:"请输入有效的电子邮件地址"}),$("#password").verify({rule:/^[A-Za-z0-9]{6,12}$/,default_msg:"密码不能为空",error_msg:"密码长度在6到12位字符之间， 仅支持数字，英文大小写"}),$("#repassword").blur(function(){var r=$("#password").val(),s=$(this).val();r!==s&&($(this).addClass("error-input"),$(this).siblings(".error-msg").text("两次输入的密码不一致").show())}).focus(function(){$(this).removeClass("error-input"),$(this).siblings(".error-msg").text("密码不能为空").hide()}),$("#signup").click(function(){var r=$(".error-input"),s=$("#username"),e=$("#email"),i=$("#password"),t=$("#repassword");return""===s.val().trim()?(s.addClass("error-input"),s.siblings(".error-msg").show(),!1):""===e.val().trim()?(e.addClass("error-input"),e.siblings(".error-msg").show(),!1):""===i.val().trim()?(i.addClass("error-input"),i.siblings(".error-msg").show(),!1):""===t.val().trim()?(t.addClass("error-input"),t.siblings(".error-msg").show(),!1):!(r.length>0)&&void 0});var r=$("#currentPassword"),s=$("#newPassword"),e=$("#reNewPassword"),i=$("#changePassword").parent();$("#changePassword").click(function(){return""===r.val().trim()?(i.append('<p class="changeP-error">当前密码不能为空</p>'),setTimeout(function(){i.find("p").fadeOut("slow",function(){$(this).remove()})},1500),!1):s.val().trim().length<6?(i.append('<p class="changeP-error">请设置6位及6位数以上的密码</p>'),setTimeout(function(){i.find("p").fadeOut("slow",function(){$(this).remove()})},1500),!1):s.val().trim()!==e.val().trim()?(i.append('<p class="changeP-error">两次输入的密码不一致</p>'),setTimeout(function(){i.find("p").fadeOut("slow",function(){$(this).remove()})},1500),!1):void 0})}),function(r){r.fn.verify=function(s){var e=r.extend({rule:/(^\s*)|(\s*$)/g,default_msg:"不能为空",error_msg:"不能为空"},s);this.on("blur",function(){var s=r(this).val().replace(/\s+/g,"");""===s?(r(this).addClass("error-input"),r(this).siblings(".error-msg").text(e.default_msg).show()):""===s||e.rule.test(s)||(r(this).addClass("error-input"),r(this).siblings(".error-msg").text(e.error_msg).show())}).on("focus",function(){r(this).removeClass("error-input"),r(this).siblings(".error-msg").text(e.default_msg).hide()})}}(jQuery);