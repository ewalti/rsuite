'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _nl = _interopRequireDefault(require("date-fns/locale/nl"));
var Calendar = {
  sunday: 'Zo',
  monday: 'Ma',
  tuesday: 'Di',
  wednesday: 'Wo',
  thursday: 'Do',
  friday: 'Vr',
  saturday: 'Za',
  ok: 'Oke',
  today: 'Vandaag',
  yesterday: 'Gisteren',
  hours: 'Uren',
  minutes: 'Mimnuten',
  seconds: 'Seconden',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'dd MMM, yyyy',
  dateLocale: _nl.default
};
var _default = {
  common: {
    loading: 'Laden...',
    emptyMessage: 'Geen data gevonden',
    remove: 'Verwijderen',
    clear: 'Duidelijk'
  },
  Plaintext: {
    unfilled: 'Ongevuld',
    notSelected: 'Niet geselecteerd',
    notUploaded: 'Niet geupload'
  },
  Pagination: {
    more: 'Meer',
    prev: 'Vorige',
    next: 'Volgende',
    first: 'Eerste',
    last: 'Laatste',
    limit: '{0} / pagina',
    total: 'Totaal Rijen: {0}',
    skip: 'Ga naar{0}'
  },
  Calendar: Calendar,
  DatePicker: (0, _extends2.default)({}, Calendar),
  DateRangePicker: (0, _extends2.default)({}, Calendar, {
    last7Days: 'Laatste 7 Dagen'
  }),
  Picker: {
    noResultsText: 'Geen resultaten gevonden',
    placeholder: 'Selecteren',
    searchPlaceholder: 'Zoeken',
    checkAll: 'Alles'
  },
  InputPicker: {
    newItem: 'Nieuw item',
    createOption: 'Creëer optie "{0}"'
  },
  Uploader: {
    inited: 'Gestart',
    progress: 'Uploaden',
    error: 'Error',
    complete: 'Voltooid',
    emptyFile: 'Leeg',
    upload: 'Upload',
    removeFile: 'Verwijder bestand'
  },
  CloseButton: {
    closeLabel: 'Sluiten'
  },
  Breadcrumb: {
    expandText: 'Toon pad'
  },
  Toggle: {
    on: 'Open',
    off: 'Sluit'
  }
};
exports.default = _default;