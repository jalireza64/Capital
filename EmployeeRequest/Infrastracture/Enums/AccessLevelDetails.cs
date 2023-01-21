using System.ComponentModel;

namespace EmployeeRequest.Infrastracture.Enums
{
    public enum AccessLevelDetails
    {
        [Description("کاربران")]
        DashboardUsers = 1000,

        [Description("سطح دسترسی")]
        DashboardAccessLevels = 1001,

        [Description("گزارش نوسان قیمت سهام")]
        Rpt43 = 1002,

        [Description("گزارش پرداختی به سهامدار")]
        Rpt0702 = 1003,

        [Description("گزارش ترکیب سهامداران")]
        Rpt14 = 1004,

        [Description("گزارش تعداد سهامداران به تفکیک درصد سهام")]
        Rpt05 = 1005,

        [Description("گزارش خریداران بیشترین سهم")]
        RptShrMaxBuyer = 1006,

        [Description("گزارش فروشندکان بیشترین سهم")]
        RptShrMaxSeller = 1007,

        [Description("گزارش نوسان گیران سهام")]
        RptShrSellerBuyer = 1008,

        [Description("گزارش پرداخت سهامداران در افزایش سرمایه")]
        RptShrAmntCap = 1009,

        [Description("گزارش تخصیصی به سهامداران")]
        Rpt0702Assign = 1010,

        [Description("گزارش عملکرد کاربران")]
        RptShrUserTask = 1011,

        [Description("گزارش تعداد و حجم معاملات")]
        RptShr44 = 1012,

        [Description("گزارش وضعیت معاملات ماه")]
        RptShrSeason = 1013,

        [Description("گزارش وضعیت معاملات فصل")]
        RptShrSeasonGroup = 1014,

        [Description("گزارش وضعیت کارگزاری ها")]
        RptShr44Agent = 1015,
    }
}