using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DataLayer.ProjectDetailModels
{
    public class ProjectDetail
    {
        public string id { get; set; }
        public string name { get; set; }
        public DateTime created { get; set; }
        public DateTime updated { get; set; }
        public long logCount { get; set; }
        public string user_id { get; set; }
    }
}
