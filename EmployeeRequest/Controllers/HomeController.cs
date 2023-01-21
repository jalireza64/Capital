using System;
using System.Web.Mvc;
using App_Resources;
using EmployeeRequest.Infrastracture.BaseClasses;
using EmployeeRequest.Infrastracture.Enums;
using EmployeeRequest.Infrastracture.Helpers;
using EmployeeRequest.SpClasses;
using System.Linq;
using System.Collections.Generic;
using EmployeeRequest.Repository;
using EmployeeRequest.ViewModel;

namespace EmployeeRequest.Controllers
{

    public partial class HomeController : BaseController
    {
        #region HttpGet Methods
        public virtual ActionResult Index()
        {
            return View();
        }

        #endregion

        [HttpPost]
        public virtual ActionResult GetShareholder()
        {
            var loginResult = (LoginResultModel)Session["LoginResult"];
            var shareholder = ShareholerRepository.GetShareholder(loginResult.ShrhCode);
            var result = shareholder.Select(t => new
            { t.bbs_code,
                t.share,
                t.cert_no,
                t.comp_id,
                t.credit_amnt,
                t.father,
                t.mobile,
                t.name,
                t.nat_code,
                t.pay_amnt,
                t.print_flag,
                t.shrh_code,
                t.spri_amnt,
                t.spri_qunt,
                t.surname,
                t.s_address,
                t.s_postal_code,
                t.pay_id,
                t.kind,
                
                t.company.address,
                t.company.company_name,
                t.company.cap_percent,
                t.company.cap_amnt,
                t.company.pre_cap_amnt,
                t.company.reg_no,
                t.company.national_code,
                t.company.postal_code,
                t.company.tel,
                t.company.share_amnt,
                t.company.form_type,
                t.company.form_path,
                t.company.link_add_1,
                t.company.link_add_2
            }).FirstOrDefault();

            if (result == null)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(result);
        }

        [HttpPost]
        public virtual ActionResult GetCurrentDate()
        {
            var currentDate = DateTimeHelper.ToPersianDate(DateTime.Now);
            var last1WeekDate = DateTimeHelper.ToPersianDate(DateTime.Now.AddDays(-7));
            var last1MonthDate = DateTimeHelper.ToPersianDate(DateTime.Now.AddMonths(-1));
            var last1YearDate = DateTimeHelper.ToPersianDate(DateTime.Now.AddYears(-1));
            var beginOfMonthDate = DateTimeHelper.ToBeginOfMonth(DateTime.Now);
            var beginOfYearDate = DateTimeHelper.ToBeginOfYear(DateTime.Now);
            var result = new
            {
                currentDate,
                last1WeekDate,
                last1MonthDate,
                last1YearDate,
                beginOfMonthDate,
                beginOfYearDate
            };

            if (result == null)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(result);
        }

        [HttpPost]
        public virtual ActionResult GetLoginResult()
        {
            var loginResult = Session["LoginResult"];         
            return Json(loginResult);
        }
    }
}

