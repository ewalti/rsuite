'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _kk = _interopRequireDefault(require("date-fns/locale/kk"));
var Calendar = {
  sunday: 'Жк',
  monday: 'Дс',
  tuesday: 'Сс',
  wednesday: 'Ср',
  thursday: 'Бс',
  friday: 'Жм',
  saturday: 'Сн',
  ok: 'ОК',
  today: 'Бүгін',
  yesterday: 'Кеше',
  hours: 'Сағат',
  minutes: 'Минут',
  seconds: 'Секунд',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'MMM dd, yyyy',
  dateLocale: _kk.default
};
var _default = {
  common: {
    loading: 'Жүктелуде...',
    emptyMessage: 'Мәліметтер жоқ',
    remove: 'Жою',
    clear: 'Таза'
  },
  Plaintext: {
    unfilled: 'Мәліметтер жоқ',
    notSelected: 'Таңдалмаған',
    notUploaded: 'Жүктелмеген'
  },
  Pagination: {
    more: 'Көбірек',
    prev: 'Алдыңғы',
    next: 'Келесі',
    first: 'Бірінші',
    last: 'Соңғы',
    limit: '{0} / бет',
    total: 'Барлығы: {0}',
    skip: '{0}-бетке өтіңіз'
  },
  Calendar: Calendar,
  DatePicker: (0, _extends2.default)({}, Calendar),
  DateRangePicker: (0, _extends2.default)({}, Calendar, {
    last7Days: 'Соңғы 7 күн'
  }),
  Picker: {
    noResultsText: 'Нәтижелер жоқ',
    placeholder: 'Таңдаңыз',
    searchPlaceholder: 'Іздеу',
    checkAll: 'Барлығын таңдау'
  },
  InputPicker: {
    newItem: 'Жаңа элемент',
    createOption: 'Жаңа элемент "{0}" құру'
  },
  Uploader: {
    inited: 'Бастау',
    progress: 'Жүктеу',
    error: 'Қате',
    complete: 'Жүктелді',
    emptyFile: 'Бос',
    upload: 'Жүктеу',
    removeFile: 'Файлды жою'
  },
  CloseButton: {
    closeLabel: 'Жабу'
  },
  Breadcrumb: {
    expandText: 'Көрсету'
  },
  Toggle: {
    on: 'Қосу',
    off: 'Өшіру'
  }
};
exports.default = _default;