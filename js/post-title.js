(() => {

    const title = document.getElementById('code-more-post-title');
    const section = title.getAttribute('data-section');

    const options = {};

    switch (section) {
        case 'experimental':
            options.color = '#9b4697';
            break;
        case 'mathematiques':
        case 'mathematiques-tasks':
            options.color = '#d77636';
            break;
        case 'programming':
        case 'mc':
            options.color = '#6359c7';
            break;
        case 'pskov':
            options.color = '#007f7f';
            break;
    }

    const pattern = GeoPattern.generate(title.innerText, options);

    title.style.backgroundImage = pattern.toDataUrl();

})();
