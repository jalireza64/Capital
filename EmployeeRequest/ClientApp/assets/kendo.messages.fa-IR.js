module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1412);
	module.exports = __webpack_require__(1412);


/***/ }),

/***/ 1412:
/***/ (function(module, exports) {

	(function ($, undefined) {
	//    /* FlatColorPicker messages */

	//    if (kendo.ui.FlatColorPicker) {
	//        kendo.ui.FlatColorPicker.prototype.options.messages =
	//        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
	//            "apply": "تایید",
	//            "cancel": "انصراف"
	//        });
	//    }

	//    /* ColorPicker messages */

	//    if (kendo.ui.ColorPicker) {
	//        kendo.ui.ColorPicker.prototype.options.messages =
	//        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
	//            "apply": "تایید",
	//            "cancel": "انصراف"
	//        });
	//    }

	//    /* ColumnMenu messages */

	//    if (kendo.ui.ColumnMenu) {
	//        kendo.ui.ColumnMenu.prototype.options.messages =
	//        $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
	//            "sortAscending": "مرتب سازی صعودی",
	//            "sortDescending": "مرتب سازی نزولی",
	//            "filter": "فیلتر",
	//            "columns": "ستون ها",
	//            "done": "تمام",
	//            "settings": "تنظیمات ستون ها",
	//            "lock": "بستن",
	//            "unlock": "باز کردن"
	//        });
	//    }

	//    /* Editor messages */

	//    if (kendo.ui.Editor) {
	//        kendo.ui.Editor.prototype.options.messages =
	//        $.extend(true, kendo.ui.Editor.prototype.options.messages, {
	//            "bold": "Bold",
	//            "italic": "Italic",
	//            "underline": "Underline",
	//            "strikethrough": "Strikethrough",
	//            "superscript": "Superscript",
	//            "subscript": "Subscript",
	//            "justifyCenter": "Center text",
	//            "justifyLeft": "Align text left",
	//            "justifyRight": "Align text right",
	//            "justifyFull": "Justify",
	//            "insertUnorderedList": "Insert unordered list",
	//            "insertOrderedList": "Insert ordered list",
	//            "indent": "Indent",
	//            "outdent": "Outdent",
	//            "createLink": "Insert hyperlink",
	//            "unlink": "Remove hyperlink",
	//            "insertImage": "Insert image",
	//            "insertFile": "Insert file",
	//            "insertHtml": "درج متن آماده",
	//            "viewHtml": "View HTML",
	//            "fontName": "Select font family",
	//            "fontNameInherit": "(inherited font)",
	//            "fontSize": "Select font size",
	//            "fontSizeInherit": "(inherited size)",
	//            "formatBlock": "Format",
	//            "formatting": "Format",
	//            "foreColor": "Color",
	//            "backColor": "Background color",
	//            "style": "Styles",
	//            "emptyFolder": "Empty Folder",
	//            "uploadFile": "Upload",
	//            "orderBy": "Arrange by:",
	//            "orderBySize": "Size",
	//            "orderByName": "Name",
	//            "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
	//            "deleteFile": 'Are you sure you want to delete "{0}"?',
	//            "overwriteFile": 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',
	//            "directoryNotFound": "A directory with this name was not found.",
	//            "imageWebAddress": "Web address",
	//            "imageAltText": "Alternate text",
	//            "imageWidth": "Width (px)",
	//            "imageHeight": "Height (px)",
	//            "fileWebAddress": "Web address",
	//            "fileTitle": "Title",
	//            "linkWebAddress": "Web address",
	//            "linkText": "Text",
	//            "linkToolTip": "ToolTip",
	//            "linkOpenInNewWindow": "Open link in new window",
	//            "dialogUpdate": "Update",
	//            "dialogInsert": "Insert",
	//            "dialogButtonSeparator": "or",
	//            "dialogCancel": "Cancel",
	//            "createTable": "Create table",
	//            "addColumnLeft": "Add column on the left",
	//            "addColumnRight": "Add column on the right",
	//            "addRowAbove": "Add row above",
	//            "addRowBelow": "Add row below",
	//            "deleteRow": "Delete row",
	//            "deleteColumn": "Delete column"
	//        });
	//    }

	//    /* FileBrowser messages */

	//    if (kendo.ui.FileBrowser) {
	//        kendo.ui.FileBrowser.prototype.options.messages =
	//        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
	//            "uploadFile": "بارگزاری",
	//            "orderBy": "مرتب سازی بر اساس",
	//            "orderByName": "نام",
	//            "orderBySize": "اندازه",
	//            "directoryNotFound": "فولدر مورد نظر پیدا نشد",
	//            "emptyFolder": "فولدر خالی",
	//            "deleteFile": 'آیا از حذف "{0}" اطمینان دارید؟',
	//            "invalidFileType": "انتخاب فایل با پسوند \"{0}\" امکانپذیر نیست. پسوندهای پشیتبانی شده: {1}",
	//            "overwriteFile": "فایل با نام \"{0}\" در فولدر انتخابی وجود دارد. آیا می خواهید آن را بازنویسی کنید؟",
	//            "dropFilesHere": "فایل را به اینجا بکشید",
	//            "search": "جستجو"
	//        });
	//    }

	//    /* FilterCell messages */

	//    if (kendo.ui.FilterCell) {
	//        kendo.ui.FilterCell.prototype.options.messages =
	//        $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
	//            "isTrue": "درست باشد",
	//            "isFalse": "درست نباشد",
	//            "filter": "فیلتر",
	//            "clear": "پاک کردن",
	//            "operator": "عملگر"
	//        });
	//    }

	//    /* FilterCell operators */

	//    if (kendo.ui.FilterCell) {
	//        kendo.ui.FilterCell.prototype.options.operators =
	//        $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
	//            "string": {
	//                "eq": "برابر باشد با",
	//                "neq": "برابر نباشد با",
	//                "startswith": "شروع شود با",
	//                "contains": "شامل باشد",
	//                "doesnotcontain": "شامل نباشد",
	//                "endswith": "پایان یابد با"
	//            },
	//            "number": {
	//                "eq": "برابر باشد با",
	//                "neq": "برابر نباشد با",
	//                "gte": "برابر یا بزرگتر باشد از",
	//                "gt": "بزرگتر باشد از",
	//                "lte": "کمتر و یا برابر باشد با",
	//                "lt": "کمتر باشد از"
	//            },
	//            "date": {
	//                "eq": "برابر باشد با",
	//                "neq": "برابر نباشد با",
	//                "gte": "بعد از یا هم زمان باشد با",
	//                "gt": "بعد از",
	//                "lte": "قبل از یا هم زمان باشد با",
	//                "lt": "قبل از"
	//            },
	//            "enums": {
	//                "eq": "برابر باشد با",
	//                "neq": "برابر نباشد با"
	//            }
	//        });
	//    }

	//    /* FilterMenu messages */

	//    if (kendo.ui.FilterMenu) {
	//        kendo.ui.FilterMenu.prototype.options.messages =
	//        $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
	//            "info": "ردیف های را نشان بده که:",
	//            "title": "ردیف های را نشان بده که:",
	//            "isTrue": "درست باشد",
	//            "isFalse": "درست نباشد",
	//            "filter": "فیلتر",
	//            "clear": "پاک کردن",
	//            "and": "و",
	//            "or": "یا",
	//            "selectValue": "-انتخاب مقدار-",
	//            "operator": "عملگر",
	//            "value": "مقدار",
	//            "cancel": "انصراف"
	//        });
	//    }

	//    /* FilterMenu operator messages */

	//    if (kendo.ui.FilterMenu) {
	//        kendo.ui.FilterMenu.prototype.options.operators =
	//        $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
	//            "string": {
	//                "eq": "برابر باشد با",
	//                "neq": "برابر نباشد با",
	//                "startswith": "شروع شود با",
	//                "contains": "شامل باشد",
	//                "doesnotcontain": "شامل نباشد",
	//                "endswith": "پایان یابد با"
	//            },
	//            "number": {
	//                "eq": "برابر باشد با",
	//                "neq": "برابر نباشد با",
	//                "gte": "برابر یا بزرگتر باشد از",
	//                "gt": "بزرگتر باشد از",
	//                "lte": "کمتر و یا برابر باشد با",
	//                "lt": "کمتر باشد از"
	//            },
	//            "date": {
	//                "eq": "برابر باشد با",
	//                "neq": "برابر نباشد با",
	//                "gte": "بعد از یا هم زمان باشد با",
	//                "gt": "بعد از",
	//                "lte": "قبل از یا هم زمان باشد با",
	//                "lt": "قبل از"
	//            },
	//            "enums": {
	//                "eq": "برابر باشد با",
	//                "neq": "برابر نباشد با"
	//            }
	//        });
	//    }

	//    /* FilterMultiCheck messages */

	//    if (kendo.ui.FilterMultiCheck) {
	//        kendo.ui.FilterMultiCheck.prototype.options.messages =
	//        $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
	//            "checkAll": "انتخاب همه",
	//            "clear": "پاک کردن",
	//            "filter": "فیلتر"
	//        });
	//    }

	//    /* Gantt messages */

	//    if (kendo.ui.Gantt) {
	//        kendo.ui.Gantt.prototype.options.messages =
	//        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
	//            "actions": {
	//                "addChild": "اضافه کردن فرزند",
	//                "append": "اضافه کردن کار",
	//                "insertAfter": "اضافه کن زیر",
	//                "insertBefore": "اضافه کن بالای",
	//                "pdf": "گرفتن خروجی PDF"
	//            },
	//            "cancel": "انصراف",
	//            "deleteDependencyWindowTitle": "حذف رابطه",
	//            "deleteTaskWindowTitle": "حذف کار",
	//            "destroy": "حذف",
	//            "editor": {
	//                "assingButton": "ارجاع دادن",
	//                "editorTitle": "کار",
	//                "end": "پایان",
	//                "percentComplete": "پیشرفت",
	//                "resources": "منابع",
	//                "resourcesEditorTitle": "منابع",
	//                "resourcesHeader": "منابع",
	//                "start": "شروع",
	//                "title": "عنوان",
	//                "unitsHeader": "واحدها"
	//            },
	//            "save": "ذخیره",
	//            "views": {
	//                "day": "روز",
	//                "end": "پایان",
	//                "month": "ماه",
	//                "start": "شروع",
	//                "week": "هفته",
	//                "year": "سال"
	//            }
	//        });
	//    }

	//    /* Grid messages */

	//    if (kendo.ui.Grid) {
	//        kendo.ui.Grid.prototype.options.messages =
	//        $.extend(true, kendo.ui.Grid.prototype.options.messages, {
	//            "commands": {
	//                "cancel": "انصراف",
	//                "canceledit": "انصراف",
	//                "create": "اضافه کردن ردیف جدید",
	//                "destroy": "حذف",
	//                "edit": "ویرایش",
	//                "excel": "خروجی Excel",
	//                "pdf": "خروجی PDF",
	//                "save": "ذخیره",
	//                "select": "انتخاب",
	//                "update": "ذخیره"
	//            },
	//            "editable": {
	//                "cancelDelete": "انصراف",
	//                "confirmation": "آیا از حذف این ردیف مطمئنید؟",
	//                "confirmDelete": "حذف"
	//            },
	//            "noRecords": "اطلاعاتی وجود ندارد"
	//        });
	//    }

	//    /* Groupable messages */

	//    if (kendo.ui.Groupable) {
	//        kendo.ui.Groupable.prototype.options.messages =
	//        $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
	//            "empty": "برای گروه بندی بر اساس یک ستون، عنوان ستون را به اینجا بکشید"
	//        });
	//    }

	//    /* NumericTextBox messages */

	//    if (kendo.ui.NumericTextBox) {
	//        kendo.ui.NumericTextBox.prototype.options =
	//        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
	//            "upArrowText": "اضافه کردن",
	//            "downArrowText": "کم کردن"
	//        });
	//    }

	//    /* Pager messages */

	//    if (kendo.ui.Pager) {
	//        kendo.ui.Pager.prototype.options.messages =
	//        $.extend(true, kendo.ui.Pager.prototype.options.messages, {
	//            "allPages": "همه",
	//            "display": "ردیف {0} تا {1} از {2} ردیف",
	//            "empty": "ردیفی برای نمایش وجود ندارد",
	//            "page": "صفحه",
	//            "of": "از {0}",
	//            "itemsPerPage": "ردیف های هر صفحه",
	//            "first": "برو به صفحه اول",
	//            "previous": "برو به صفحه قبل",
	//            "next": "برو به صفحه بعد",
	//            "last": "برو به صفحه آخر",
	//            "refresh": "بارگزاری مجدد",
	//            "morePages": "صفحات بیشتر"
	//        });
	//    }

	//    /* TreeListPager messages */

	//    if (kendo.ui.TreeListPager) {
	//        kendo.ui.TreeListPager.prototype.options.messages =
	//        $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
	//            "allPages": "همه",
	//            "display": "ردیف {0} تا {1} از {2} ردیف",
	//            "empty": "ردیفی برای نمایش وجود ندارد",
	//            "page": "صفحه",
	//            "of": "از {0}",
	//            "itemsPerPage": "ردیف های هر صفحه",
	//            "first": "برو به صفحه اول",
	//            "previous": "برو به صفحه قبل",
	//            "next": "برو به صفحه بعد",
	//            "last": "برو به صفحه آخر",
	//            "refresh": "بارگزاری مجدد",
	//            "morePages": "صفحات بیشتر"
	//        });
	//    }

	//    /* PivotGrid messages */

	//    if (kendo.ui.PivotGrid) {
	//        kendo.ui.PivotGrid.prototype.options.messages =
	//        $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
	//            "measureFields": "Drop Data Fields Here",
	//            "columnFields": "Drop Column Fields Here",
	//            "rowFields": "Drop Rows Fields Here"
	//        });
	//    }

	//    /* PivotFieldMenu messages */

	//    if (kendo.ui.PivotFieldMenu) {
	//        kendo.ui.PivotFieldMenu.prototype.options.messages =
	//        $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
	//            "info": "Show items with value that:",
	//            "filterFields": "Fields Filter",
	//            "filter": "Filter",
	//            "include": "Include Fields...",
	//            "title": "Fields to include",
	//            "clear": "Clear",
	//            "ok": "Ok",
	//            "cancel": "Cancel",
	//            "operators": {
	//                "contains": "Contains",
	//                "doesnotcontain": "Does not contain",
	//                "startswith": "Starts with",
	//                "endswith": "Ends with",
	//                "eq": "Is equal to",
	//                "neq": "Is not equal to"
	//            }
	//        });
	//    }

	//    /* RecurrenceEditor messages */

	//    if (kendo.ui.RecurrenceEditor) {
	//        kendo.ui.RecurrenceEditor.prototype.options.messages =
	//        $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
	//            "frequencies": {
	//                "never": "هیچ وقت",
	//                "hourly": "ساعتی",
	//                "daily": "روزانه",
	//                "weekly": "هفتگی",
	//                "monthly": "ماهانه",
	//                "yearly": "سالیانه"
	//            },
	//            "hourly": {
	//                "repeatEvery": "تکرار کن هر: ",
	//                "interval": " ساعت"
	//            },
	//            "daily": {
	//                "repeatEvery": "تکرار کن هر: ",
	//                "interval": " روز"
	//            },
	//            "weekly": {
	//                "interval": " هفته",
	//                "repeatEvery": "تکرار کن هر: ",
	//                "repeatOn": "تکرار کن در: "
	//            },
	//            "monthly": {
	//                "repeatEvery": "تکرار کن هر: ",
	//                "repeatOn": "تکرار کن در: ",
	//                "interval": " ماه",
	//                "day": "روز "
	//            },
	//            "yearly": {
	//                "repeatEvery": "تکرار کن هر: ",
	//                "repeatOn": "تکرار کن در: ",
	//                "interval": " سال",
	//                "of": " از "
	//            },
	//            "end": {
	//                "label": "پایان:",
	//                "mobileLabel": "پایان",
	//                "never": "هیچ وقت",
	//                "after": "بعد از ",
	//                "occurrence": " دفعات وقوع",
	//                "on": "در "
	//            },
	//            "offsetPositions": {
	//                "first": "اول",
	//                "second": "دوم",
	//                "third": "سوم",
	//                "fourth": "چهارم",
	//                "last": "آخر"
	//            },
	//            "weekdays": {
	//                "day": "روز",
	//                "weekday": "روز هفته",
	//                "weekend": "پایان هفته"
	//            }
	//        });
	//    }

	//    /* Scheduler messages */

	//    if (kendo.ui.Scheduler) {
	//        kendo.ui.Scheduler.prototype.options.messages =
	//        $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
	//            "allDay": "all day",
	//            "date": "Date",
	//            "event": "Event",
	//            "time": "Time",
	//            "showFullDay": "Show full day",
	//            "showWorkDay": "Show business hours",
	//            "today": "Today",
	//            "save": "Save",
	//            "cancel": "Cancel",
	//            "destroy": "Delete",
	//            "deleteWindowTitle": "Delete event",
	//            "ariaSlotLabel": "Selected from {0:t} to {1:t}",
	//            "ariaEventLabel": "{0} on {1:D} at {2:t}",
	//            "editable": {
	//                "confirmation": "Are you sure you want to delete this event?"
	//            },
	//            "views": {
	//                "day": "Day",
	//                "week": "Week",
	//                "workWeek": "Work Week",
	//                "agenda": "Agenda",
	//                "month": "Month"
	//            },
	//            "recurrenceMessages": {
	//                "deleteWindowTitle": "Delete Recurring Item",
	//                "deleteWindowOccurrence": "Delete current occurrence",
	//                "deleteWindowSeries": "Delete the series",
	//                "editWindowTitle": "Edit Recurring Item",
	//                "editWindowOccurrence": "Edit current occurrence",
	//                "editWindowSeries": "Edit the series",
	//                "deleteRecurring": "Do you want to delete only this event occurrence or the whole series?",
	//                "editRecurring": "Do you want to edit only this event occurrence or the whole series?"
	//            },
	//            "editor": {
	//                "title": "Title",
	//                "start": "Start",
	//                "end": "End",
	//                "allDayEvent": "All day event",
	//                "description": "Description",
	//                "repeat": "Repeat",
	//                "timezone": " ",
	//                "startTimezone": "Start timezone",
	//                "endTimezone": "End timezone",
	//                "separateTimezones": "Use separate start and end time zones",
	//                "timezoneEditorTitle": "Timezones",
	//                "timezoneEditorButton": "Time zone",
	//                "timezoneTitle": "Time zones",
	//                "noTimezone": "No timezone",
	//                "editorTitle": "Event"
	//            }
	//        });
	//    }

	//    /* Slider messages */

	//    if (kendo.ui.Slider) {
	//        kendo.ui.Slider.prototype.options =
	//        $.extend(true, kendo.ui.Slider.prototype.options, {
	//            "increaseButtonTitle": "افزایش",
	//            "decreaseButtonTitle": "کاهش"
	//        });
	//    }

	//    /* TreeList messages */

	//    if (kendo.ui.TreeList) {
	//        kendo.ui.TreeList.prototype.options.messages =
	//        $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
	//            "noRows": "ردیفی برای نمایش موجود نیست",
	//            "loading": "در حال بارگزاری...",
	//            "requestFailed": "شکست در انجام درخواست.",
	//            "retry": "تلاش مجدد",
	//            "commands": {
	//                "edit": "ویرایش",
	//                "update": "ذخیره",
	//                "canceledit": "انصراف",
	//                "create": "درج ردیف جدید",
	//                "createchild": "درج گره جدید",
	//                "destroy": "حذف",
	//                "excel": "خروجی Excel",
	//                "pdf": "خروجی PDF"
	//            }
	//        });
	//    }

	//    /* TreeView messages */

	//    if (kendo.ui.TreeView) {
	//        kendo.ui.TreeView.prototype.options.messages =
	//        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
	//            "loading": "در حال بارگزاری...",
	//            "requestFailed": "شکست در انجام درخواست.",
	//            "retry": "تلاش مجدد"
	//        });
	//    }

	//    /* Upload messages */

	//    if (kendo.ui.Upload) {
	//        kendo.ui.Upload.prototype.options.localization =
	//        $.extend(true, kendo.ui.Upload.prototype.options.localization, {
	//            "select": "انتخاب فایل(ها)...",
	//            "cancel": "انصراف",
	//            "retry": "تلاش مجدد",
	//            "remove": "حذف",
	//            "uploadSelectedFiles": "بارگزاری فایل(ها)",
	//            "dropFilesHere": "فایل(ها) را برای بارگزاری به اینجا بکشید",
	//            "statusUploading": "در حال بارگزاری",
	//            "statusUploaded": "پایان بارگزاری",
	//            "statusWarning": "هشداد",
	//            "statusFailed": "خطا در بارگزاری",
	//            "headerStatusUploading": "در حال بارگزاری...",
	//            "headerStatusUploaded": "اتمام بارگزاری"
	//        });
	//    }

	//    /* Validator messages */

	//    if (kendo.ui.Validator) {
	//        kendo.ui.Validator.prototype.options.messages =
	//        $.extend(true, kendo.ui.Validator.prototype.options.messages, {
	//            "required": "{0} اجباری است",
	//            "pattern": "{0} معتبر نیست",
	//            "min": "{0} باید بزرگتر یا برابر باشد با {1}",
	//            "max": "{0} باید کوچکتر یا برابر باشد با {1}",
	//            "step": "{0} معتبر نیست",
	//            "email": "{0} یک ایمیل معتبر نیست",
	//            "url": "{0} آدرس وب سایت معتبر نیست",
	//            "date": "{0} تاریخ معتبر نیست",
	//            "dateCompare": "تاریخ پایان باید برابر یا بعد از تاریخ آغاز باشد"
	//        });
	//    }
	//})(window.kendo.jQuery);

        /* FlatColorPicker messages */

        if (kendo.ui.FlatColorPicker) {
            kendo.ui.FlatColorPicker.prototype.options.messages =
                $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
                    "apply": "اعمال",
                    "cancel": "انصراف",
                    "noColor": "بدون رنگ",
                    "clearColor": "پاک کردن رنگ"
                });
        }

        /* ColorPicker messages */

        if (kendo.ui.ColorPicker) {
            kendo.ui.ColorPicker.prototype.options.messages =
                $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
                    "apply": "اعمال",
                    "cancel": "انصراف",
                    "noColor": "بدون رنگ",
                    "clearColor": "پاک کردن رنگ"
                });
        }

        /* ColumnMenu messages */

        if (kendo.ui.ColumnMenu) {
            kendo.ui.ColumnMenu.prototype.options.messages =
                $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
                    "sortAscending": "مرتب سازی صعودی",
                    "sortDescending": "مرتب سازی نزولی",
                    "filter": "فیلتر",
                    "columns": "ستون",
                    "done": "انجام شد",
                    "settings": "تنظیمات ستون",
                    "lock": "قفل کردن",
                    "unlock": "باز کردن"
                });
        }

        /* Editor messages */

        if (kendo.ui.Editor) {
            kendo.ui.Editor.prototype.options.messages =
                $.extend(true, kendo.ui.Editor.prototype.options.messages, {
                    "bold": "برجسته",
                    "italic": "مورب",
                    "underline": "خط کشیدن زیر",
                    "strikethrough": "خط زدن",
                    "superscript": "بالانویس",
                    "subscript": "زیرنویس",
                    "justifyCenter": "وسط چین کردن",
                    "justifyLeft": "چپ چین",
                    "justifyRight": "راست چین",
                    "justifyFull": "میزان کردن",
                    "insertUnorderedList": "اضافه کردن لیست مرتب سازی نشده",
                    "insertOrderedList": "اضافه کردن لیست مرتب سازی شده",
                    "indent": "تو رفتگی",
                    "outdent": "بیرون آمدگی",
                    "createLink": "اضافه کردن لینک",
                    "unlink": "حذف لینک",
                    "insertImage": "اضافه کردن تصویر",
                    "insertFile": "اضافه کردن فایل",
                    "insertHtml": "اضافه کردن HTML",
                    "viewHtml": "نمایش HTML",
                    "fontName": "انتخاب نوع فونت",
                    "fontNameInherit": "فونت ارث بری شده",
                    "fontSize": "انتخاب اندازه فونت",
                    "fontSizeInherit": "فونت ارث بری شده",
                    "formatBlock": "قالب",
                    "formatting": "قالب",
                    "foreColor": "رنگ",
                    "backColor": "رنگ پس زمینه",
                    "style": "حالت ها",
                    "emptyFolder": "پوشه خالی",
                    "uploadFile": "بارگذاری",
                    "orderBy": "مرتب سازی بر اساس:",
                    "orderBySize": "اندازه",
                    "orderByName": "نام",
                    "invalidFileType": "فایل انتخاب شده ی \"{0}\" قابل قبول نیست. فایل های پشتیبانی شده {1} هستند.",
                    "deleteFile": 'آیا از حذف "{0}" اطمینان دارید؟',
                    "overwriteFile": 'فایلی با نام "{0}" در این پوشه از قبل وجود دارد. آیا مایل به نوشتن بر روی آن هستید؟',
                    "directoryNotFound": "پوشه ای با این پیدا نشد.",
                    "imageWebAddress": "آدرس وب",
                    "imageAltText": "متن جایگزین",
                    "imageWidth": "عرض (پیکسل)",
                    "imageHeight": "ارتفاع (پیکسل)",
                    "fileWebAddress": "آدرس وب",
                    "fileTitle": "عنوان",
                    "linkWebAddress": "آدرس وب",
                    "linkText": "متن",
                    "linkToolTip": "متن راهنما",
                    "linkOpenInNewWindow": "باز کردن لینک در پنجره ی جدید",
                    "dialogUpdate": "به روزرسانی",
                    "dialogInsert": "اضافه کردن",
                    "dialogButtonSeparator": "یا",
                    "dialogCancel": "انصراف",
                    "cleanFormatting": "پاک کردن قالب",
                    "createTable": "ساخت جدول",
                    "addColumnLeft": "اضافه کردن ستون به چپ",
                    "addColumnRight": "اضافه کردن ستون به راست",
                    "addRowAbove": "اضافه کردن سطر به بالا",
                    "addRowBelow": "اضافه کردن سطر به پایین",
                    "deleteRow": "حذف سطر",
                    "deleteColumn": "حذف ستون",
                    "dialogOk": "تأیید",
                    "tableWizard": "برنامه جدول",
                    "tableTab": "جدول",
                    "cellTab": "سلول",
                    "accessibilityTab": "دسترسی",
                    "caption": "عنوان",
                    "summary": "خلاصه",
                    "width": "عرض",
                    "height": "ارتفاع",
                    "cellSpacing": "فضای بین سلول",
                    "cellPadding": "فضای داخل سلول",
                    "cellMargin": "حاشیه سلول",
                    "alignment": "تنظیم",
                    "background": "پس زمینه",
                    "cssClass": "CSS کلاس",
                    "id": "شناسه",
                    "border": "لبه",
                    "borderStyle": "حالت لبه",
                    "collapseBorders": "عدم نمایش لبه",
                    "wrapText": "Wrap متن",
                    "associateCellsWithHeaders": "پیوند سلول ها با سرستون ها",
                    "alignLeft": "چپ چین",
                    "alignCenter": "وسط چیپ",
                    "alignRight": "راست چین",
                    "alignLeftTop": "تراز چپ بالا",
                    "alignCenterTop": "تراز وسط بالا",
                    "alignRightTop": "تراز راست بالا",
                    "alignLeftMiddle": "تراز چپ وسط",
                    "alignCenterMiddle": "تراز وسط وسط",
                    "alignRightMiddle": "تراز راست وسط",
                    "alignLeftBottom": "تراز چپ پایین",
                    "alignCenterBottom": "تراز وسط پایین",
                    "alignRightBottom": "تراز راست پایین",
                    "alignRemove": "پاک کردن تنظیم",
                    "columns": "ستون",
                    "rows": "سطر",
                    "selectAllCells": "انتخاب همه سلول ها"
                });
        }

        /* FileBrowser messages */

        if (kendo.ui.FileBrowser) {
            kendo.ui.FileBrowser.prototype.options.messages =
                $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
                    "uploadFile": "بارگذاری",
                    "orderBy": "مرتب سازی بر اساس",
                    "orderByName": "نام",
                    "orderBySize": "اندازه",
                    "directoryNotFound": "پوشه ای با این نام پیدا نشد.",
                    "emptyFolder": "خالی کردن پوشه",
                    "deleteFile": 'آیا از حذف "{0}" اطمینان دارید؟',
                    "invalidFileType": 'فایل انتخاب شده ی "{0}" قابل قبول نیست. فایل های پشتیبانی شده {1} هستند.',
                    "overwriteFile": 'فایلی با نام "{0}" در این پوشه از قبل وجود دارد. آیا مایل به نوشتن بر روی آن هستید؟',
                    "dropFilesHere": "برای بارگذاری، فایل ها را اینجا رها کنید",
                    "search": "جستجو"
                });
        }

        /* FilterCell messages */

        if (kendo.ui.FilterCell) {
            kendo.ui.FilterCell.prototype.options.messages =
                $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
                    "isTrue": "صحیح",
                    "isFalse": "غلط",
                    "filter": "فیلتر",
                    "clear": "پاک کردن",
                    "operator": "عملگر"
                });
        }

        /* FilterCell operators */

        if (kendo.ui.FilterCell) {
            kendo.ui.FilterCell.prototype.options.operators =
                $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
                    "string": {
                        "eq": "برابر با",
                        "neq": "نامساوی با",
                        "startswith": "شروع با",
                        "contains": "شامل",
                        "doesnotcontain": "بدون",
                        "endswith": "پایان با",
                        "isnull": "بدون مقدار",
                        "isnotnull": "دارای مقدار",
                        "isempty": "خالی",
                        "isnotempty": "پر"
                    },
                    "number": {
                        "eq": "برابر با",
                        "neq": "نامساوی با",
                        "gte": "بزرگتر از یا مساوی با",
                        "gt": "بزرگتر از",
                        "lte": "کوچکتر از یا مساوی با",
                        "lt": "کوچکتر از",
                        "isnull": "خالی",
                        "isnotnull": "پر"
                    },
                    "date": {
                        "eq": "برابر با",
                        "neq": "نامساوی با",
                        "gte": "بعد از یا مساوی با",
                        "gt": "بعد از",
                        "lte": "قبل از یا مساوی با",
                        "lt": "قبل از",
                        "isnull": "خالی",
                        "isnotnull": "پر"
                    },
                    "enums": {
                        "eq": "برابر با",
                        "neq": "نامساوی با",
                        "isnull": "خالی",
                        "isnotnull": "پر"
                    }
                });
        }

        /* FilterMenu messages */

        if (kendo.ui.FilterMenu) {
            kendo.ui.FilterMenu.prototype.options.messages =
                $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
                    "info": "نمایش مواردی که مقادیر آن ها:",
                    "isTrue": "صحیح",
                    "isFalse": "غلط",
                    "filter": "فیلتر",
                    "clear": "پاک کردن",
                    "and": "و",
                    "or": "یا",
                    "selectValue": "-انتخاب مقدار-",
                    "operator": "عملگر",
                    "value": "مقدار",
                    "cancel": "انصراف"
                });
        }

        /* FilterMenu operator messages */

        if (kendo.ui.FilterMenu) {
            kendo.ui.FilterMenu.prototype.options.operators =
                $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
                    "string": {
                        "eq": "برابر با",
                        "neq": "نامساوی با",
                        "startswith": "شروع با",
                        "contains": "شامل",
                        "doesnotcontain": "بدون",
                        "endswith": "پایان با",
                        "isnull": "بدون مقدار",
                        "isnotnull": "دارای مقدار",
                        "isempty": "خالی",
                        "isnotempty": "پر"
                    },
                    "number": {
                        "eq": "برابر با",
                        "neq": "نامساوی با",
                        "gte": "بزرگتر از یا مساوی با",
                        "gt": "بزرگتر از",
                        "lte": "کوچکتر از یا مساوی با",
                        "lt": "کوچکتر از",
                        "isnull": "خالی",
                        "isnotnull": "پر"
                    },
                    "date": {
                        "eq": "برابر با",
                        "neq": "نامساوی با",
                        "gte": "بعد از یا مساوی با",
                        "gt": "بعد از",
                        "lte": "قبل از یا مساوی با",
                        "lt": "قبل از",
                        "isnull": "خالی",
                        "isnotnull": "پر"
                    },
                    "enums": {
                        "eq": "برابر با",
                        "neq": "نامساوی با",
                        "isnull": "خالی",
                        "isnotnull": "پر"
                    }
                });
        }

        /* FilterMultiCheck messages */

        if (kendo.ui.FilterMultiCheck) {
            kendo.ui.FilterMultiCheck.prototype.options.messages =
                $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
                    "checkAll": "انتخاب همه",
                    "clear": "پاک کردن",
                    "filter": "فیلتر",
                    "search": "جستجو"
                });
        }

        /* Gantt messages */

        if (kendo.ui.Gantt) {
            kendo.ui.Gantt.prototype.options.messages =
                $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
                    "actions": {
                        "addChild": "اضافه کردن فرزند",
                        "append": "اضافه کردن وظیفه",
                        "insertAfter": "اضافه کردن به پایین",
                        "insertBefore": "اضافه کردن به بالا",
                        "pdf": "صدور به PDF"
                    },
                    "cancel": "انصراف",
                    "deleteDependencyWindowTitle": "حذف وابستگی",
                    "deleteTaskWindowTitle": "حذف وظیفه",
                    "destroy": "حذف",
                    "editor": {
                        "assingButton": "محول کردن",
                        "editorTitle": "وظیفه",
                        "end": "پایان",
                        "percentComplete": "تکمیل",
                        "resources": "منابع",
                        "resourcesEditorTitle": "منابع",
                        "resourcesHeader": "منابع",
                        "start": "شروع",
                        "title": "عنوان",
                        "unitsHeader": "واحدها"
                    },
                    "save": "ذخیره",
                    "views": {
                        "day": "روز",
                        "end": "پایان",
                        "month": "ماه",
                        "start": "شروع",
                        "week": "هفته",
                        "year": "سال"
                    }
                });
        }

        /* Grid messages */

        if (kendo.ui.Grid) {
            kendo.ui.Grid.prototype.options.messages =
                $.extend(true, kendo.ui.Grid.prototype.options.messages, {
                    "commands": {
                        "cancel": "انصراف از تغییرات",
                        "canceledit": "انصراف",
                        "create": "ایجاد",
                        "destroy": "حذف",
                        "edit": "ویرایش",
                        "excel": "صدور به Excel",
                        "pdf": "صدور به PDF",
                        "save": "ذخیره تغییرات",
                        "select": "انتخاب",
                        "update": "به روزرسانی"
                    },
                    "editable": {
                        "cancelDelete": "انصراف",
                        "confirmation": "آیا از حذف این رکورد اطمینان دارید؟",
                        "confirmDelete": "حذف"
                    },
                    "noRecords": "رکوردی در دسترس نیست."
                });
        }

        /* TreeList messages */

        if (kendo.ui.TreeList) {
            kendo.ui.TreeList.prototype.options.messages =
                $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
                    "noRows": "رکوردی برای نمایش وجود ندارد",
                    "loading": "در حال بارگذاری...",
                    "requestFailed": "درخواست ناموفق بود.",
                    "retry": "تلاش مجدد",
                    "commands": {
                        "edit": "ویرایش",
                        "update": "به روزرسانی",
                        "canceledit": "انصراف",
                        "create": "ایجاد",
                        "createchild": "اضافه کردن رکورد فرزند",
                        "destroy": "حذف",
                        "excel": "صدور به Excel",
                        "pdf": "صدور به PDF"
                    }
                });
        }

        /* Groupable messages */

        if (kendo.ui.Groupable) {
            kendo.ui.Groupable.prototype.options.messages =
                $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
                    "empty": "یک سرستون را به اینجا بکشید"
                });
        }

        /* NumericTextBox messages */

        if (kendo.ui.NumericTextBox) {
            kendo.ui.NumericTextBox.prototype.options =
                $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
                    "upArrowText": "زیاد کردن مقدار",
                    "downArrowText": "کم کردن مقدار"
                });
        }

        /* MediaPlayer messages */

        if (kendo.ui.MediaPlayer) {
            kendo.ui.MediaPlayer.prototype.options.messages =
                $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
                    "pause": "توقف",
                    "play": "اجرا",
                    "mute": "بدون صدا",
                    "unmute": "با صدا",
                    "quality": "کیفیت",
                    "fullscreen": "تمام صفحه"
                });
        }

        /* Pager messages */

        if (kendo.ui.Pager) {
            kendo.ui.Pager.prototype.options.messages =
                $.extend(true, kendo.ui.Pager.prototype.options.messages, {
                    "allPages": "همه",
                    "display": "{0} - {1} از {2} مورد",
                    "empty": "موردی برای نمایش وجود ندارد",
                    "page": "صفحه",
                    "of": "از {0}",
                    "itemsPerPage": "مورد در هر صفحه",
                    "first": "رفتن به صفحه اول",
                    "previous": "رفتن به صفحه قبل",
                    "next": "رفتن به صفحه بعد",
                    "last": "رفتن به صفحه آخر",
                    "refresh": "تازه سازی",
                    "morePages": "صفحات بیشتر"
                });
        }

        /* PivotGrid messages */

        if (kendo.ui.PivotGrid) {
            kendo.ui.PivotGrid.prototype.options.messages =
                $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
                    "measureFields": "رشته های داده ها را ایجا رها کنید",
                    "columnFields": "رشته های ستون را اینجا رها کنید",
                    "rowFields": "رشته های سطرها را اینجا رها کنید"
                });
        }

        /* PivotFieldMenu messages */

        if (kendo.ui.PivotFieldMenu) {
            kendo.ui.PivotFieldMenu.prototype.options.messages =
                $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
                    "info": "نمایش مواردی که مقادیر آن ها:",
                    "filterFields": "فیلتر رشته ها",
                    "filter": "فیلتر",
                    "include": "شامل رشته های...",
                    "title": "رشته های مشمول",
                    "clear": "پاک گردن",
                    "ok": "تأیید",
                    "cancel": "انصراف",
                    "operators": {
                        "contains": "شامل",
                        "doesnotcontain": "بدون",
                        "startswith": "شروع با",
                        "endswith": "پایان با",
                        "eq": "برابر با",
                        "neq": "نامساوی با"
                    }
                });
        }

        /* RecurrenceEditor messages */

        if (kendo.ui.RecurrenceEditor) {
            kendo.ui.RecurrenceEditor.prototype.options.messages =
                $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
                    "frequencies": {
                        "never": "هرگز",
                        "hourly": "ساعتی",
                        "daily": "روزانه",
                        "weekly": "هفتگی",
                        "monthly": "ماهانه",
                        "yearly": "سالیانه"
                    },
                    "hourly": {
                        "repeatEvery": "تکرار در هر: ",
                        "interval": " ساعت"
                    },
                    "daily": {
                        "repeatEvery": "تکرار در هر: ",
                        "interval": " روز"
                    },
                    "weekly": {
                        "interval": " هفته",
                        "repeatEvery": "تکرار در هر: ",
                        "repeatOn": "تکرار در: "
                    },
                    "monthly": {
                        "repeatEvery": "تکرار در هر: ",
                        "repeatOn": "تکرار در: ",
                        "interval": " ماه",
                        "day": "روز "
                    },
                    "yearly": {
                        "repeatEvery": "تکرار در هر: ",
                        "repeatOn": "تکرار در: ",
                        "interval": " سال",
                        "of": " از "
                    },
                    "end": {
                        "label": "پایان:",
                        "mobileLabel": "پایان",
                        "never": "هرگز",
                        "after": "بعد از ",
                        "occurrence": " پیشامد",
                        "on": "در "
                    },
                    "offsetPositions": {
                        "first": "اول",
                        "second": "دوم",
                        "third": "سوم",
                        "fourth": "چهارم",
                        "last": "آخرین"
                    },
                    "weekdays": {
                        "day": "روز",
                        "weekday": "روز هفته",
                        "weekend": "روز آخر هفته"
                    }
                });
        }

        /* Scheduler messages */

        if (kendo.ui.Scheduler) {
            kendo.ui.Scheduler.prototype.options.messages =
                $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
                    "allDay": "تمام روز",
                    "date": "تاریخ",
                    "event": "رویداد",
                    "time": "زمان",
                    "showFullDay": "نمایش روز کامل",
                    "showWorkDay": "نمایش ساعات کاری",
                    "today": "امروز",
                    "save": "ذخیره",
                    "cancel": "انصراف",
                    "destroy": "حذف",
                    "deleteWindowTitle": "حذف رویداد",
                    "ariaSlotLabel": "انتخاب از {0:t} تا {1:t}",
                    "ariaEventLabel": "{0} در {1:D} {2:t}",
                    "editable": {
                        "confirmation": "آیا از حذف این رویداد اطمینان دارید؟"
                    },
                    "views": {
                        "day": "روز",
                        "week": "هفته",
                        "workWeek": "هفته کاری",
                        "agenda": "برنامه",
                        "month": "ماه"
                    },
                    "recurrenceMessages": {
                        "deleteWindowTitle": "حذف مورد تکرارشونده",
                        "deleteWindowOccurrence": "حذف پیشامد فعلی",
                        "deleteWindowSeries": "حذف تمامی سری",
                        "editWindowTitle": "ویرایش مورد تکرار شونده",
                        "editWindowOccurrence": "ویرایش پیشامد فعلی",
                        "editWindowSeries": "ویرایش تمامی سری",
                        "deleteRecurring": "مایل به حذف فقط این پیشامد رویداد هستید یا تمامی سری؟",
                        "editRecurring": "مایل به ویرایش فقط این پیشامد رویداد هستید یا تمامی سری؟"
                    },
                    "editor": {
                        "title": "عنوان",
                        "start": "شروع",
                        "end": "پایان",
                        "allDayEvent": "رویداد تمام روز",
                        "description": "توضیحات",
                        "repeat": "تکرار",
                        "timezone": " ",
                        "startTimezone": "منطقه زمانی شروع",
                        "endTimezone": "منطقه زمانی پایان",
                        "separateTimezones": "استفاده از مناطق زمانی متفاوت برای شروع و پایان",
                        "timezoneEditorTitle": "مناطق زمانی",
                        "timezoneEditorButton": "منطقه زمانی",
                        "timezoneTitle": "مناطق زمانی",
                        "noTimezone": "بدون منطقه زمانی",
                        "editorTitle": "رویداد"
                    }
                });
        }

        /* Spreadsheet messages */

        if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
            kendo.spreadsheet.messages.borderPalette =
                $.extend(true, kendo.spreadsheet.messages.borderPalette, {
                    "allBorders": "تمامی لبه ها",
                    "insideBorders": "لبه های داخلی",
                    "insideHorizontalBorders": "داخل لبه های افقی",
                    "insideVerticalBorders": "داخل لبه های عمودی",
                    "outsideBorders": "لبه های خارجی",
                    "leftBorder": "لبه چپ",
                    "topBorder": "لبه بالا",
                    "rightBorder": "لبه راست",
                    "bottomBorder": "لبه پایین",
                    "noBorders": "بدون لبه",
                    "reset": "بازنشانی رنگ",
                    "customColor": "رنگ دلخواه...",
                    "apply": "اعمال",
                    "cancel": "انصراف"
                });
        }

        if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
            kendo.spreadsheet.messages.dialogs =
                $.extend(true, kendo.spreadsheet.messages.dialogs, {
                    "apply": "اعمال",
                    "save": "ذخیره",
                    "cancel": "انصراف",
                    "remove": "حذف",
                    "retry": "تلاش مجدد",
                    "revert": "بازگردانی",
                    "okText": "تأیید",
                    "formatCellsDialog": {
                        "title": "قالب",
                        "categories": {
                            "number": "عدد",
                            "currency": "واحد پول",
                            "date": "تاریخ"
                        }
                    },
                    "fontFamilyDialog": {
                        "title": "فونت"
                    },
                    "fontSizeDialog": {
                        "title": "اندازه فونت"
                    },
                    "bordersDialog": {
                        "title": "لبه ها"
                    },
                    "alignmentDialog": {
                        "title": "تراز",
                        "buttons": {
                            "justtifyLeft": "چپ چین",
                            "justifyCenter": "وسط چین",
                            "justifyRight": "راست چین",
                            "justifyFull": "میزان کردن",
                            "alignTop": "تراز بالا",
                            "alignMiddle": "تراز وسط",
                            "alignBottom": "تراز پایین"
                        }
                    },
                    "mergeDialog": {
                        "title": "ادغام سلول ها",
                        "buttons": {
                            "mergeCells": "ادغام همه",
                            "mergeHorizontally": "ادغام افقی",
                            "mergeVertically": "ادغام عمودی",
                            "unmerge": "جداسازی"
                        }
                    },
                    "freezeDialog": {
                        "title": "ثابت کردن پنل ها",
                        "buttons": {
                            "freezePanes": "ثابت کردن پنل ها",
                            "freezeRows": "ثابت کردن سطرها",
                            "freezeColumns": "ثابت کردن ستون ها",
                            "unfreeze": "آزادسازی پنل ها"
                        }
                    },
                    "confirmationDialog": {
                        "text": "آیا از حذف این برگه اطمینان دارید؟",
                        "title": "حذف برگه"
                    },
                    "validationDialog": {
                        "title": "اعتبارسنجی داده",
                        "hintMessage": "لطفا یک مقدار {0} معتیر {1} وارد کنید.",
                        "hintTitle": "اعتبارسنجی {0}",
                        "criteria": {
                            "any": "هر مقداری",
                            "number": "عدد",
                            "text": "متن",
                            "date": "تاریخ",
                            "custom": "فرمول دلخواه",
                            "list": "لیست"
                        },
                        "comparers": {
                            "greaterThan": "بزرگتر از",
                            "lessThan": "کمتر از",
                            "between": "بین",
                            "notBetween": "بیرون از",
                            "equalTo": "برابر با",
                            "notEqualTo": "نامساوی با",
                            "greaterThanOrEqualTo": "بزرگتر از یا مساوی با",
                            "lessThanOrEqualTo": "کمتر از یا مساوی با"
                        },
                        "comparerMessages": {
                            "greaterThan": "بزرگتر از {0}",
                            "lessThan": "کمتر از {0}",
                            "between": "بین {0} و {1}",
                            "notBetween": "بیرون از {0} و {1}",
                            "equalTo": "برابر با {0}",
                            "notEqualTo": "نامساوی با {0}",
                            "greaterThanOrEqualTo": "بزرگتر از یا مساوی با {0}",
                            "lessThanOrEqualTo": "کمتر از یا مساوی با {0}",
                            "custom": "که طبق این فرمول باشد: {0}"
                        },
                        "labels": {
                            "criteria": "معیار",
                            "comparer": "مقایسه کننده",
                            "min": "مینیموم",
                            "max": "ماکسیموم",
                            "value": "مقدار",
                            "start": "شروع",
                            "end": "پایان",
                            "onInvalidData": "در داده فاقد اعتبار",
                            "rejectInput": "قبول نکردن ورودی",
                            "showWarning": "نمایش هشدار",
                            "showHint": "نشان دادن راهنما",
                            "hintTitle": "عنوان راهنما",
                            "hintMessage": "پیام راهنما",
                            "ignoreBlank": "چشم پوشی از خالی"
                        },
                        "placeholders": {
                            "typeTitle": "عنوان را بنویسید",
                            "typeMessage": "پیام را وارد کنید"
                        }
                    },
                    "saveAsDialog": {
                        "title": "ذخیره به عنوان...",
                        "labels": {
                            "fileName": "نام",
                            "saveAsType": "ذخیره با نوع"
                        }
                    },
                    "exportAsDialog": {
                        "title": "صدور...",
                        "labels": {
                            "fileName": "نام فایل",
                            "saveAsType": "ذخیره با نوع",
                            "exportArea": "صدور",
                            "paperSize": "اندازه صفحه",
                            "margins": "حاشیه ها",
                            "orientation": "جهت",
                            "print": "چاپ",
                            "guidelines": "خطوط راهنما",
                            "center": "وسط چین",
                            "horizontally": "افقی",
                            "vertically": "عمودی"
                        }
                    },
                    "modifyMergedDialog": {
                        "errorMessage": "قسمتی از یک سلول ادغام شده قابل تغییر نیست."
                    },
                    "useKeyboardDialog": {
                        "title": "کپی کردن و چسباندن",
                        "errorMessage": "این عملیات نمی توانند توسط منو فراخوانی شوند. لطفا به جای آن از میانبرهای صفحه کلید استفاده نمایید:",
                        "labels": {
                            "forCopy": "برای کپی",
                            "forCut": "برای برش",
                            "forPaste": "برای چسباندن"
                        }
                    },
                    "unsupportedSelectionDialog": {
                        "errorMessage": "این عملکرد نمی تواند بر روی چند انتخاب انجام شود."
                    }
                });
        }

        if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
            kendo.spreadsheet.messages.filterMenu =
                $.extend(true, kendo.spreadsheet.messages.filterMenu, {
                    "sortAscending": "مرتب سازی بازه الف به ی",
                    "sortDescending": "مرتب سازی بازه ی به الف",
                    "filterByValue": "فیلتر بر اساس مقدار",
                    "filterByCondition": "فیلتر بر اساس شرط",
                    "apply": "اعمال",
                    "search": "جستجو",
                    "addToCurrent": "اضافه کردن به انتخاب فعلی",
                    "clear": "پاک کردن",
                    "blanks": "خالی",
                    "operatorNone": "هیچ کدام",
                    "and": "و",
                    "or": "یا",
                    "operators": {
                        "string": {
                            "contains": "متن شامل",
                            "doesnotcontain": "متن بدون",
                            "startswith": "شروع متن با",
                            "endswith": "پایان متن با"
                        },
                        "date": {
                            "eq": "تاریخ",
                            "neq": "تاریخ مخالف با",
                            "lt": "تاریخ قبل از",
                            "gt": "تاریخ بعد از"
                        },
                        "number": {
                            "eq": "برابر با",
                            "neq": "نامساوی با",
                            "gte": "بزرگتر از یا مساوی با",
                            "gt": "بزرگتر از",
                            "lte": "کوچکتر از یا مساوی با",
                            "lt": "کوچکتر از"
                        }
                    }
                });
        }

        if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
            kendo.spreadsheet.messages.toolbar =
                $.extend(true, kendo.spreadsheet.messages.toolbar, {
                    "addColumnLeft": "اضافه کردن ستون به چپ",
                    "addColumnRight": "اضافه کردن ستون به راست",
                    "addRowAbove": "اضافه کردن سطر به بالا",
                    "addRowBelow": "اضافه کردن سطر به پایین",
                    "alignment": "تراز",
                    "alignmentButtons": {
                        "justtifyLeft": "چپ چین",
                        "justifyCenter": "وسط چین",
                        "justifyRight": "راست چین",
                        "justifyFull": "میزان کردن",
                        "alignTop": "تراز بالا",
                        "alignMiddle": "تراز وسط",
                        "alignBottom": "تراز پایین"
                    },
                    "backgroundColor": "پس زمینه",
                    "bold": "برجسته",
                    "borders": "لبه ها",
                    "colorPicker": {
                        "reset": "بازنشانی رنگ",
                        "customColor": "رنگ دلخواه..."
                    },
                    "copy": "کپی",
                    "cut": "برش",
                    "deleteColumn": "حذف ستون",
                    "deleteRow": "حذف سطر",
                    "excelImport": "وارد کردن از اکسل...",
                    "filter": "فیلتر",
                    "fontFamily": "فونت",
                    "fontSize": "اندازه فونت",
                    "format": "قالب دلخواه...",
                    "formatTypes": {
                        "automatic": "خودکار",
                        "number": "عدد",
                        "percent": "درصد",
                        "financial": "پولی",
                        "currency": "واحد پول",
                        "date": "تاریخ",
                        "time": "زمان",
                        "dateTime": "تاریخ و زمان",
                        "duration": "مدت رمان",
                        "moreFormats": "قالب های بیشتر..."
                    },
                    "formatDecreaseDecimal": "کم کردن اعشاری",
                    "formatIncreaseDecimal": "زیاد کردن اعشاری",
                    "freeze": "ثابت کردن پنل ها",
                    "freezeButtons": {
                        "freezePanes": "ثابت کردن پنل ها",
                        "freezeRows": "ثابت کردن سطر ها",
                        "freezeColumns": "ثابت کردن ستون ها",
                        "unfreeze": "آزاد کردن پنل ها"
                    },
                    "italic": "مورب",
                    "merge": "ادغام سلول ها",
                    "mergeButtons": {
                        "mergeCells": "ادغام همه",
                        "mergeHorizontally": "ادغام افقی",
                        "mergeVertically": "ادغام عمودی",
                        "unmerge": "جداسازی"
                    },
                    "open": "باز کردن...",
                    "paste": "چسباندن",
                    "quickAccess": {
                        "redo": "دوباره انجام دادن",
                        "undo": "برگرداندن"
                    },
                    "saveAs": "ذخیره به عنوان...",
                    "sortAsc": "مرتب سازی صعودی",
                    "sortDesc": "مرتب سازی نزولی",
                    "sortButtons": {
                        "sortSheetAsc": "مرتب سازی صفحه از الف به ی",
                        "sortSheetDesc": "مرتب سازی صفحه از ی به الف",
                        "sortRangeAsc": "مرتب سازی بازه الف به ی",
                        "sortRangeDesc": "مرتب سازی بازه ی به الف"
                    },
                    "textColor": "رنگ متن",
                    "textWrap": "Wrap متن",
                    "underline": "خط کشیدن زیر",
                    "validation": "اعتبارسنجی داده..."
                });
        }

        if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
            kendo.spreadsheet.messages.view =
                $.extend(true, kendo.spreadsheet.messages.view, {
                    "errors": {
                        "shiftingNonblankCells": "به دلیل وجود احتمال از دست رفتن داده، امکان اضافه کردن سلول وجود ندارد. لطفا محل دیگری را برای اضافه کردن اتنخاب کنید یا داده را از انتهای برگه کاری خود حذف نمایید.",
                        "filterRangeContainingMerges": "ساخت یک فیلتر درون بازه دارای ادغام ممکن نیست",
                        "validationError": "مقدار وارد شده با قوانین اعتبارسنجی این سلول مطابقت ندارد."
                    },
                    "tabs": {
                        "home": "خانه",
                        "insert": "اضافه کردن",
                        "data": "داده"
                    }
                });
        }

        /* Slider messages */

        if (kendo.ui.Slider) {
            kendo.ui.Slider.prototype.options =
                $.extend(true, kendo.ui.Slider.prototype.options, {
                    "increaseButtonTitle": "زیاد کردن",
                    "decreaseButtonTitle": "کم کردن"
                });
        }

        /* TreeList messages */

        if (kendo.ui.TreeList) {
            kendo.ui.TreeList.prototype.options.messages =
                $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
                    "noRows": "رکوردی برای نمایش وجود ندارد",
                    "loading": "در حال بارگذاری...",
                    "requestFailed": "درخواست ناموفق بود.",
                    "retry": "تلاش مجدد",
                    "commands": {
                        "edit": "ویرایش",
                        "update": "به روزرسانی",
                        "canceledit": "انصراف",
                        "create": "ایجاد",
                        "createchild": "اضافه کردن رکورد فرزند",
                        "destroy": "حذف",
                        "excel": "صدور به Excel",
                        "pdf": "صدور به PDF"
                    }
                });
        }

        if (kendo.ui.TreeList) {
            kendo.ui.TreeList.prototype.options.columnMenu =
                $.extend(true, kendo.ui.TreeList.prototype.options.columnMenu, {
                    "messages": {
                        "columns": "انتخاب ستون ها",
                        "filter": "اعمال فیلتر",
                        "sortAscending": "مرتب سازی صعودی",
                        "sortDescending": "مرتب سازی نزولی"
                    }
                });
        }

        /* TreeView messages */

        if (kendo.ui.TreeView) {
            kendo.ui.TreeView.prototype.options.messages =
                $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
                    "loading": "در حال بارگذاری...",
                    "requestFailed": "درخواست ناموفق بود.",
                    "retry": "تلاش مجدد"
                });
        }

        /* Upload messages */

        if (kendo.ui.Upload) {
            kendo.ui.Upload.prototype.options.localization =
                $.extend(true, kendo.ui.Upload.prototype.options.localization, {
                    "select": "انتخاب فایل ها...",
                    "cancel": "انصراف",
                    "retry": "تلاش مجدد",
                    "remove": "حذف",
                    "uploadSelectedFiles": "آپلود فایل ها",
                    "dropFilesHere": "فایل ها را برای بارگذاری اینجا رها کنید",
                    "statusUploading": "در حال بارگذاری",
                    "statusUploaded": "بارگذاری شد",
                    "statusWarning": "هشدار",
                    "statusFailed": "ناموفق بود",
                    "headerStatusUploading": "در حال بارگذاری...",
                    "headerStatusUploaded": "انجام شد"
                });
        }

        /* Validator messages */

        if (kendo.ui.Validator) {
            kendo.ui.Validator.prototype.options.messages =
                $.extend(true, kendo.ui.Validator.prototype.options.messages, {
                    "required": "{0} اجباری است",
                    "pattern": "{0} قابل قبول نیست",
                    "min": "{0} باید بزرگتر از یا مساوی با {1}",
                    "max": "{0} باید کوچکتر از یا مساوی با {1} باشد",
                    "step": "{0} قابل قبول نیست",
                    "email": "{0} یک ایمیل قابل قبول نیست",
                    "url": "{0} یک آدرس قابل قبول نیست",
                    "date": "{0} یک تاریخ قابل قبول نیست",
                    "dateCompare": "تاریخ پایان باید بزرگتر از یا مساوی با تاریخ شروع باشد"
                });
        }

        /* kendo.ui.progress method */
        if (kendo.ui.progress) {
            kendo.ui.progress.messages =
                $.extend(true, kendo.ui.progress.messages, {
                    loading: "در حال بارگذاری..."
                });
        }

        /* Dialog */

        if (kendo.ui.Dialog) {
            kendo.ui.Dialog.prototype.options.messages =
                $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
                    "close": "بستن"
                });
        }

        /* Alert */

        if (kendo.ui.Alert) {
            kendo.ui.Alert.prototype.options.messages =
                $.extend(true, kendo.ui.Alert.prototype.options.localization, {
                    "okText": "تأیید"
                });
        }

        /* Confirm */

        if (kendo.ui.Confirm) {
            kendo.ui.Confirm.prototype.options.messages =
                $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
                    "okText": "تأیید",
                    "cancel": "انصراف"
                });
        }

        /* Prompt */
        if (kendo.ui.Prompt) {
            kendo.ui.Prompt.prototype.options.messages =
                $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
                    "okText": "تأیید",
                    "cancel": "انصراف"
                });
        }

    })(window.kendo.jQuery);


/***/ })

/******/ });