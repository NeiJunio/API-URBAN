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
-- Table structure for table `veiculo_usuario`
--

DROP TABLE IF EXISTS `veiculo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veiculo_usuario` (
  `veic_usu_id` int(11) NOT NULL AUTO_INCREMENT,
  `veic_id` int(11) NOT NULL,
  `usu_id` int(11) NOT NULL,
  `ehproprietario` bit(1) NOT NULL,
  `data_inicial` date NOT NULL,
  `data_final` date DEFAULT NULL,
  PRIMARY KEY (`veic_usu_id`),
  UNIQUE KEY `veic_usu_id` (`veic_usu_id`),
  KEY `veiculo_usuario_fk1` (`veic_id`),
  KEY `veiculo_usuario_fk2` (`usu_id`),
  CONSTRAINT `veiculo_usuario_fk1` FOREIGN KEY (`veic_id`) REFERENCES `veiculos` (`veic_id`),
  CONSTRAINT `veiculo_usuario_fk2` FOREIGN KEY (`usu_id`) REFERENCES `usuarios` (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veiculo_usuario`
--

LOCK TABLES `veiculo_usuario` WRITE;
/*!40000 ALTER TABLE `veiculo_usuario` DISABLE KEYS */;
INSERT INTO `veiculo_usuario` VALUES (1,1,1,_binary '','2020-01-01',NULL),(2,2,2,_binary '','2018-03-10',NULL),(3,3,3,_binary '','2022-08-25',NULL),(4,4,4,_binary '','2019-12-05',NULL),(5,5,5,_binary '','2021-06-15',NULL),(6,6,6,_binary '','2017-09-30',NULL),(7,7,7,_binary '','2013-12-12',NULL),(8,8,8,_binary '','2023-04-25',NULL),(9,1,9,_binary '','2020-08-10',NULL),(10,2,10,_binary '','2018-11-15',NULL),(11,3,11,_binary '','2022-07-20',NULL),(12,4,12,_binary '','2019-02-28',NULL),(13,5,13,_binary '','2021-06-05',NULL),(14,6,14,_binary '','2017-09-12',NULL),(15,7,15,_binary '','2013-03-30',NULL),(16,8,16,_binary '','2023-11-05',NULL),(17,1,17,_binary '','2020-12-18',NULL),(18,2,18,_binary '','2018-05-08',NULL),(19,3,19,_binary '','2022-09-17',NULL),(20,4,20,_binary '','2019-11-30',NULL);
/*!40000 ALTER TABLE `veiculo_usuario` ENABLE KEYS */;
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
