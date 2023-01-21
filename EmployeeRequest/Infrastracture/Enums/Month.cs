using System.ComponentModel;

namespace EmployeeRequest.Infrastracture.Enums
{
    public enum Month
    {
        [Description("فروردین")]
        Farvardin = 01,

        [Description("اردیبهشت")]
        Ordibehesht = 02,

        [Description("خرداد")]
        Khordad = 03,

        [Description("تیر")]
        Tir = 04,

        [Description("مرداد")]
        Mordad = 05,

        [Description("شهریور")]
        Shahrivar = 06,

        [Description("مهر")]
        Mehr = 07,

        [Description("آبان")]
        Aban = 08,

        [Description("آذر")]
        Azar = 09,

        [Description("دی")]
        Dey = 10,

        [Description("بهمن")]
        Bahman = 11,

        [Description("اسفند")]
        Esfand = 12,
    }
}