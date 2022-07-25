using Repository.DataLayer.ProjectModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DataLayer.ProjectDetailModels
{
    public class LogInsertModel
    {
        public Log log { get; set; }
        public ProjectDetail project { get; set; }
    }
}
