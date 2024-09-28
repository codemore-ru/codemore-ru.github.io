$(function() {
    $('.solution').each(function(){
        var cur = $(this);
        var text = cur.html();
        cur.text(' ').addClass('card card-default');
        $('<div class="card-header"></div>').text('Решение').click(BlockClick).appendTo(cur);
        var blockBody = $('<div class="card-body"></div>').html(coolFormat(text)).appendTo(cur);
        blockBody.hide();
    });
});

function coolFormat(text) {
    var txt = text.split('\n\n');
    var out = '';
    for(var i = 0; i < txt.length; i++) {
        out += '<p>' + txt[i] + '</p>';
    }
    return out;
}

function BlockClick() {
    $(this).next('.card-body').slideToggle();
}