-- MySQL dump 10.13  Distrib 5.7.16, for Linux (i686)
--
-- Host: localhost    Database: COUNTRIES
-- ------------------------------------------------------
-- Server version	5.7.16-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cities`
--

DROP TABLE IF EXISTS `Cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `country_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `city_id_UNIQUE` (`id`),
  KEY `fk_Cities_1_idx` (`country_id`),
  CONSTRAINT `fk_Cities_1` FOREIGN KEY (`country_id`) REFERENCES `Countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cities`
--

LOCK TABLES `Cities` WRITE;
/*!40000 ALTER TABLE `Cities` DISABLE KEYS */;
INSERT INTO `Cities` VALUES (1,'Kiyiv',1),(2,'Zaporizhya',1),(3,'Lviv',1),(4,'Amsterdam',3);
/*!40000 ALTER TABLE `Cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `City_lang`
--

DROP TABLE IF EXISTS `City_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `City_lang` (
  `id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `data_id_UNIQUE` (`id`),
  KEY `fk_City_lang_1_idx` (`city_id`),
  KEY `fk_City_lang_2_idx` (`language_id`),
  CONSTRAINT `fk_City_lang_1` FOREIGN KEY (`city_id`) REFERENCES `Cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_City_lang_2` FOREIGN KEY (`language_id`) REFERENCES `Languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `City_lang`
--

LOCK TABLES `City_lang` WRITE;
/*!40000 ALTER TABLE `City_lang` DISABLE KEYS */;
INSERT INTO `City_lang` VALUES (1,1,1),(2,1,2),(3,2,2),(4,3,1);
/*!40000 ALTER TABLE `City_lang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Countries`
--

DROP TABLE IF EXISTS `Countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `country_id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Countries`
--

LOCK TABLES `Countries` WRITE;
/*!40000 ALTER TABLE `Countries` DISABLE KEYS */;
INSERT INTO `Countries` VALUES (1,'Ukraine'),(2,'USA'),(3,'Netherlands');
/*!40000 ALTER TABLE `Countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Languages`
--

DROP TABLE IF EXISTS `Languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Languages` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `language_id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Languages`
--

LOCK TABLES `Languages` WRITE;
/*!40000 ALTER TABLE `Languages` DISABLE KEYS */;
INSERT INTO `Languages` VALUES (1,'Ukranian'),(2,'Russian'),(3,'English');
/*!40000 ALTER TABLE `Languages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-18 17:23:05
