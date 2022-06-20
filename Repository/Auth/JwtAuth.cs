using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Auth
{
    public class JwtAuth
    {
        public string ValidAudience { get; init; }
        public string ValidIssuer { get; init; }
        public string Secret { get; init; }
    }
}
