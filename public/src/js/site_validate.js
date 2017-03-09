$(function() {
  $('#username').verify({
    rule: /^[\u4e00-\u9fa5a-zA-Z]{2,8}$/,
    default_msg: '用户名不能为空',
    error_msg: '用户名长度在2到8位字符之间，仅支持中英文'
  });
  $('#email').verify({
    rule: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    default_msg: '邮箱地址不能为空',
    error_msg: '请输入有效的电子邮件地址'
  });
  $('#password').verify({
    rule: /^[A-Za-z0-9]{6,12}$/,
    default_msg: '密码不能为空',
    error_msg: '密码长度在6到12位字符之间， 仅支持数字，英文大小写'
  });

  $('#repassword').blur(function() {
    var password = $('#password').val();
    var repassword = $(this).val();
    if (password !== repassword) {
      $(this).addClass('error-input');
      $(this).siblings('.error-msg').text('两次输入的密码不一致').show();
    }
  }).focus(function() {
    $(this).removeClass('error-input');
    $(this).siblings('.error-msg').text('密码不能为空').hide();
  });

  $('#signup').click(function() {
    var err = $('.error-input');
    var $username = $('#username'),
        $email = $('#email'),
        $password = $('#password'),
        $repassword = $('#repassword');
    if ($username.val().trim() === '') {
      $username.addClass('error-input');
      $username.siblings('.error-msg').show();
      return false;
    } else {

    }
    if ($email.val().trim() === '') {
      $email.addClass('error-input');
      $email.siblings('.error-msg').show();
      return false;
    }
    if ($password.val().trim() === '') {
      $password.addClass('error-input');
      $password.siblings('.error-msg').show();
      return false;
    }
    if ($repassword.val().trim() === '') {
      $repassword.addClass('error-input');
      $repassword.siblings('.error-msg').show();
      return false;
    }
    if (err.length > 0) {
      // alert(err.length);
      return false;
    }
  });

  // 修改密码
  var $curPwd = $('#currentPassword'),
      $newPwd = $('#newPassword'),
      $reNewPwd = $('#reNewPassword'),
      $parent = $('#changePassword').parent();
  $('#changePassword').click(function() {
    if ($curPwd.val().trim() === '') {
      $parent.append('<p class="changeP-error">当前密码不能为空</p>');
      setTimeout(function() {
        $parent.find('p').fadeOut('slow', function() {
          $(this).remove();
        });
      }, 1500);
      return false;
    } else if($newPwd.val().trim().length < 6) {
      $parent.append('<p class="changeP-error">请设置6位及6位数以上的密码</p>');
      setTimeout(function() {
        $parent.find('p').fadeOut('slow', function() {
          $(this).remove();
        });
      }, 1500);
      return false;
    } else if ($newPwd.val().trim() !== $reNewPwd.val().trim()) {
      $parent.append('<p class="changeP-error">两次输入的密码不一致</p>');
      setTimeout(function() {
        $parent.find('p').fadeOut('slow', function() {
          $(this).remove();
        });
      }, 1500);
      return false;
    }
  });
});


(function($) {
  $.fn.verify = function(options) {
    var settings = $.extend({
      rule: /(^\s*)|(\s*$)/g,
      default_msg: '不能为空',
      error_msg: '不能为空'
    }, options);

    this.on('blur', function() {
      var txt = $(this).val().replace(/\s+/g, '');
      if (txt === '') {
        $(this).addClass('error-input');
        $(this).siblings('.error-msg').text(settings.default_msg).show();
      } else if (txt !== '' && ! settings.rule.test(txt)) {
        $(this).addClass('error-input');
        $(this).siblings('.error-msg').text(settings.error_msg).show();
      }
    }).on('focus', function() {
      $(this).removeClass('error-input');
      $(this).siblings('.error-msg').text(settings.default_msg).hide();
    });
  };
})(jQuery);
