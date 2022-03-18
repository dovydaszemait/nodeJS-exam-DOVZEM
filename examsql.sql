-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 18, 2022 at 09:27 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `examsql`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(2) NOT NULL,
  `group_id` int(2) NOT NULL,
  `user_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(2) NOT NULL,
  `group_id` int(2) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `group_id`, `amount`, `description`) VALUES
(3, 2, '$1000 ', 'Food'),
(4, 2, '$10000 ', 'Used Car'),
(5, 2, '$1000000 ', 'Brand new car');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(2) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(2, 'Buy cars');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(2) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `reg_timestamp`) VALUES
(1, '', 'my2@email.com', '$2a$10$fezi5PuqNtMvp1bwi1iXzekRcwzgZehOU4MxmkwSw/OukNRb4uBka', '2022-03-16 08:14:07'),
(4, 'kola', 'kola@gmail.com', '$2a$10$Z8vcQeqaAxFnAHvUWQSeM.Ah3ELlgyFisNsNTgm0zMi5LH1YYygRS', '2022-03-17 10:26:18'),
(5, 'kola', 'kola@gmail.com', '$2a$10$pKgotBAHCarv2AhRUgsZDuYkJJH43UFEfuyhWpZU8LXf9Gpd5t1/u', '2022-03-17 10:45:57'),
(6, 'kola', 'kola@gmail.com', '$2a$10$WGFTktkaS58hvPXQCqomoOihujWgkYVGHZgervxdVj1aKJyfWZlbC', '2022-03-17 10:49:01'),
(7, 'kola', 'kola@gmail.com', '$2a$10$PGIeofN646HA3hAzjm42AeinSaroJ62Dgay6ixUcIvbBLwkt1j8dO', '2022-03-17 10:49:25'),
(8, 'kola', 'kola@gmail.com', '$2a$10$P52zLQrrrhX6P2BJKqYYI.hISLwavWp/UQ.t34DfV3IdiAdRZmIsO', '2022-03-17 10:59:09'),
(9, 'kola', 'kola@gmail.com', '$2a$10$L4WGNN2d9ufiLZhXiVgbleKZvP0h8pVmWO0wZsWK35mAEZHykhom6', '2022-03-17 11:10:12'),
(22, 'dov zem', 'dov@email.com', '$2a$10$.yzr1mXpO9nxsZPSp2xN5uncjspGsWK0svERDtqeM6KRB4tkhy87S', '2022-03-18 07:36:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usersToAccounts` (`user_id`),
  ADD KEY `groupsToAccounts` (`group_id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `billsToGroups` (`group_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `groupsToAccounts` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `usersToAccounts` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `billsToGroups` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
