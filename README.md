# Car Parking App (Frontend Client)

![](docs/cover.png)

<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="JavaScript" title="Javascript" width="40" height="40"/> <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="Vue" title="Vue" width="40" height="40"/> <img src="https://www.vectorlogo.zone/logos/docker/docker-tile.svg" alt="Docker" title="Docker" width="40" height="40"/> <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" title="Tailwind CSS" width="40" height="40"/>

Приложение для парковки транспортного средства в выбранной зоне парковки (Frontend Client).

Используется вместе с [API](https://github.com/poymanov/laravel-daily-car-parking-app-api).

[![CI](https://github.com/poymanov/laravel-daily-car-parking-app-frontend-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/poymanov/laravel-daily-car-parking-app-frontend-vue/actions/workflows/ci.yml)

### Функционал

- Пользователи могут регистрироваться и аутентифицироваться;
- Добавление транспортных средств в учетную запись;
- Добавление парковочных зон для расчета стоимости парковки;
- Запуск сеанса парковки;
- Остановка сеанса парковки;
- Получение активных сеансов парковки аутентифицированного пользователя;
- Получение завершенных сеансов парковки аутентифицированного пользователя.

Подробности в [документации](docs/README.md).

### Предварительные требования

Для запуска приложения требуется **Docker** и **Docker Compose**.

### Основные команды

| Команда                | Описание                        |
|:-----------------------|:--------------------------------|
| `make init`            | Инициализация приложения        |
| `make up`              | Запуск приложения               |
| `make down`            | Остановка приложения            |
| `make frontend-format` | Форматирование кода             |
| `make frontend-lint`   | Проверка качества кода (ESLint) |

### Интерфейсы

Приложение - http://localhost:8082

---

Код написан в образовательных целях в рамках курса [Vue.js 3 Client Parking App: Step-by-Step](https://laraveldaily.com/course/vue-client-parking-app-laravel-api).
