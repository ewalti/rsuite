'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _ru = _interopRequireDefault(require("date-fns/locale/ru"));
var Calendar = {
  sunday: 'Вс',
  monday: 'Пн',
  tuesday: 'Вт',
  wednesday: 'Ср',
  thursday: 'Чт',
  friday: 'Пт',
  saturday: 'Сб',
  ok: 'ОК',
  today: 'Сегодня',
  yesterday: 'Вчера',
  hours: 'Часов',
  minutes: 'Минут',
  seconds: 'Секунд',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: _ru.default
};
var _default = {
  common: {
    loading: 'Загрузка...',
    emptyMessage: 'Данные не найдены',
    remove: 'Удалять',
    clear: 'Прозрачный'
  },
  Plaintext: {
    unfilled: 'незаполненной',
    notSelected: 'Не выбрано',
    notUploaded: 'Не загружено'
  },
  Pagination: {
    more: 'Больше',
    prev: 'Предыдущая',
    next: 'Следующая',
    first: 'Первая',
    last: 'Последняя',
    limit: '{0} / страниц',
    total: 'всего: {0}',
    skip: 'Перейти к {0}'
  },
  Calendar: Calendar,
  DatePicker: (0, _extends2.default)({}, Calendar),
  DateRangePicker: (0, _extends2.default)({}, Calendar, {
    last7Days: 'Последние 7 дней'
  }),
  Picker: {
    noResultsText: 'Результаты не найдены',
    placeholder: 'Выбрать',
    searchPlaceholder: 'Поиск',
    checkAll: 'Все'
  },
  InputPicker: {
    newItem: 'Новый',
    createOption: 'Создать опцию "{0}"'
  },
  Uploader: {
    inited: 'Начало',
    progress: 'Загрузка',
    error: 'Ошибка',
    complete: 'Завершено',
    emptyFile: 'Пусто',
    upload: 'Загрузить',
    removeFile: 'Удалить файл'
  },
  CloseButton: {
    closeLabel: 'Закрыть'
  },
  Breadcrumb: {
    expandText: 'Показать путь'
  },
  Toggle: {
    on: 'Вкл',
    off: 'Выкл'
  }
};
exports.default = _default;