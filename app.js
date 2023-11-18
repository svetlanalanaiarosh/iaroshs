(function () {
    let deferredPrompt = null;
    const emojisContainer = document.getElementById('emojis-container');
    const showEmojisBtn = document.querySelector('.show-emojis-btn');
    const backButton = document.getElementById('back-button');
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    const contactBtn = document.getElementById('contacts-btn');
    const viewEmojisBtn = document.getElementById('view-emojis-btn');
    const logBtn = document.getElementById('log-btn');
    const homeBtn = document.getElementById('home-btn');

    function installApp() {
        deferredPrompt.prompt();
        document.querySelector("#install-btn").disabled = true;

        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA setup accepted');
                document.querySelector("#install-btn").style.display = 'none';
            } else {
                console.log('PWA setup rejected');
            }

            document.querySelector("#install-btn").disabled = false;
            deferredPrompt = null;
        });
    }

    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        deferredPrompt = event;
        document.querySelector("#install-btn").classList.add('active');

        document.querySelector("#install-btn").addEventListener('click', function () {
            installApp();
        });
    });

    menuBtn.addEventListener('click', function () {
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    });

    contactBtn.addEventListener('click', function () {
        emojisContainer.innerHTML = "Студентка зЛПБ ИСиТ Ярош С.И. +7 904 335 68 58";
        backButton.style.display = 'block';
        showEmojisBtn.style.display = 'none';
    });

    viewEmojisBtn.addEventListener('click', function () {
        fetch('https://api.github.com/emojis')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }
                return response.json();
            })
            .then(emojis => {
                emojisContainer.innerHTML = "";
                for (const emoji in emojis) {
                    const emojiItem = document.createElement('div');
                    emojiItem.className = 'emoji-item';
                    emojiItem.innerHTML = `<img src="${emojis[emoji]}" alt="${emoji}" title="${emoji}">`;
                    emojisContainer.appendChild(emojiItem);
                }

                showEmojisBtn.style.display = 'none';
                backButton.style.display = 'block';
            })
            .catch(error => {
                console.error(`Error fetching GitHub emojis: ${error.message}`);
            });
    });

    logBtn.addEventListener('click', function () {
        emojisContainer.innerHTML = "Журнал кэша: " + JSON.stringify(localStorage);
        backButton.style.display = 'block';
        showEmojisBtn.style.display = 'none';
    });

    homeBtn.addEventListener('click', function () {
        emojisContainer.innerHTML = ""; // Очищаем контейнер с эмодзи
        backButton.style.display = 'none'; // Скрываем кнопку "Назад"
        showEmojisBtn.style.display = 'block'; // Показываем кнопку "Просмотр"
    });

    // Добавлено: Обработчик для кнопки "Назад" на странице с эмодзи
    backButton.addEventListener('click', function () {
        emojisContainer.innerHTML = ""; // Очищаем контейнер с эмодзи
        backButton.style.display = 'none'; // Скрываем кнопку "Назад"
        showEmojisBtn.style.display = 'block'; // Показываем кнопку "Просмотр"
        window.location.href = "index.html"; // Перенаправляем пользователя на главную страницу
    });
})();