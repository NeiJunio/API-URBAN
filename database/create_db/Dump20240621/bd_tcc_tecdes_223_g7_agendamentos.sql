-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 10.67.22.216    Database: bd_tcc_tecdes_223_g7
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agendamentos`
--

DROP TABLE IF EXISTS `agendamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamentos` (
  `agend_id` int(11) NOT NULL AUTO_INCREMENT,
  `veic_usu_id` int(11) NOT NULL,
  `agend_data` date NOT NULL,
  `agend_horario` time NOT NULL,
  `agend_situacao` int(11) NOT NULL,
  `agend_observ` varchar(200) NOT NULL,
  PRIMARY KEY (`agend_id`),
  UNIQUE KEY `agend_id` (`agend_id`),
  KEY `agendamentos_fk1` (`veic_usu_id`),
  CONSTRAINT `agendamentos_fk1` FOREIGN KEY (`veic_usu_id`) REFERENCES `veiculo_usuario` (`veic_usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamentos`
--

LOCK TABLES `agendamentos` WRITE;
/*!40000 ALTER TABLE `agendamentos` DISABLE KEYS */;
INSERT INTO `agendamentos` VALUES (1,1,'2024-07-01','09:00:00',1,'Primeiro agendamento para o veículo 1 do usuário 1'),(2,2,'2024-07-02','10:00:00',1,'Primeiro agendamento para o veículo 2 do usuário 2'),(3,3,'2024-07-03','11:00:00',1,'Primeiro agendamento para o veículo 3 do usuário 3'),(4,4,'2024-07-04','08:00:00',1,'Primeiro agendamento para o veículo 4 do usuário 4'),(5,5,'2024-07-05','09:30:00',1,'Primeiro agendamento para o veículo 5 do usuário 5'),(6,6,'2024-07-06','10:30:00',1,'Primeiro agendamento para o veículo 6 do usuário 6'),(7,7,'2024-07-07','11:30:00',1,'Primeiro agendamento para o veículo 7 do usuário 7'),(8,8,'2024-07-08','12:00:00',1,'Primeiro agendamento para o veículo 8 do usuário 8'),(9,9,'2024-07-09','13:00:00',1,'Primeiro agendamento para o veículo 1 do usuário 9'),(10,10,'2024-07-10','14:00:00',1,'Primeiro agendamento para o veículo 2 do usuário 10'),(11,11,'2024-07-11','15:00:00',1,'Primeiro agendamento para o veículo 3 do usuário 11'),(12,12,'2024-07-12','16:00:00',1,'Primeiro agendamento para o veículo 4 do usuário 12'),(13,13,'2024-07-13','17:00:00',1,'Primeiro agendamento para o veículo 5 do usuário 13'),(14,14,'2024-07-14','09:15:00',1,'Primeiro agendamento para o veículo 6 do usuário 14'),(15,15,'2024-07-15','10:15:00',1,'Primeiro agendamento para o veículo 7 do usuário 15'),(16,16,'2024-07-16','11:15:00',1,'Primeiro agendamento para o veículo 8 do usuário 16'),(17,17,'2024-07-17','12:15:00',1,'Primeiro agendamento para o veículo 1 do usuário 17'),(18,18,'2024-07-18','13:15:00',1,'Primeiro agendamento para o veículo 2 do usuário 18'),(19,19,'2024-07-19','14:15:00',1,'Primeiro agendamento para o veículo 3 do usuário 19'),(20,20,'2024-07-20','15:15:00',1,'Primeiro agendamento para o veículo 4 do usuário 20'),(21,1,'2024-07-21','16:15:00',1,'Segundo agendamento para o veículo 1 do usuário 1'),(22,2,'2024-07-22','09:45:00',1,'Segundo agendamento para o veículo 2 do usuário 2'),(23,3,'2024-07-23','10:45:00',1,'Segundo agendamento para o veículo 3 do usuário 3'),(24,4,'2024-07-24','11:45:00',1,'Segundo agendamento para o veículo 4 do usuário 4'),(25,5,'2024-07-25','12:45:00',1,'Segundo agendamento para o veículo 5 do usuário 5'),(26,6,'2024-07-26','13:45:00',1,'Segundo agendamento para o veículo 6 do usuário 6'),(27,7,'2024-07-27','14:45:00',1,'Segundo agendamento para o veículo 7 do usuário 7'),(28,8,'2024-07-28','15:45:00',1,'Segundo agendamento para o veículo 8 do usuário 8'),(29,9,'2024-07-29','16:45:00',1,'Segundo agendamento para o veículo 1 do usuário 9'),(30,10,'2024-07-30','08:45:00',1,'Segundo agendamento para o veículo 2 do usuário 10');
/*!40000 ALTER TABLE `agendamentos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21 20:43:38
