'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import faIR from 'date-fns/locale/fa-IR';
var Calendar = {
  sunday: 'ی',
  monday: 'د',
  tuesday: 'س',
  wednesday: 'چ',
  thursday: 'پ',
  friday: 'ج',
  saturday: 'ش',
  ok: 'تایید',
  today: 'امروز',
  yesterday: 'دیروز',
  hours: 'ساعت',
  minutes: 'دقیقه',
  seconds: 'ثانیه',
  formattedMonthPattern: 'MMM, yyyy',
  formattedDayPattern: 'MMM dd, yyyy',
  dateLocale: faIR
};
export default {
  common: {
    loading: 'در حال بارگذاری...',
    emptyMessage: 'داده ایی پیدا نشد',
    remove: 'برداشتن',
    clear: 'پاک کردن'
  },
  Plaintext: {
    unfilled: 'خالی',
    notSelected: 'انتخاب نشده',
    notUploaded: 'اپلود نشده'
  },
  Pagination: {
    more: 'بیشتر',
    prev: 'قبلی',
    next: 'بعدی',
    first: 'اول',
    last: 'اخر',
    limit: '{0} / صفحه',
    total: 'مجموع ردیف ها: {0}',
    skip: 'برو به{0}'
  },
  Calendar: Calendar,
  DatePicker: _extends({}, Calendar),
  DateRangePicker: _extends({}, Calendar, {
    last7Days: '7 روز اخر'
  }),
  Picker: {
    noResultsText: 'نتیجه ایی یافت نشد',
    placeholder: 'انتخاب',
    searchPlaceholder: 'جستجو',
    checkAll: 'همه'
  },
  InputPicker: {
    newItem: 'گزینه جدید',
    createOption: 'ساخت گزینه "{0}"'
  },
  Uploader: {
    inited: 'اولیه',
    progress: 'در حال اپلود',
    error: 'مشکل',
    complete: 'تمام شد',
    emptyFile: 'خالی',
    upload: 'اپلود',
    removeFile: 'حذف فایل'
  },
  CloseButton: {
    closeLabel: 'بستن'
  },
  Breadcrumb: {
    expandText: 'نمایش مسیر'
  },
  Toggle: {
    on: 'باز کردن',
    off: 'بستن'
  }
};