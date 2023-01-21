using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web.Mvc;
using EmployeeRequest.Infrastracture.Helpers;


namespace EmployeeRequest.Infrastracture.ActionResults
{
    public class CaptchaImageResult : ActionResult
    {
        #region Overrided Methods

        public override void ExecuteResult(ControllerContext context)
        {
            FetchAndWriteCaptchaImage(context);
        }


        #endregion

        #region Private Methods

        private static void FetchAndWriteCaptchaImage(ControllerContext context)
        {
            var bmp = new Bitmap(100, 30);
            var g = Graphics.FromImage(bmp);
            g.Clear(Color.Navy);
            var randomString = GetCaptchaString(6);
            //if (context.HttpContext.Session != null)
            //    SessionSingleton.Current.CaptchaString = randomString;

            //add noise , if dont want any noisy , then make it false.
            var noisy = true;
            if (noisy)
            {
                var rand = new Random((int)DateTime.Now.Ticks);
                int i;
                var pen = new Pen(Color.Yellow);
                for (i = 1; i < 10; i++)
                {
                    pen.Color = Color.FromArgb((rand.Next(0, 255)), (rand.Next(0, 255)), (rand.Next(0, 255)));

                    var r = rand.Next(0, (130 / 3));
                    var x = rand.Next(0, 130);
                    var y = rand.Next(0, 30);

                    var m = x - r;
                    var n = y - r;
                    g.DrawEllipse(pen, m, n, r, r);
                }
            }
            //end noise

            g.DrawString(randomString, new Font("Courier", 16), new SolidBrush(Color.WhiteSmoke), 2, 2);

            var response = context.HttpContext.Response;
            response.ContentType = "image/jpeg";
            bmp.Save(response.OutputStream, ImageFormat.Jpeg);

            bmp.Dispose();
        }


        private static string GetCaptchaString(int length)
        {
            const int intZero = '1';
            const int intNine = '9';
            const int intA = 'A';
            const int intZ = 'Z';
            //var allowedChars = "ACDEFGHJKLMNPQRTUVWXY34679"; // excluded: 1 - l, B - 8, Z - 2, S - 5; do not use property - setter generates random text
            var allowedChars = "123456789"; // excluded: 1 - l, B - 8, Z - 2, S - 5; do not use property - setter generates random text
            var intCount = 0;
            var strCaptchaString = string.Empty;

            var random = new Random(DateTime.Now.Millisecond);

            while (intCount < length)
            {
                var intRandomNumber = random.Next(intZero, intZ);
                if ((((intRandomNumber < intZero) || (intRandomNumber > intNine)) &&
                     ((intRandomNumber < intA) || (intRandomNumber > intZ)))) continue;
                var randomChar = ((char)intRandomNumber).ToString();
                if (!allowedChars.Contains(randomChar)) continue;
                strCaptchaString = strCaptchaString + randomChar;
                intCount = intCount + 1;
            }
            return strCaptchaString;
        }

        #endregion

        #region Public Methods

        public string GetCaptchaImageAzByte(ControllerContext context)
        {
            var bmp = new Bitmap(100, 30);
            var g = Graphics.FromImage(bmp);
            g.Clear(Color.Navy);
            var randomString = GetCaptchaString(6);
            if (context.HttpContext.Session != null)
                context.HttpContext.Session["CaptchaString"] = randomString;

            //add noise , if dont want any noisy , then make it false.
            var noisy = true;
            if (noisy)
            {
                var rand = new Random((int)DateTime.Now.Ticks);
                int i;
                var pen = new Pen(Color.Yellow);
                for (i = 1; i < 10; i++)
                {
                    pen.Color = Color.FromArgb(
                        (rand.Next(0, 255)),
                        (rand.Next(0, 255)),
                        (rand.Next(0, 255)));

                    var r = rand.Next(0, (130 / 3));
                    var x = rand.Next(0, 130);
                    var y = rand.Next(0, 30);

                    var m = x - r;
                    var n = y - r;
                    g.DrawEllipse(pen, m, n, r, r);
                }
            }
            //end noise

            g.DrawString(randomString, new Font("Courier", 16), new SolidBrush(Color.WhiteSmoke), 2, 2);

            var stream = new System.IO.MemoryStream();
            bmp.Save(stream, ImageFormat.Bmp);
            var imageBytes = stream.ToArray();
            var base64Image = Convert.ToBase64String(imageBytes);
            bmp.Dispose();
            return base64Image;
        }


        #endregion
    }
}