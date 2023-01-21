using System;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;

namespace EmployeeRequest.Infrastracture.Helpers
{
    public static class DateTimeHelper
    {
        public static string ToPersianDate(DateTime date)
        {
            using (var context = new capitalEntities())
            {
                var output = context.Database.SqlQuery<string>("select dbo.f_date_m2s(@param1)",
                    new SqlParameter("param1", date)).First();

                var result = output.Substring(0, 4) + "/" + output.Substring(4, 2) + "/" + output.Substring(6, 2);

                return result;
            }
        }

        public static string ToBeginOfMonth(DateTime date)
        {
            using (var context = new capitalEntities())
            {
                var output = context.Database.SqlQuery<string>("select dbo.f_date_m2s(@param1)",
                    new SqlParameter("param1", date)).First();

                var result = output.Substring(0, 4) + "/" + output.Substring(4, 2) + "/01";

                return result;
            }
        }

        public static string ToBeginOfYear(DateTime date)
        {
            using (var context = new capitalEntities())
            {
                var output = context.Database.SqlQuery<string>("select dbo.f_date_m2s(@param1)",
                    new SqlParameter("param1", date)).First();

                var result = output.Substring(0, 4) + "/01/01";

                return result;
            }
        }

        public static uint ToUtcSeconds(DateTime dateTime)
        {
            DateTime utc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return (uint) (dateTime - utc).TotalSeconds;
        }

        public static DateTime FromUtcSeconds(uint seconds)
        {
            DateTime utc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return utc.AddSeconds(seconds);
        }

        /// <summary>
        /// فاصله زمانی بین دو تاریخ به روز
        /// </summary>
        /// <param name="fromDateTime"></param>
        /// <param name="toDateTime"></param>
        /// <returns></returns>
        public static int DurationInDays(DateTime fromDateTime, DateTime toDateTime)
        {
            return (int)Math.Round((toDateTime - fromDateTime).TotalDays);
        }

        /// <summary>
        /// فاصله زمانی بین دو تاریخ به دقیقه
        /// </summary>
        /// <param name="fromDateTime"></param>
        /// <param name="toDateTime"></param>
        /// <returns></returns>
        public static int DurationInMinutes(DateTime fromDateTime, DateTime toDateTime)
        {
            return (int)Math.Round((toDateTime - fromDateTime).TotalMinutes);
        }

        /// <summary>
        /// فاصله زمانی بین دو تاریخ به ساعت
        /// </summary>
        /// <param name="fromDateTime"></param>
        /// <param name="toDateTime"></param>
        /// <returns></returns>
        public static int DurationInHours(DateTime fromDateTime, DateTime toDateTime)
        {
            return (int)Math.Round((toDateTime - fromDateTime).TotalHours);
        }

        public static string ToDateInText(this DateTime date)
        {
            return string.Format("{0}/{1:00}/{2:00}", date.Year, date.Month, date.Day);
        }

        public static string ToTimeInText(this DateTime date)
        {
            return string.Format("{0:D2}:{1:D2}", date.Hour, date.Minute);
        }

        public static string ToDateTimeInText(DateTime date, bool withSecond = false)
        {
            if (!withSecond)
                return date < new DateTime(1000, 1, 1, 1, 1, 1)
                    ? string.Empty
                    : string.Format("{0}/{1:00}/{2:00} {3:00}:{4:00}",
                        date.Year,
                        date.Month,
                        date.Day,
                        date.Hour,
                        date.Minute);
            return date < new DateTime(1000, 1, 1, 1, 1, 1)
                ? string.Empty
                : string.Format("{0}/{1:00}/{2:00} {3:00}:{4:00}:{5:00}",
                    date.Year,
                    date.Month,
                    date.Day,
                    date.Hour,
                    date.Minute,
                   date.Second);
        }

        public static bool HasConflict(DateTime firstStart, DateTime firstEnd, DateTime secondStart,
            DateTime seleconEnd)
        {
            var b1 = firstStart.Date;
            var e1 = firstEnd.Date;
            var b2 = secondStart.Date;
            var e2 = seleconEnd.Date;

            return b1 <= e2 && e1 >= b2;
        }

        public static bool HasConflictWithDateTime(DateTime firstStart, DateTime firstEnd, DateTime secondStart,
            DateTime seleconEnd)
        {
            var b1 = firstStart;
            var e1 = firstEnd;
            var b2 = secondStart;
            var e2 = seleconEnd;

            return b1 <= e2 && e1 >= b2;
        }

        public static bool ExHasConflictWithDateTime(DateTime firstStart, DateTime firstEnd, DateTime secondStart, DateTime seleconEnd)
        {
            var a = firstStart;
            var b = firstEnd;
            var c = secondStart;
            var d = seleconEnd;

            var result = (c > a) && (c < b)
                         || (d > a) && (d < b)
                         || (a > c) && (a < d)
                         || (b > c) && (b < d);
            return result;
        }

        public static string ToHourAndMinute(Int64 minute)
        {
            var isNegative = minute < 0;
            minute = Math.Abs(minute);
            var span = TimeSpan.FromMinutes(minute);
            return string.Format("{2}{0}:{1:D2}", span.Days * 24 + span.Hours, span.Minutes, isNegative ? "-" : string.Empty);
        }

        public static string ToHourAndMinute(int minute)
        {
            var isNegative = minute < 0;
            minute = Math.Abs(minute);
            var span = TimeSpan.FromMinutes(minute);
            return string.Format("{2}{0:D2}:{1:D2}", span.Days * 24 + span.Hours, span.Minutes, isNegative ? "-" : string.Empty);
        }

        public static int ToMinute(string hourAndMinute)
        {
            try
            {
                var index = hourAndMinute.IndexOf('-');
                if (index >= 0)
                    hourAndMinute = hourAndMinute.Remove(index, 1);
                var splitted = hourAndMinute.Split(':').ToList();
                if (splitted.Count != 2) return 0;
                int hour;
                int minute;
                if (!int.TryParse(splitted[0], out hour)) return 0;
                if (!int.TryParse(splitted[1], out minute)) return 0;
                return (index >= 0 ? -1 : 1) * ((hour * 60) + minute);
            }
            catch (Exception)
            {
                // ignored
            }
            return 0;
        }

        public static string ToHourAndMinute(string minute)
        {
            return ToHourAndMinute(int.Parse(minute));
        }

        public static int OverlapValue(DateTime point1Begin, DateTime point1End, DateTime point2Begin, DateTime point2End)
        {
            var begin = (point1Begin > point2Begin) ? point1Begin : point2Begin;
            var end = (point1End < point2End) ? point1End : point2End;
            return end > begin ? (int)Math.Round((end - begin).TotalMinutes) : 0;
        }

        public static bool DateTimeInRange(DateTime? dateTimeInputBegin, DateTime? dateTimeInputEnd, DateTime dateTimeBegin, DateTime dateTimeEnd)
        {
            if (dateTimeInputBegin != null && dateTimeInputEnd != null)
            {
                if ((dateTimeInputBegin >= dateTimeBegin && dateTimeInputBegin <= dateTimeEnd) && (dateTimeInputEnd >= dateTimeBegin && dateTimeInputEnd <= dateTimeEnd) && (dateTimeInputEnd > dateTimeInputBegin))
                {
                    return true;
                }
            }
            else
            {
                return true;
            }
            
            return false;
        }

        /// <summary>
        /// زمان شروع ساعت
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime BeginOfHour(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, dateTime.Hour, 0, 0);
        }

        /// <summary>
        /// زمان پایان ساعت
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime EndOfHour(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, dateTime.Hour, 59, 59);
        }

        /// <summary>
        /// زمان شروع دقیقه
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime BeginOfMinute(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, dateTime.Hour, dateTime.Minute, 0);
        }

        /// <summary>
        /// زمان پایان دقیقه
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime EndOfMinute(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, dateTime.Hour, dateTime.Minute, 59);
        }

        /// <summary>
        /// زمان شروع روز
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime BeginOfDay(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, 0, 0, 0);
        }

        /// <summary>
        /// زمان پایان روز
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static DateTime EndOfDay(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, 23, 59, 59);
        }

        /// <summary>
        /// بر اساس یک رشته قابل تبدیل تاریخ مربوط را بر می گرداند
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static DateTime? CreateDateTime(string value)
        {
            DateTime fromDate;
            return !DateTime.TryParse(value, CultureInfo.GetCultureInfo("en-US"), DateTimeStyles.None, out fromDate) ? (DateTime?)null : fromDate;
        }

        public static bool IsValidTimeRange(DateTime beginTime, DateTime endTime, bool checkEquality = false)
        {
            return checkEquality ? beginTime.TimeOfDay <= endTime.TimeOfDay : beginTime.TimeOfDay < endTime.TimeOfDay;
        }

        public static DateTime MinDateTime()
        {
            return new DateTime(2014, 1, 1);
        }

        public static DateTime ToMiladiDate(string date)
        {
            try
            {
                var tokenDate = date.Split('/');
                var miladiDate = new DateTime(Convert.ToInt32(tokenDate[0]), Convert.ToInt32(tokenDate[1]),
                    Convert.ToInt32(tokenDate[2]), 0, 0, 0, 0, 0);
                return miladiDate;
            }
            catch (Exception)
            {
                return DateTime.Now;
            }
        }
    }

}
