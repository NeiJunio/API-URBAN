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
-- Table structure for table `veiculos`
--

DROP TABLE IF EXISTS `veiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veiculos` (
  `veic_id` int(11) NOT NULL AUTO_INCREMENT,
  `mod_id` int(11) NOT NULL,
  `veic_placa` varchar(10) NOT NULL,
  `veic_ano` varchar(4) NOT NULL,
  `veic_cor` varchar(15) NOT NULL,
  `veic_combustivel` varchar(20) NOT NULL,
  `veic_observ` varchar(200) NOT NULL,
  PRIMARY KEY (`veic_id`),
  KEY `veiculos_fk1` (`mod_id`),
  CONSTRAINT `veiculos_fk1` FOREIGN KEY (`mod_id`) REFERENCES `modelos` (`mod_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veiculos`
--

LOCK TABLES `veiculos` WRITE;
/*!40000 ALTER TABLE `veiculos` DISABLE KEYS */;
INSERT INTO `veiculos` VALUES (1,1,'ABC1234','2020','Prata','Diesel','Observacoes sobre o veiculo ABC1234 - caminhao'),(2,2,'DEF5678','2018','Preto','Diesel','Observacoes sobre o veiculo DEF5678 - caminhao'),(3,3,'GHI9012','2022','Branco','Diesel','Observacoes sobre o veiculo GHI9012 - caminhao'),(4,481,'JKL3456','2019','Vermelho','Flex','Observacoes sobre o veiculo JKL3456 - carro'),(5,934,'MNO7890','2021','Azul','Flex','Observacoes sobre o veiculo MNO7890 - carro'),(6,504,'PQR1234','2017','Prata','Flex','Observacoes sobre o veiculo PQR1234 - carro'),(7,1582,'STU5678','2013','Preto','Gasolina','Observacoes sobre o veiculo STU5678 - moto'),(8,1586,'VWX9012','2023','Branco','Flex','Observacoes sobre o veiculo VWX9012 - moto');
/*!40000 ALTER TABLE `veiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21 20:43:37
