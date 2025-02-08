-- MySQL dump 10.13  Distrib 8.4.3, for macos14 (arm64)
--
-- Host: localhost    Database: board
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_board_common`
--

DROP TABLE IF EXISTS `tbl_board_common`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_board_common` (
  `bc_no` int NOT NULL AUTO_INCREMENT,
  `bc_title` varchar(30) NOT NULL,
  `bc_description` varchar(1000) NOT NULL,
  `bc_create_dt` datetime NOT NULL,
  `bc_update_dt` datetime DEFAULT NULL,
  `b_no` int NOT NULL,
  `u_no` int NOT NULL,
  PRIMARY KEY (`bc_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_board_common`
--

LOCK TABLES `tbl_board_common` WRITE;
/*!40000 ALTER TABLE `tbl_board_common` DISABLE KEYS */;
INSERT INTO `tbl_board_common` VALUES (5,'첫 번째 테스트','첫 번째 테스트 게시물입니다.\n수정합니다.','2025-02-02 13:45:49','2025-02-02 14:48:46',1,1);
/*!40000 ALTER TABLE `tbl_board_common` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_board_list`
--

DROP TABLE IF EXISTS `tbl_board_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_board_list` (
  `b_no` int NOT NULL AUTO_INCREMENT,
  `b_name` varchar(20) NOT NULL,
  `b_id` varchar(5) NOT NULL,
  PRIMARY KEY (`b_no`),
  UNIQUE KEY `b_id` (`b_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_board_list`
--

LOCK TABLES `tbl_board_list` WRITE;
/*!40000 ALTER TABLE `tbl_board_list` DISABLE KEYS */;
INSERT INTO `tbl_board_list` VALUES (1,'자유 게시판','gen'),(2,'질문 게시판','qa'),(4,'자료요청 게시판','reqd'),(10,'it','it'),(12,'음악','music');
/*!40000 ALTER TABLE `tbl_board_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `u_no` int NOT NULL AUTO_INCREMENT,
  `u_id` varchar(10) NOT NULL,
  `u_pwd` varchar(300) NOT NULL,
  `ut_no` tinyint NOT NULL DEFAULT '2',
  PRIMARY KEY (`u_no`),
  UNIQUE KEY `u_id` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'vini','$2b$10$rQ3ZSXWbhOadyNZr6VcjyuugJ7SorvTvkXepdn/TqHxA66uIwLbmm',1),(2,'cocotiers','$2b$10$l3vpuaTUS4SxUUPZkxU36.g7321NLbZXnVia01aV6SjL.ypMnilBW',2),(3,'sujebi','$2b$10$a/IDpFpMVjS8leSjYpwCruvJ8.GPCjsHRdzs1pzcY9BpCYT2O6mla',2);
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user_type`
--

DROP TABLE IF EXISTS `tbl_user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user_type` (
  `ut_no` tinyint NOT NULL AUTO_INCREMENT,
  `ut_type` varchar(5) NOT NULL,
  PRIMARY KEY (`ut_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user_type`
--

LOCK TABLES `tbl_user_type` WRITE;
/*!40000 ALTER TABLE `tbl_user_type` DISABLE KEYS */;
INSERT INTO `tbl_user_type` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `tbl_user_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-06 13:19:37
