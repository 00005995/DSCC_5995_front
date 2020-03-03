using System.Web;
using System.Web.Mvc;

namespace DSCC_CW1_5995_front
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
