using System;
using System.Text;
using System.Web.Mvc;
using System.Linq;
using App_Resources;
using EmployeeRequest.Infrastracture.ActionFilters;
using EmployeeRequest.Infrastracture.ActionResults;
using EmployeeRequest.Infrastracture.BaseClasses;
using EmployeeRequest.Infrastracture.Enums;
using EmployeeRequest.Infrastracture.Exceptions;

using System.Configuration;
using System.ComponentModel.DataAnnotations;
using EmployeeRequest.ViewModel;
using EmployeeRequest.BaseClasses;
using System.Data.Entity;
using EmployeeRequest.SpClasses;
using System.Collections.Generic;
using DeviceId;
using System.Net.Http;
using EmployeeRequest.Infrastracture.Config;
using EmployeeRequest.Repository;

namespace EmployeeRequest.Controllers
{
    public partial class AccountController : BaseController
    {

        [HttpPost]
        public virtual ActionResult GetAllCompany()
        {
            var companies = CompanyRepository.GetAllCompany().Select(t => new { t.company_name, t.comp_id });
            return Json(companies);
        }

        [HttpPost]
        public virtual ActionResult GetCompanyLoginMessage(decimal compId)
        {
            var loginMessage = CompanyRepository.GetCompany(compId).Select(t => new { t.login_message}).FirstOrDefault();
            return Json(loginMessage);
        }

        [HttpPost]
        [ValidateModelFilter]
        public virtual ActionResult Login(LoginModel loginModel)
        {
            var username = AesEncryptDecryptor.Decrypt(loginModel.Username);
            var password = AesEncryptDecryptor.Decrypt(loginModel.Password);
            var captchaText = AesEncryptDecryptor.Decrypt(loginModel.CaptchaText);
            var compId = Convert.ToDecimal(AesEncryptDecryptor.Decrypt(loginModel.CompId));

            if (string.Equals(captchaText, Session["CaptchaString"].ToString(), StringComparison.CurrentCultureIgnoreCase))
            {
                shareholder shareholderObject = new shareholder();
                using (var context = new capitalEntities())
                {
                    var loginQuery = context.shareholders;
                    shareholderObject = loginQuery.Where(t => t.bbs_code.Replace("ك", "ک").Replace("ي", "ی") == username && (t.cert_no == password || t.nat_code == password) && t.comp_id == compId).ToList().FirstOrDefault();

                    if (shareholderObject == null)
                        return Json(ResponseType.Failed, MessagesLibrary.InvalidUsernameOrPassword);

                    var LoginResult = new LoginResultModel
                    {
                        Name = shareholderObject.name,
                        Family = shareholderObject.surname,
                        BBSCode = shareholderObject.bbs_code,
                        ShrhCode = shareholderObject.shrh_code
                    };
                    Session.Add("LoginResult", LoginResult);
                }

                return Json(ResponseType.Ok, "");
            }
            else
            {
                return Json(ResponseType.Warning, string.Format(MessagesLibrary.SelectedValueIsInvalid, CaptionsLibrary.CaptchaText));
            }
        }

        [HttpPost]
        public virtual ActionResult Logout()
        {
            Session["LoginResult"] = null;
            return Json(ResponseType.Ok, "");
        }

        public virtual CaptchaImageResult ShowCaptchaImage()
        {
            return new CaptchaImageResult();
        }

        public virtual ActionResult SessionExpired()
        {
            var sessionExpired = Session["LoginResult"] == null ? true : false;
            return Json(sessionExpired);
        }

        #region private methods

        [HttpGet]
        public virtual ActionResult GetPassRegexProps()
        {
            var regexPattern = ConfigurationManager.AppSettings["PassRegexPattern"];
            var regexError = ConfigurationManager.AppSettings["PassRegexError"];
            return Json(new
            {
                RegexPattern = regexPattern,
                RegexError = regexError,
            }, JsonRequestBehavior.AllowGet);
        }

        #endregion

        [HttpPost]
        public virtual ActionResult GetCompanyLogo()
        {
            var data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAAFcCAYAAACZTW+eAAAACXBIWXMAAAsSAAALEgHS3X78AAARXUlEQVR4Ae2dT1IbxxeAx67s4+xVJbLR1uQEwScwOYHxCX74BMEniDiB4QSBEwROELTVJkyV9kEn4FdN3uBm0EijmZ7u1/O+r4rCxn8Qmq/fvH79pvvN4+NjAWCRt1x1sAryg1mQH8yC/GAW5AezID+YBfnBLMgPZkF+MAvyg1mQH8yC/GAW5AezID+YBfnBLMgPZkF+MAvyg1mQH8yC/GAW5AezID+YBfnBLMgPZkF+MAvyg1mQH8yC/GAW5AezID+YBfnBLMgPZkF+MAvyg1mQH8yC/GAW5AezID+YBfnBLMgPZkF+MAvyg1mQH8yC/GAW5Aez/MClj89qOntXFMXhhm/svvauwwu6K4riofa1h0m5vMvh/UjFm8fHR5s/eWBW09lBURQHIm8lti+z+/WPCV/iwhsg9/JReAPH3GBB/j3wBD+sfZ5m80O041b+VjUwnj9PymX9DpMtyN/Aajo7FMmrj19VvtA0VHeRG29wZDcwkP97RHeCHyF6L9bVQJC0yg2IG60v1qT8IvuR9zG2tEUbi2owyN1CxV3CjPyr6exYZD9GdhUsvLvETYrJ9mjl96K7k/2jgpcE21lXdwUZDIOnS6OSX4R3sp8URfFewUuC7lSDwX1cTcrlfej3chTyr6azEyL86CndIJC7wlWIHzZb+SXKn0qUT7l4BPFZy0C46jMQspN/NZ0difREeSi8gTDfd9Kcjfwi/Rk1eNiCS43mRVFctCmlqpcf6aED1d3gbNtEWa38SA+B+Dopl2eb/it18ku7r7t1fVLwcmAcuAW1o3oqpOphltV0dirL4IgPIXkv6wUvUBH5pYPygoUpGJjzSbk8rb5FcvlX05nLx35P+iLAEh+q1olkjzHKItUV0R4icyY9X2kiv3RYXrAyC4n42ZVAo094V9OZq+T8ifiQkKe8P1raIyXMK+r2oICntCdK5Jdqzh3igxKe5pmD5/wi/g1pDijjw6CRX/rsER9UMljOL+J/47KDUg4HifyIDxnwLrj8iA+5EFR+mdzOufqQA8Hkp6oDuRFEfm8BC/EhF+5CRf4bdkGDzHjoLb/06tCZCblx32uFV7oz/+SyQ25MyuWbzpFf+vEvuOqQIe6Z3l4TXia4kCtPT3J1kl8ePSTPh1x52tlt75xf6vl/c9khY35y25h0ifzk+ZAzi2r/nr3kl311SHcgZ56Dd2v5ZRV347ZvABnxvKX5PpF/TnUHMufa37i2lfwyyWULQcidF/PVtpGfNmXInbJ+istO+WWrcHZdgNx5NV9t8wwvk9zhqI7x38Q7KmvBcFH/VYl+q/xE/a3cyh8+VCuGtV8//X6ow5Xl2vw1xP89Qk42/Ui7Ir/lqF96R+Y/VP0gMQ5HhqBcN12zRvmlwmMh6q+rU79F9nsEHw3ral/OTWyL/I3/KHNuvWPu74Y42TsShyO9PiE52XZ9N8ovq7ljqetfV7KPLKK/U/AaNHO564Dqpsi/cYKQCaV3Ojfpi05uZcHpQO5gB4ErW7eTcrnT4bHIv5A38yrjNMYSN5tKjzLPrAbDkfx635aa67b+vpJfHk/Mob5cesfOI/wIkLLwi9Kw+FgNhF1FmBcHzu1iU+TXPtG9FeG35nMwDiSwvbhLyBpH9fGrRPv5vmnuJvmPlL5rl7uOkwcbiOS953Mv5Fea8iD9+Ghq6YhKPfIfK3qb3a3sFOlHySAtH/tSl19DylPK4gRlyu0QFHpSb2lOLf+5m9EjfiuQvyfPkV9qrKkeU3Q9GMdIDzHxI3+qqL8g2ptD3YQ3RaOUE/+o2kcFbDDUMw774kf+2PIjPiTFlz9mfR/xITlP8stycSzWiA8aqCL/QcTXcoz4pim1/PCx5b+kqmMeNesTlfwxJrtbn6eEvWGRqyeV/DEeiZuT7oSDnqf+VPLH2KWBff1BFcFOYN/BgkgFgp6cX3r4h4anrqBC1YQ3hvwqlrMBfGKlPUx0QR1v2fwIrPKWbe+yRs1q6R6oSYFjpT3cXYYhxwqamhQ4lvzcXUAdseTXtCsEwBOx5H8faT0BoDWx5C8y3/kZAqGpqzem/Key7z+ACmLK/yMtzcFh5bwHMeV3/C77A0EYWDnvQWz5C1qbTbPW9MOnkN9VfhgANlGVpqWQ3/FpNZ1R/YGkpJLf8Y0BAClJKX/BAOgN1Z4epJa/YAD0gmpPD96GONsoAN+YBJtA1Z5NGiJ/hZsE37AKDLF4q6wn3G2hcsdCGMTgrcItRaZFUfy9ms7OFLwW7ZjN+VfTWe82+Srt0fg43O+SBtEK3YCWQx5iI070Do6V/Fofh6vSIBrixkEoz85CnCdRya9552TXDfqH3AWYC+RNb/nlLIlPId4F7ZHf51eZC8ypCNlEgt/z7n99g2EOkb/O/9xgJRWyhQS8i9pxub2C4JP8UvFR1W66gyoVumd1uLhV8BoGRSL8fehz4/xFrhxPTJnK6jCDYKRISfOm4YD0p3S9axrsy5/zTsoMggzY5+F1J7Sb3xVF8WeD+P4BHZ1S4Nwjfx1/EPDAfKZIRedO5ndt6BTwnuWXUbQYyfvnBsEfMjGej3yhbDSrvO46raYzl4H8JddwG4vie8qz6+9upN7YNrbOyh8levzj3tQQS+IKyX6VV1Ict3D1T1EUH1v+s2rQd76mP9R+fyURc4y4N/Xjajor5eecc1RSWiRqn8rHxrx+C1Wa3vkA9ReRX2S4zuGN68HUuxu41okT5gZxkfTGZRn/uh6uDuIX3sLsUdcy/aZ+fksPlbi68Td3ESQtYiAMx8Klna5NRdKbvi0KVev7tGvq90r+Sbm8yvTQg758zHQg5JLzv5eyZYhjb9fS0Vrl+53S16YnuebdX9co8AfCjZRNtVaMLPb0V/l+L/nfPD4+vvqiRLz7jrnYmKkmy+7Nv9FworzUxP8a9bv+mi9yHf6RP/nQZffnjfIX/72pZzIZgWYW1UBINRiMyv+LTHSryuRPXd77bfIT/ffHHwx3MUqpcp3+Hfr7KKKclEtXLbqXye7T77u8vEb5C6J/CNYyIb2Rz4MMiNV01nwRx8e5VCT/lp/sclIuO7U3bJVf3tj7rsvH0Mit3FXvZVA89DmxxJj8v0nKU/X9fJ6Uy07l+TbyH0uJCuKwkArOg1fGfNhR0rSS81cpz4OXjnfK94s28hf/DYCbQPVZgD6cSxD4Jv/H9aRcBuvtaeJEvimTX0jJvNZ636sbodV2hTJJYxMpSImbJx1488+1dCN0pvVenZNyObfwvCio5aIWgHv3oO27Ue1xZg+6wzionPPnnb1bcPaSX2bVY3wgBHRzUZP9OsR6yd5blEs9+guyQCRc1D+sFVuCNF62KnVuQh5GCLJtHMAe3E7KZeent3w6H04hS8pMgCE2waqOfU9mOR7Rjg+gn9s+bSB1eskvE+AjBgBEIuhaU+8zuRgAEInLkFG/CHUgHQMABmbddUvCbQQ7jdEbAGPf+gTiczrEU3KdS53boAwKAenVubmNQc7hlTLo5yH+bzDFuusmtG0Y7BBqebrmF3qBoAfHQ24KMOgJ7LKx0AHzAOjAl9DVnTqD5PybkDO0znggBlrQ+aH0fYgmf/H98OALHomELQTr3dnFoGlPHdeGKj/YF+YCsIFFzJb5qJHfR+4C8z0OI4Bx48Q/irnrXTL5K2S7vQv2BjJNdPELDfJXyO5wXU7ogLxJIn6hSf6i/zE1kB9RqjpNqJK/QuYDZ7RIjJqvk3KZdDsclfJXyCA44U4wKtaycpv83GfV8ldIOnTHpDh73Er/iYZDPYo9titMzSHiZ89vfXdYC03URa4esFVi3pTaxC9ykF/WAWiHyBuVh33nEPmJ+jAIquUn6sOQaI/8RH0YDLXyE/VhaDRH/uBbVQD4qJRfVnZpdYZB0Rr5yfVhcNSt8EorQ+4HYHyWdox3spFX4X2u7zUPidDY3nCcuRyXtUORNzZwySA/lN/6v644lK9vg4JADzTKn3PKs2g7UZfmLn9g9F7+X01nc+9kck2oaGSroyrnl/Jmrg1s66E3WWqBSsl2nB6fDG0T3mRP9QTgJMQhaRAPNfJnPtE9V9K1qDLCakVT5M91oruYlEstC3Ja0x6VaJM/NwbdRRiGRYX8kvI0rehq3tntVDbj1QJzjj3QEvmbov6t4lToulbPTw4T7v3QLn/yJ/wbKEl38ie5/FtSntsWK5ypULMDAXRHQ+RvivpnXj+MJs417DmzBY0nYrLI1cAmwRfyhr1X8Pp8Fhm0X2i8I9He0MCmyD9XGvVJd0ZEUvlX09mm9t5Sqija5P+qrKwJPUkd+TcJfrHlz1KxSL2p6h5wZ2pJavk3pTwXUgHSlO/nVNbk7tSS1PLXH8a4loUaTVGfdGekJJNfevfraEt5ckp3YE9SRv76Y3trry1Yi/ys4oaBvTpr1AX3+2Q05PvnmaY76hbgtPYcaYr8T1G/IR2KTcn2KeMnifxSzfGf1V17LQMa5GcxywCpIv/GqC+klv9aee/OLhi0LUklf11wX7b6wIhJ9k9mUZZtj5bI/yR/Q7tDTM5Id+yQSv4D79cLrxqQMuq71zFP+P0hMqnk90uZfsqTMt8fU02/VPAaKm51vIzXRJdfth/38XPUVJE/15p+EzzL24IUkb8uvx/5Uyxuranp2ySF/H50X1f5fsLFLSa5Rkkhv/9QeuoSZznSSW7O6xTRSJ32pM73aVwzTGr5bxq+HoPbzFdyt0Hkb0Hqh1n8qkTsU0ZGO8mVQX2t4KUUmgdiysjvT3Zjpzy59++04UT5PqfJSSF/1c3p5/uxU57Rn/ErFSxWrLeQMu1JNdm9NLSh65zo30xK+f3aekz5zSxoSfTnJPsGUsrv59yxNqS9tbaNt2wApra/JiVatiiPVemx2saQcj1DbbBJnvNvaHQbijHX9bcid7uvib498tfx+mliya/qFJXYyP5Dmlqdk6Mh7Ykhf6ntCKFE0L3qkUp+/wCFGPJT72by+4pU8scucxL1v0P0FzSkPUOXOS/p1/+OTPovI35LJrwe9dvu0GkPUf810aK/5nUVDZF/2uLvdKW0Wt7chggZM/qrJIX8MSMBE91mzN8Rxy7/VYu/YxK5I5qu/CSVf+CH1s318XTAdOVnzJHf/G19FxGiv+oV5ejyR5yAkvK0Y8ggofrOm6raUz3IMlT9/Zrafjssr/omlX/ALQKJ+nswKZdu7vWztfJnKvmHTn2Qf09ccWBSLl3f/wcrjz4mkb9WhQk9KVqQ8nRH5mSHtebDUaJhhbdKfUJFG6o8PZHgdBzgmjDh3cGdbLAUqruTdoYAyADou0KO/DuYy+mH7o360vP/WnMmVVBG3R6SXH6Xn1c5uuyY3KfiwEQ3IHJdRlsB0rJ7wzNSceg62SLlCc9oWyDUyS8cdZhsLYj84ZF0dJSVH5Xyy+32cI+VR3dxjihxDoYfVPYJSqqvx5vHx0cFL6MZ6fw8lsFwsOHhF7dOcIj4cVhNZ277wz9afrMPmh8mUi8/6GM1nd23fAJPtfxac37QzSiOc0J+2BtlJ790BvmhK6ctJr+q52HID53w2h9cweFzURQ/yedntK+2M+GFoKymM9dY+Kn4T/43mt9dIj+EJpsVYeSHoEg6dJ7DqjBpD5iFyA9mQX4wC/KDWZAfzIL8YBbkB7MgP5gF+cEsyA9mQX4wC/KDWZAfzIL8YBbkB7MgP5gF+cEsyA9mQX4wC/KDWZAfzIL8YBbkB7MgP5gF+cEsyA9mQX4wC/KDWZAfzIL8YBbkB7MgP5gF+cEsyA9mQX4wC/KDWZAfzIL8YBbkB7MgP5gF+cEsyA9mQX4wC/KDWZAfzIL8YBbkB7MgP5gF+cEsyA9mQX4wC/KDWZAfzIL8YBbkB7MgP5gF+cEsyA9mQX4wC/KDWZAfzIL8YBbkB7MgP5gF+cEsyA9mQX4wC/KDWZAfzIL8YBbkB5sURfF/VrKwQYb9Y20AAAAASUVORK5CYII=";
            return Json(data);
        }

        [HttpPost]
        public virtual ActionResult ShowCaptchaImageInByte()
        {
            var captchaImageResult = new CaptchaImageResult();
            var base64Image = captchaImageResult.GetCaptchaImageAzByte(ControllerContext);

            return Json(ResponseType.Ok, String.Empty, base64Image);
        }
    }
}