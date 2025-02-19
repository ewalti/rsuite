'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _tr = _interopRequireDefault(require("date-fns/locale/tr"));
var Calendar = {
  sunday: 'Pz',
  monday: 'Pt',
  tuesday: 'Sa',
  wednesday: 'Ça',
  thursday: 'Pe',
  friday: 'Cu',
  saturday: 'Ct',
  ok: 'Tamam',
  today: 'Bugün',
  yesterday: 'Dün',
  hours: 'Saat',
  minutes: 'Dakika',
  seconds: 'Saniye',
  formattedMonthPattern: 'MMM yyyy',
  formattedDayPattern: 'dd MMM yyyy',
  dateLocale: _tr.default
};
var _default = {
  common: {
    loading: 'Yükleniyor...',
    emptyMessage: 'Veri bulunamadı',
    remove: 'Kaldır',
    clear: 'Temizlemek'
  },
  Plaintext: {
    unfilled: 'Doldurulmadı',
    notSelected: 'Seçilmedi',
    notUploaded: 'Yüklenmedi'
  },
  Pagination: {
    more: 'Daha',
    prev: 'Önceki',
    next: 'Sonraki',
    first: 'İlk',
    last: 'Son',
    limit: '{0} / sayfa',
    total: 'Toplam Satır: {0}',
    skip: 'Git{0}'
  },
  Calendar: Calendar,
  DatePicker: (0, _extends2.default)({}, Calendar),
  DateRangePicker: (0, _extends2.default)({}, Calendar, {
    last7Days: 'Son 7 Gün'
  }),
  Picker: {
    noResultsText: 'Sonuç bulunamadı',
    placeholder: 'Seç',
    searchPlaceholder: 'Ara',
    checkAll: 'Tümü'
  },
  InputPicker: {
    newItem: 'Yeni öğe',
    createOption: 'Seçenek ekle "{0}"'
  },
  Uploader: {
    inited: 'Başlangıç',
    progress: 'Yükleniyor',
    error: 'Hata',
    complete: 'Tamamlandı',
    emptyFile: 'Boş',
    upload: 'Yükle',
    removeFile: 'Dosyayı kaldır'
  },
  CloseButton: {
    closeLabel: 'Kapat'
  },
  Breadcrumb: {
    expandText: 'Yolu göster'
  },
  Toggle: {
    on: 'Açık',
    off: 'Kapalı'
  }
};
exports.default = _default;