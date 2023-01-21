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
    public class CompanyRepository
    {
        public static List<company> GetAllCompany()
        {
            using (var context = new capitalEntities())
            {
                var companies = context.companies.ToList();
                return companies;
            }
        }

        public static List<company> GetCompany(decimal compId)
        {
            using (var context = new capitalEntities())
            {
                var companies = context.companies.Where(t=>t.comp_id == compId).ToList();
                return companies;
            }
        }
    }
}