 + телега синяя, почему бы нет. Документация по бэкенду для хакатона TulaHackDays 2024

Идеи:
- У каждой больницы свой отдельный бот, работаем в мультитопиках - не получилось, телеграм не умеет управлять областью видимости топиков.
- У каждой больницы свой отдельный бот, работаем в рамках одного чата в мультирежиме - ПРОБУЕМ ТАКОЙ ВАРИАНТ

Доработки:
- Единая система по управлению больницами (на подобии тех, что есть сейчас в больницах) - МОГУ БЫТЬ НЕ ПРАВ, НАДО ОБСУДИТЬ

## User (Abstract)

Первичная модель:
id - uuid, pk
tg_user_id - bigint (по сути, могли бы сделать pk, но mongo)
role - enum (doctor, patient)
firstname - string
lastname - string

### Patient extends User
_desc: Patient - дискриминатор для монги

### Doctor extends User
_desc: Doctor
specs: string[] - можем добить, смотри AI (["уролог", "андролог", "астролог", "лечит яйца (так сказал Саша)"]) - ключевые слова по которым ai сможет понять какого врача посоветовать пользователю

Первично работаем по расписанию с 8 до 14 по МСК - ограничение на хак ввиду нехватки времени.

Доработки:
1. Добавить сущность Schedule - расписание, у каждого врача своё расписание.

## Тут были Topics, но они не получились, поэтому планирование исходя из работы с одним ботом в нескольких режимах
Режимы для пациента:
- Main (выбор действий, главное меню)
- Appointment (запись к врачу. зачем? риск менеджмент. идейно, запись через аи ассистента, но может не выгореть, поэтому лучше иметь 2 способа записаться, чем 0 + госуслуги делают так же)
- AI Chat (далее...)
- Chat with doctors (меню выбора)

Режимы для врача:
- Main (главное меню)
- Import data (нужно каким-то образом импортировать данные для статистики. каким? пока непонятно, можем поддерживать какой-то формат аля id пользователя - характеристика - значение, где брать нормы? пока непонятнo, я бы на созвоне обсудил)
- Calendar (посмотреть записи к врачу)
- Chat with patients (меню выбора)
- Hospital management (добавить новых врачей условно говоря, не будем запиливать новую роль, врачи могут добавить друг друга)

Расположены в порядке приоритетности IMHO

Доработки и непонятки:
1. Import data - можно рисовать какие-нибудь графики на основании данных - Dashboard
2. В общем и целом неясно, нужна ли возможность как-то связаться с врачом. Мне кажется, на доработки оставить, для статистики и AI Chat'a хватит данных о пациенте в заявке на осмотр.

## Message - если решим делать чат, то можно на основании сообщений делать анализ для AI

Зачем:
1. Покрывает часть с чатом, доп функционал в Sign (Appointment)

Модель:
id - uuid, pk
user_id - uuid - кто написал
members: uuid[] - кому написал (возможно нескольким, в доработку)
timestamp: timestamp - когда написал
content: string (не поддерживаем пока картинки писек и жопы)

Доработки:
1. Можем написать врачу и/или его аспиранту, который, возможно, поможет (когда я лечил зубки, меня часто обслуживала помощница главного врача, по аналогии)
2. Поддержка разного вида контентов - картинки, модели, рентгены (как файлы), таблицы с данными (для статистики)

## Sign - запись к врачу ()

Зачем:
1. Покрывает Appointment пункт
2. Помогает для AI
3. Можно (УСЛОВНО) делать редирект на чат с врачом (как в такси, написать что-то, уточнить что-то, ДОРАБОТКА)

Модель:
id - uuid, pk
user_id - uuid - кто
doctor_id: uuid - к кому (или к кому может попасть, решает система в зависимости от нагрузки - на MVP не запариваемся)
content: string - на что жалоба (необязательно, но желательно)
status: ???

Доработки:
1. Делать редирект на чат с врачом (аля такси)

## AI

Что идейно хотелось бы иметь:
1. ОЧЕВИДНО, запись к врачу
2. БЫЛО бы круто по симптомам определять, к врачу какой специализации стоит пойти, или к какому конкретно врачу стоило бы пойти ("Братик, если отвалился пенис, надо к урологу") - будем определять по сущности Specs у врача
3. Могу ошибаться, но было бы прикольно выводить информацию о конкретной больнице (улица пушкина дом колотушкина - как будто просто и продаёт)
4. Вывод последних показателей пользователя.

## Stats

В ИДЕАЛЕ, МЫ РЕАЛЬНО АНАЛИЗИРУЕМ ПОТОК ДАННЫХ, СТРОИМ ПРОГНОЗЫ НА ОСНОВАНИИ КОРЕЛЛЯЦИОННО-РЕГРЕССИОНОГО (или любого другого) АНАЛИЗА (ЛУЧШЕ ПРОСТОЛ ЛЕЧИТЬ ЯЙЦА (ТАК СКАЗАЛ САША))

На деле, пока не очень понятно, как именно мы можем работать с данными - вопрос к Артёму, как он поresearch'ит, что найдёт. Будем отталкиваться от этого. Было бы круто интегрировать AI со статистикой. "Братик, проанализируй мой сахар (скажет, браааатик, плохо всё, то есть круто было бы давать какую-то оценку от 1 до 10, в общем и целом на мой взгляд такое можно сделать)"

UPD: На основании мат модели анализируем анализы пользователя (числовые), прогнозируем, как скоро заболеет и какой группой болезней. 
Первая итерация - хард бд
Вторая итерация - импорт данных через парс
Третья итерация - импорт данных через LLM

## Риски

1. Если АНдрюха обосрётся с телегой, обосрутся все. Задача первична и абсолютно незаменима, её нельзя закостылить. С топиками в супергруппе не получилось, будем пробовать работать в режиме одного чата - ОБ ЭТОМ ХОТЕЛОСЬ БЫ СОЗВОНИТЬСЯ, ВАЖНОЕ РЕШЕНИЕ
2. Саша - расписание, вероятно, чат и интеграции с AI и статистикой. Расписание первично и незаменимо, сомневаюсь, что получится закостылить, надо делать безоговорочно. Чат - тема спорная, не до конца понятно, нужно ли. Лично мне, пока я лечился, было приянтно иметь возможность написать врачу, сказатЬ, что у меня отвалился брекет. КОроче, обратная свзяь - круто, но это ИХМО, я бы обсудил. Интеграции, в общем и целом, дело не очень сложное, зависит от конечной реализации двух сервисов.A
3. Артуш - ai чат. На мой взгляд, имеем все возможности для реализации конрктеного функционала, ai_tools так могут, мне кажется, проблем не будет. Очень хорошо было бы реализовать такое, ибо киллер фича 
4. Артём - статистика. АЙЙ как непонятно, об этом созвониться 100% нужно, лучше сегодня. Сказать пользователю, что он умирает из-за превышения нормы витамина C в 100 раз - было бы весело.

# Преза

По презе: Гриша, подумай, посмотри, как в общем и целом выглядят такого рода системы (аля гос системы типо госуслуг или лк налог). Мы хотели бы видеть в презе мокапы с макетом вебки. Скажем, что реализован на все 100500% бэкенд и интеграция с телеграмм сервисом, можем приврать, что сделали вебку, но не задеплоили, можете потыкать тележку.
Цветовую палитру и стиль выбирай в соответствии с макетом (Саша говорит - голубые, синие тона - "больница ёпта") + телега синяя, почему бы нет.

