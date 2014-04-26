function addImages(container, images) {
    for(var i = 0; i < images.length; i++) {
        var item = images[i];
        var pic = $('<a href="/img/pskov/'+item.file+'" data-lightbox="'+container+'" data-title="'+item.title+'">');
        $('<img class="gallery" src="/img/pskov/preview/' + item.file + '" alt="'+item.title+'">').appendTo(pic);
        pic.appendTo('#' + container);
    }
}