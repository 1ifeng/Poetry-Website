$(function() {
  $('.avatar').click(function() {
    $(this).toggleClass('dropdown');
  });

  $('.stat-appreciations').on('click', function() {
    var poetryId = $(this).parents('.poetry-item').attr('data-poetryid');
    var likesNum = Number($(this).text());
    var inc;
    if ($(this).hasClass('likes')) {
      $(this).removeClass('likes');
      inc = -1;
      likesNum -= 1;
      $(this).text(likesNum);
    } else {
      $(this).addClass('likes');
      inc = 1;
      likesNum += 1;
      $(this).text(likesNum);
    }
    var info = {
      poetryId: poetryId,
      incNum: inc
    };
    sendLikes(info);
  });

  function sendLikes(data) {
    $.ajax({
      url: '/poetry/likes',
      type: 'POST',
      data: data
    });
  }
});

