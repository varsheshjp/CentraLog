using DBService.MongoDB;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Repository.DataLayer.KafkaModels;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Confluent.Kafka;
using Repository.DataLayer.ProjectModels;
using Newtonsoft.Json;

namespace KafkaConsumer
{
    public class ConsumerService : BackgroundService
    {
        private readonly IMongoDBService _projectDBService;
        private readonly KafkaSettings _kafkaConfig;
        private readonly IConsumer<Null, string> _log_consumer;
        private readonly CancellationTokenSource _cancel;
        public ConsumerService(IMongoDBService _db, IConfiguration _config)
        {
            _kafkaConfig = _config.GetSection("KafkaSettings").Get<KafkaSettings>();
            var _kConfig = new ConsumerConfig
            {
                GroupId = _kafkaConfig.GroupId,
                BootstrapServers = _kafkaConfig.ServerUri,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };
            _projectDBService = _db;
            _log_consumer=new ConsumerBuilder<Null, string>(_kConfig).Build();
            _cancel = new CancellationTokenSource();
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _log_consumer.Subscribe(_kafkaConfig.Topic);
            while (!stoppingToken.IsCancellationRequested)
            {
                var task = await Task.Run<string>(()=> _log_consumer.Consume(_cancel.Token).Message.Value);
                KafkaIncomingLogModel log = JsonConvert.DeserializeObject<KafkaIncomingLogModel>(task);
                Log linsertablelog = new Log() { _id = 0, LogMessage = log.LogMessage, ArchData = log.ArchData, Type = log.Type, CreateDate = log.created };
                string projectId = log.projectId;
                var flag = await _projectDBService.checkExistProjectById(projectId);
                if (flag)
                {
                    await _projectDBService.addLog(linsertablelog, projectId);
                }
                else {
                    Console.WriteLine("Messaged can not be insertated due to wrong projectId");
                }

            }
        }
    }
}
