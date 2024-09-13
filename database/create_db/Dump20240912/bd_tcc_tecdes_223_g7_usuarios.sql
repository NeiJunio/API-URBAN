CREATE DATABASE  IF NOT EXISTS `bd_tcc_tecdes_223_g7` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bd_tcc_tecdes_223_g7`;
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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `usu_id` int(11) NOT NULL AUTO_INCREMENT,
  `usu_nome` varchar(60) NOT NULL,
  `usu_cpf` char(14) NOT NULL,
  `usu_data_nasc` date NOT NULL,
  `usu_sexo` tinyint(4) NOT NULL,
  `usu_telefone` varchar(20) NOT NULL,
  `usu_email` varchar(80) NOT NULL,
  `usu_observ` varchar(120) NOT NULL,
  `usu_acesso` tinyint(1) NOT NULL,
  `usu_senha` varchar(256) NOT NULL,
  `usu_situacao` bit(1) DEFAULT NULL,
  PRIMARY KEY (`usu_id`),
  UNIQUE KEY `usu_id` (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'José Oliveira','321.654.987-00','1995-10-20',1,'(11) 5432-1098','jose@example.com','Observações sobre Jose Oliveira.',0,'jose789',_binary ''),(2,'João da Silva','111.222.333-44','1988-03-10',1,'(11) 2222-3333','joao@example.com','Observações sobre João da Silva.',0,'joao123',_binary ''),(3,'Maria Oliveira','555.666.777-88','1992-08-25',0,'(11) 4444-5555','maria@example.com','Observações sobre Maria Oliveira.',0,'maria456',_binary ''),(4,'Pedro Santos','999.888.777-66','1980-12-05',1,'(11) 7777-8888','pedro@example.com','Observações sobre Pedro Santos.',0,'pedro789',_binary ''),(5,'Ana Souza','777.888.999-11','1990-06-15',0,'(11) 9999-1111','ana@example.com','Observações sobre Ana Souza.',0,'ana123',_binary ''),(6,'Fernando Lima','444.555.666-22','1985-09-30',1,'(11) 8888-2222','fernando@example.com','Observações sobre Fernando Lima.',0,'fernando456',_binary ''),(7,'Mariana Silva','111.222.333-55','1998-12-12',0,'(11) 7777-5555','mariana@example.com','Observações sobre Mariana Silva.',0,'mariana789',_binary ''),(8,'Carlos Oliveira','222.333.444-66','1987-04-25',1,'(11) 5555-6666','carlos@example.com','Observações sobre Carlos Oliveira.',0,'carlos789',_binary ''),(9,'Patrícia Ferreira','888.777.666-99','1991-08-10',0,'(11) 2222-8888','patricia@example.com','Observações sobre Patrícia Ferreira.',0,'patricia123',_binary ''),(10,'Lucas Santos','777.666.555-11','1993-11-15',1,'(11) 9999-3333','lucas@example.com','Observações sobre Lucas Santos.',0,'lucas456',_binary ''),(11,'Amanda Lima','333.222.111-44','1989-07-20',0,'(11) 4444-7777','amanda@example.com','Observações sobre Amanda Lima.',0,'amanda789',_binary ''),(12,'Rafael Almeida','555.444.333-77','1995-02-28',1,'(11) 6666-9999','rafael@example.com','Observações sobre Rafael Almeida.',0,'rafael123',_binary ''),(13,'Laura Souza','999.888.777-22','1986-06-05',0,'(11) 7777-1111','laura@example.com','Observações sobre Laura Souza.',0,'laura456',_binary ''),(14,'Guilherme Oliveira','111.222.333-66','1990-09-12',1,'(11) 8888-4444','guilherme@example.com','Observações sobre Guilherme Oliveira.',0,'guilherme789',_binary ''),(15,'Juliana Silva','777.888.999-33','1984-03-30',0,'(11) 5555-2222','juliana@example.com','Observações sobre Juliana Silva.',0,'juliana123',_binary ''),(16,'Rodrigo Santos','444.555.666-88','1983-11-05',1,'(11) 6666-3333','rodrigo@example.com','Observações sobre Rodrigo Santos.',0,'rodrigo456',_binary ''),(17,'Bianca Ferreira','222.333.444-11','1994-12-18',0,'(11) 3333-8888','bianca@example.com','Observações sobre Bianca Ferreira.',0,'bianca789',_binary ''),(18,'Fernanda Oliveira','555.444.333-22','1997-05-08',0,'(11) 9999-2222','fernanda@example.com','Observações sobre Fernanda Oliveira.',0,'fernanda123',_binary ''),(19,'Marcos Souza','777.888.999-11','1982-09-17',1,'(11) 3333-4444','marcos@example.com','Observações sobre Marcos Souza.',0,'marcos456',_binary ''),(20,'Carla Lima','111.222.333-55','1996-11-30',0,'(11) 8888-9999','carla@example.com','Observações sobre Carla Lima.',0,'carla789',_binary ''),(23,'wesley Silva','444.555.111-00','1998-10-15',1,'(12) 2223-2222','wesley@example.com','Observações sobre Wesley.',0,'wesley1234',_binary ''),(24,'José Oliveira Pop','321.654.987-00','1995-10-20',1,'(11) 5432-1098','jose@example.com','Observações sobre Jose Oliveira.',0,'joliveira',_binary '');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-12 22:39:23
