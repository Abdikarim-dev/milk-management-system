-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2024 at 06:15 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `milk`
--

-- --------------------------------------------------------

--
-- Table structure for table `activeuser`
--

CREATE TABLE `activeuser` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activeuser`
--

INSERT INTO `activeuser` (`id`, `userId`) VALUES
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `type` varchar(191) NOT NULL,
  `note` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `milktank`
--

CREATE TABLE `milktank` (
  `id` int(11) NOT NULL,
  `desc` varchar(191) DEFAULT NULL,
  `quantity` decimal(65,30) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `limit` decimal(65,30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `milktank`
--

INSERT INTO `milktank` (`id`, `desc`, `quantity`, `createdAt`, `updatedAt`, `limit`) VALUES
(1, 'Waxaan ku shubayaa fuustada 146,000 kun oo Milli Letter ah', '150000.000000000000000000000000000000', '2024-06-10 16:09:45.257', '2024-06-12 14:21:08.485', '150000.000000000000000000000000000000');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `litre` decimal(65,30) NOT NULL,
  `price` double NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `milkTankId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `litre`, `price`, `userId`, `createdAt`, `milkTankId`) VALUES
(1, '500.000000000000000000000000000000', 15000, 2, '2024-06-10 21:56:06.887', 1),
(2, '500.000000000000000000000000000000', 15000, 6, '2024-06-10 21:57:17.326', 1),
(3, '500.000000000000000000000000000000', 15000, 4, '2024-06-10 21:58:27.573', 1),
(4, '1000.000000000000000000000000000000', 30000, 5, '2024-06-10 22:00:10.192', 1),
(5, '1000.000000000000000000000000000000', 30000, 4, '2024-06-12 07:15:03.182', 1),
(6, '1500.000000000000000000000000000000', 45000, 4, '2024-06-12 07:15:25.385', 1),
(7, '1000.000000000000000000000000000000', 30000, 4, '2024-06-12 07:15:39.331', 1),
(8, '2500.000000000000000000000000000000', 75000, 4, '2024-06-12 07:15:47.902', 1),
(9, '500.000000000000000000000000000000', 15000, 4, '2024-06-12 07:16:30.934', 1),
(10, '1000.000000000000000000000000000000', 30000, 5, '2024-06-12 08:21:26.374', 1),
(11, '1500.000000000000000000000000000000', 45000, 5, '2024-06-12 08:21:35.059', 1),
(12, '2000.000000000000000000000000000000', 60000, 5, '2024-06-12 08:21:52.767', 1),
(13, '500.000000000000000000000000000000', 15000, 5, '2024-06-12 08:22:03.729', 1),
(14, '10000.000000000000000000000000000000', 300000, 5, '2024-06-12 14:13:21.054', 1),
(15, '10000.000000000000000000000000000000', 300000, 4, '2024-06-12 14:13:48.293', 1),
(16, '10000.000000000000000000000000000000', 300000, 6, '2024-06-12 14:14:28.627', 1),
(17, '10000.000000000000000000000000000000', 300000, 6, '2024-06-12 14:15:04.710', 1),
(18, '2000.000000000000000000000000000000', 60000, 6, '2024-06-12 14:15:42.020', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fullname` varchar(191) NOT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `sex` enum('male','female') NOT NULL,
  `userType` enum('admin','user') NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `image` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullname`, `username`, `email`, `password`, `phone`, `sex`, `userType`, `createdAt`, `updatedAt`, `image`) VALUES
(2, 'Abdikarim Ismail Ali', 'abdikarim', 'abdikarim@gmail.com', '$2b$10$qNaeBP07nEuuz5hmPba8vuEfiOkPvvb4Lfky3YHbYhfdWl6H5jCBi', '+252617710604', 'male', 'admin', '2024-06-10 16:08:01.639', '2024-06-12 11:46:15.598', 'http://res.cloudinary.com/dlbba7vpc/image/upload/v1718192672/dj9r6kvo86p5adywbrpj.jpg'),
(4, 'Nafisa Hassan Jama', 'Nafisa', 'nafisa328@gmail.com', '$2b$10$sRtghq2p9whqa5I6Kdjk7exZX2qlWKTMAyMMTh6Lq2nuLnav0A9ga', '+2526179898989', 'female', 'user', '2024-06-10 16:13:27.615', '2024-06-12 11:14:38.477', 'http://res.cloudinary.com/dlbba7vpc/image/upload/v1718190100/o1cdqswalxwqre90q2nd.jpg'),
(5, 'Ramla Mohamed ', 'ramla', 'ramla328@gmail.com', '$2b$10$4USGWz6u7xktbChSYOwNmObZDxD/fVkY7RawHZ/xV0P82UnA2kvby', '+252617001122', 'female', 'user', '2024-06-10 16:14:45.358', '2024-06-10 16:14:45.358', NULL),
(6, 'Fatima Mohamed ', 'fatima', 'fatima328@gmail.com', '$2b$10$D/YxTNGBq2g1HCxE9Pgo8ux1tESxCfx1Co6RVl3HCyC1QDYio.vRS', '+252611000111', 'female', 'user', '2024-06-10 16:15:48.398', '2024-06-12 14:27:06.953', 'http://res.cloudinary.com/dlbba7vpc/image/upload/v1718202425/ymituxazt3i8tpcfri3v.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('07ca7df7-2d0e-4385-a851-80a8fe11fead', '60f0225279881a970d4c860223f7f7be716068d498a151ff42dfd970bebe8aef', '2024-06-10 14:31:37.184', '20240610105403_add_active_user_model', NULL, NULL, '2024-06-10 14:31:37.066', 1),
('24b0dd69-39df-4c74-8a0b-c39ab93b0d7d', '5449035fc8c7260479546dde8f5e0c98fdd19a08c247e2e63c0b564bd030727e', '2024-06-12 06:46:24.092', '20240612064623_updated_transaction_table_by_removing_created_at_column', NULL, NULL, '2024-06-12 06:46:24.060', 1),
('34205525-1804-47fb-8449-c399368dd226', 'ecf57dcb690af9041a6ce9a0556e9fcc2395bb16565f14d42f0483296605a0f3', '2024-06-12 16:10:50.139', '20240612161049_replaced_level_table_to_logs_table', NULL, NULL, '2024-06-12 16:10:50.045', 1),
('344e731c-5e55-4cf5-888e-f7beae8f9ff5', 'c2e17111bacd2e22ba7b3089ce86a4124ce8448817588d0f315c012481ed8fb4', '2024-06-10 14:31:36.954', '20240526062118_add_milk_tank', NULL, NULL, '2024-06-10 14:31:36.906', 1),
('65e41dc5-d802-41d2-aecd-e49af37417c1', '908935bb56136339384918f2e88823f1c6acd2b0ad142c015c7136edeb73e796', '2024-06-10 14:57:26.298', '20240610145725_update_activeuser_model', NULL, NULL, '2024-06-10 14:57:26.157', 1),
('695a0a8b-82d6-448d-9a88-11470592bf29', '7f49504589076278c557cd0e99ebaa4af3520a74cde0605e8fa5a93fba58d286', '2024-06-10 14:31:37.268', '20240610105542_add_active_user_model', NULL, NULL, '2024-06-10 14:31:37.187', 1),
('7bc1b4eb-3636-41da-a989-5782e7246350', '27095cf2c5fc102cebdcde3a98f51ee0ab2ea38cd25a20f77b346f406f004391', '2024-06-10 14:31:37.047', '20240603101710_add_tanklimit_to_milktank', NULL, NULL, '2024-06-10 14:31:37.034', 1),
('98425f47-1724-4230-9d17-61a0bad1a685', '50047ad3e2b320a41fc6fd02da884fd9318f4520d3efe4ec12b73ac7eb50bc86', '2024-06-10 14:31:37.063', '20240603110301_add_image_field_to_user', NULL, NULL, '2024-06-10 14:31:37.050', 1),
('c13d83c3-c146-439f-be99-f188085dffa6', '05b6bb26dedb854f1cfa2547ecb74213e429513c741382cf34d8d5b37c8a4805', '2024-06-10 14:31:36.903', '20240526060107_add_milk_tank', NULL, NULL, '2024-06-10 14:31:36.777', 1),
('d50a7d0f-94da-4db6-b149-45ad7fd1aa04', '1974b6d36e54067e70cc76496d91caf72885a0331499ca5c2e7258ed89cb2aa7', '2024-06-10 14:31:39.429', '20240610143139_update_activeuser_model', NULL, NULL, '2024-06-10 14:31:39.258', 1),
('e0d58d14-a040-4452-9ed8-cdf11556109b', 'a269f97bfccf349037f7d3f879660c55eb84b26f75c1b8bf55ee1fbccbb4166f', '2024-06-10 14:31:37.031', '20240603101307_add_tanklimit_to_milktank', NULL, NULL, '2024-06-10 14:31:36.957', 1),
('f21c477c-5ab1-435a-b5be-e431e6008bbe', '5ff4248ebfbce6c795af804e525b201f33efbbd8c60284ba7a23aec54312b9a7', '2024-06-10 14:31:36.775', '20240511101129_init', NULL, NULL, '2024-06-10 14:31:36.760', 1),
('fa6740d7-807d-4be6-a068-666fbe5cbf75', 'dfb55a7ee3b6e822375921941ffcf6b494289544a295e07c66cd1047ac4c0be9', '2024-06-10 14:31:36.757', '20240504113658_init', NULL, NULL, '2024-06-10 14:31:36.490', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activeuser`
--
ALTER TABLE `activeuser`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ActiveUser_userId_fkey` (`userId`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Logs_userId_fkey` (`userId`);

--
-- Indexes for table `milktank`
--
ALTER TABLE `milktank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Transaction_userId_fkey` (`userId`),
  ADD KEY `Transaction_milkTankId_fkey` (`milkTankId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD UNIQUE KEY `User_phone_key` (`phone`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `milktank`
--
ALTER TABLE `milktank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activeuser`
--
ALTER TABLE `activeuser`
  ADD CONSTRAINT `ActiveUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `Logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `Transaction_milkTankId_fkey` FOREIGN KEY (`milkTankId`) REFERENCES `milktank` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
