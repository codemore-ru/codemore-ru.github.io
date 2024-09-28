(() => {

    const ThemeSystemDefault = 'system';
    const ThemeLight = 'light';
    const ThemeDark = 'dark';

    let switcher = null;
    let currentTheme = ThemeSystemDefault;

    function applyTheme(theme) {
        const html = document.getElementsByTagName('html')[0];
        html.setAttribute('data-bs-theme', theme);
    }

    function setCurrentTheme(theme) {
        currentTheme = theme;
        window.localStorage.__theme = theme;
        if (theme === ThemeSystemDefault) {
            applyTheme(isSystemDarkMode() ? ThemeDark : ThemeLight);
        } else {
            applyTheme(theme);
        }
        updateSwitcherTitle();
    }

    function updateSwitcherTitle() {
        let title = '';
        switch (getCurrentTheme()) {
            case ThemeLight:
                title = 'Тема: светлая';
                break;
            case ThemeDark:
                title = 'Тема: темная';
                break;
            case ThemeSystemDefault:
                title = 'Тема: системная';
                break;
        }
        if (switcher !== null) {
            switcher.innerText = title;
        }
    }

    function getCurrentTheme() {
        const theme = window.localStorage.__theme;
        return theme ? theme : ThemeSystemDefault;
    }

    function isSystemDarkMode() {
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newTheme = event.matches ? ThemeDark : ThemeLight;
        if (currentTheme === ThemeSystemDefault) {
            applyTheme(newTheme);
        }
    });

    window.addEventListener('load', () => {
        switcher = document.getElementById('theme-switch');
        switcher.addEventListener('click', () => {
            const currentTheme = getCurrentTheme();
            switch (currentTheme) {
                case ThemeLight:
                    if (isSystemDarkMode()) {
                        setCurrentTheme(ThemeSystemDefault);
                    } else {
                        setCurrentTheme(ThemeDark);
                    }
                    break;
                case ThemeDark:
                    if (isSystemDarkMode()) {
                        setCurrentTheme(ThemeLight);
                    } else {
                        setCurrentTheme(ThemeSystemDefault);
                    }
                    break;
                case ThemeSystemDefault:
                    if (isSystemDarkMode()) {
                        setCurrentTheme(ThemeDark);
                    } else {
                        setCurrentTheme(ThemeLight);
                    }
                    break;
            }
        });
        updateSwitcherTitle();
    });

    setCurrentTheme(getCurrentTheme());
})();
