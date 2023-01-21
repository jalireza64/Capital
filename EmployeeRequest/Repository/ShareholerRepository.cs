using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using EmployeeRequest.ViewModel;
using EmployeeRequest.Infrastracture.Helpers;
using EmployeeRequest.Infrastracture.Enums;
using App_Resources;

namespace EmployeeRequest.Repository
{
    public class ShareholerRepository
    {
        public static List<shareholder> GetShareholder(string shrhCode)
        {
            using (var context = new capitalEntities())
            {
                var shareholderPerson = context.shareholders.Include(t=>t.company).Where(t => t.shrh_code == shrhCode).ToList();
                return shareholderPerson;
            }
        }
        public static bool SetPrintFlag(shareholder shareholder)
        {
            // modify
            using (var db = new capitalEntities())
            {
                var shareholders = db.Set<shareholder>();
                db.shareholders.Attach(shareholder);
                db.Entry(shareholder).State = EntityState.Modified;
                var result = db.SaveChanges();
                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}