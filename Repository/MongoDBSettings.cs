using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class MongoDBSettings
    {
        public string Name { get; init; }
        public string Host { get; init; }
        public int Port { get; init; }
        public string Admin { get; init; }
        public string Password { get; init; }
        public string ConnectionString => $"mongodb://{Admin}:{Password}@{Host}:{Port}";
    }
}
