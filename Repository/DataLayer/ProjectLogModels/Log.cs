using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.DataLayer.ProjectModels
{
    public class Log
    {
        [BsonRepresentation(BsonType.Int64)]
        public long _id { get; set; }

        [BsonRepresentation(BsonType.String)]
        public string LogMessage { get; set; }

        [BsonRepresentation(BsonType.String)]
        public string ArchData { get; set; }

        [BsonRepresentation(BsonType.String)]
        public string Type { get; set; }

        [BsonRepresentation(BsonType.DateTime)]
        public DateTime CreateDate { get; set; }
    }
}
