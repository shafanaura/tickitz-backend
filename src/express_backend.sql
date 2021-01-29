-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2021 at 05:12 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express_backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `cinemas`
--

CREATE TABLE `cinemas` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinemas`
--

INSERT INTO `cinemas` (`id`, `name`, `picture`, `address`, `price`, `createdAt`) VALUES
(56, 'ebv.id', 'uploadspicture-1611756983120-318878915.png', 'Whatever street No.12, South Purwokerto', 12, '2021-01-27 14:16:23'),
(57, 'CineOne21', 'uploadspicture-1611757055725-803277410.png', 'Downcare street No. 21, East Purwokerto', 15, '2021-01-27 14:17:35'),
(62, 'hiflix Cinema', 'uploadspicture-1611757238426-602113244.png', 'Colonel street No. 2, East Purwokerto', 10, '2021-01-27 14:20:38');

-- --------------------------------------------------------

--
-- Table structure for table `cinema_times`
--

CREATE TABLE `cinema_times` (
  `id` int(11) NOT NULL,
  `idCinema` int(11) NOT NULL,
  `idTime` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinema_times`
--

INSERT INTO `cinema_times` (`id`, `idCinema`, `idTime`, `createdAt`) VALUES
(30, 56, 1, '2021-01-27 14:16:23'),
(31, 56, 2, '2021-01-27 14:16:23'),
(32, 57, 2, '2021-01-27 14:17:35'),
(33, 57, 4, '2021-01-27 14:17:35'),
(42, 62, 4, '2021-01-27 14:20:38'),
(43, 62, 5, '2021-01-27 14:20:38'),
(44, 62, 6, '2021-01-27 14:20:38');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `createdAt`) VALUES
(1, 'Action', '2021-01-20 08:07:32'),
(2, 'Adventure', '2021-01-20 08:24:56'),
(3, 'Comedy', '2021-01-20 08:25:54'),
(4, 'Sci-Fi', '2021-01-20 08:26:32'),
(5, 'War', '2021-01-20 08:26:39'),
(6, 'Drama', '2021-01-20 08:26:45'),
(12, 'komedi', '2021-01-21 03:55:28');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `createdAt`) VALUES
(6, 'Purwokerto', '2021-01-25 13:50:12'),
(7, 'Surabaya', '2021-01-25 13:50:19'),
(8, 'Jakarta', '2021-01-25 13:50:29');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `releaseDate` varchar(30) NOT NULL,
  `directed` varchar(100) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `cast` varchar(100) NOT NULL,
  `synopsis` text NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `picture`, `releaseDate`, `directed`, `duration`, `cast`, `synopsis`, `createdBy`, `createdAt`) VALUES
(135, 'Spider-Man: Homecoming', 'uploadspicture-1611559750009-842020271.png', '7 July 2017', 'Jon Watss', '2h 13min', 'Tom Holland, Michael Keaton, Robert Downey Jr.', 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.', NULL, '2021-01-25 07:29:10'),
(136, 'Batman', 'uploadspicture-1611559776842-862850150.png', '7 July 2017', 'Jon Watss', '2h 13min', 'Tom Holland, Michael Keaton, Robert Downey Jr.', 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.', NULL, '2021-01-25 07:29:36'),
(137, 'Superman', 'uploadspicture-1611559795531-24019248.png', '7 July 2017', 'Jon Watss', '2h 13min', 'Tom Holland, Michael Keaton, Robert Downey Jr.', 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.', NULL, '2021-01-25 07:29:55'),
(138, 'Minion', 'uploadspicture-1611559806303-201705803.png', '7 July 2017', 'Jon Watss', '2h 13min', 'Tom Holland, Michael Keaton, Robert Downey Jr.', 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.', NULL, '2021-01-25 07:30:06'),
(139, 'Star Wars', 'uploadspicture-1611559819527-827521312.png', '7 July 2017', 'Jon Watss', '2h 13min', 'Tom Holland, Michael Keaton, Robert Downey Jr.', 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.', NULL, '2021-01-25 07:30:19'),
(140, 'Iron Man', 'uploadspicture-1611559829765-447121450.png', '7 July 2017', 'Jon Watss', '2h 13min', 'Tom Holland, Michael Keaton, Robert Downey Jr.', 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.', NULL, '2021-01-25 07:30:29'),
(141, 'Interstellar', 'uploadspicture-1611751968469-167045203.png', '7 July 2017', 'Jon Watss', '2h 13min', 'Tom Holland, Michael Keaton, Robert Downey Jr.', 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.', 9, '2021-01-27 12:52:48'),
(142, 'Spider-Man: Homecomin', 'uploadspicture-1611751995908-630021288.png', '7 July 2017', 'Jon Watss', '2h 13min', 'Tom Holland, Michael Keaton, Robert Downey Jr.', 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.', 9, '2021-01-27 12:53:15');

-- --------------------------------------------------------

--
-- Table structure for table `movie_genres`
--

CREATE TABLE `movie_genres` (
  `id` int(11) NOT NULL,
  `idMovie` int(11) NOT NULL,
  `idGenre` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie_genres`
--

INSERT INTO `movie_genres` (`id`, `idMovie`, `idGenre`, `createdAt`) VALUES
(90, 135, 2, '2021-01-25 07:29:10'),
(91, 135, 2, '2021-01-25 07:29:10'),
(92, 135, 2, '2021-01-25 07:29:10'),
(93, 136, 1, '2021-01-25 07:29:36'),
(94, 136, 5, '2021-01-25 07:29:36'),
(95, 136, 6, '2021-01-25 07:29:36'),
(96, 137, 2, '2021-01-25 07:29:55'),
(97, 137, 5, '2021-01-25 07:29:55'),
(98, 137, 12, '2021-01-25 07:29:55'),
(99, 138, 2, '2021-01-25 07:30:06'),
(100, 138, 2, '2021-01-25 07:30:06'),
(101, 138, 2, '2021-01-25 07:30:06'),
(102, 139, 2, '2021-01-25 07:30:19'),
(103, 139, 5, '2021-01-25 07:30:19'),
(104, 139, 12, '2021-01-25 07:30:19'),
(105, 140, 2, '2021-01-25 07:30:29'),
(106, 140, 5, '2021-01-25 07:30:29'),
(107, 140, 12, '2021-01-25 07:30:29'),
(108, 141, 1, '2021-01-27 12:52:48'),
(109, 141, 2, '2021-01-27 12:52:48'),
(110, 142, 4, '2021-01-27 12:53:15');

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`id`, `name`, `createdAt`) VALUES
(1, 'A1', '2021-01-25 14:06:01'),
(2, 'A2', '2021-01-25 14:06:07'),
(3, 'A3', '2021-01-25 14:06:11');

-- --------------------------------------------------------

--
-- Table structure for table `times`
--

CREATE TABLE `times` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `times`
--

INSERT INTO `times` (`id`, `name`, `createdAt`) VALUES
(1, '08:30am', '2021-01-23 15:01:53'),
(2, '10:30pm', '2021-01-23 15:02:05'),
(3, '12:00pm', '2021-01-23 15:02:13'),
(4, '02:00pm', '2021-01-23 15:02:19'),
(5, '04:30pm', '2021-01-23 15:02:26'),
(6, '07:00pm', '2021-01-23 15:02:34');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idMovie` int(11) DEFAULT NULL,
  `idCinema` int(11) DEFAULT NULL,
  `idTime` int(11) DEFAULT NULL,
  `idLocation` int(11) DEFAULT NULL,
  `dateTime` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `idUser`, `idMovie`, `idCinema`, `idTime`, `idLocation`, `dateTime`, `createdAt`) VALUES
(26, 11, 136, 62, 4, 8, '2020-10-05', '2021-01-27 16:10:25');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_items`
--

CREATE TABLE `transaction_items` (
  `id` int(11) NOT NULL,
  `idTransaction` int(11) NOT NULL,
  `idSeat` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_items`
--

INSERT INTO `transaction_items` (`id`, `idTransaction`, `idSeat`, `createdAt`) VALUES
(49, 26, 2, '2021-01-27 16:10:25'),
(50, 26, 3, '2021-01-27 16:10:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` enum('Admin','User') DEFAULT 'User',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `createdAt`) VALUES
(9, 'admin@gmail.com', '$2b$10$E0mQIsTTVqQyVyX1/LECped1IFVFKGISa5cJ3feV88olyuDSVZ27S', 'Admin', '2021-01-26 03:06:08'),
(10, 'user1@gmail.com', '$2b$10$pXLN1W7Zzs5qTAuHt35pHegGQagiCKQ8VpUsE0avO85.u0oA1AlYa', 'User', '2021-01-26 03:10:47'),
(11, 'user2@gmail.com', '$2b$10$KlknH76Ei3fZJa9EDbUF9.1ST3p8XHGVU/6I.aQmqzfrcnxbAnHua', 'User', '2021-01-27 16:08:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cinema_times`
--
ALTER TABLE `cinema_times`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCinema` (`idCinema`),
  ADD KEY `idTime` (`idTime`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMovie` (`idMovie`),
  ADD KEY `idGenre` (`idGenre`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `times`
--
ALTER TABLE `times`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`,`idMovie`,`idCinema`,`idTime`,`idLocation`,`dateTime`),
  ADD KEY `idMovie` (`idMovie`),
  ADD KEY `idCinema` (`idCinema`),
  ADD KEY `idTime` (`idTime`),
  ADD KEY `idLocation` (`idLocation`);

--
-- Indexes for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idTransaction` (`idTransaction`,`idSeat`),
  ADD KEY `idSeat` (`idSeat`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `cinema_times`
--
ALTER TABLE `cinema_times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT for table `movie_genres`
--
ALTER TABLE `movie_genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `times`
--
ALTER TABLE `times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `transaction_items`
--
ALTER TABLE `transaction_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cinema_times`
--
ALTER TABLE `cinema_times`
  ADD CONSTRAINT `cinema_times_ibfk_2` FOREIGN KEY (`idTime`) REFERENCES `times` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `cinema_times_ibfk_3` FOREIGN KEY (`idCinema`) REFERENCES `cinemas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD CONSTRAINT `movie_genres_ibfk_2` FOREIGN KEY (`idMovie`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movie_genres_ibfk_3` FOREIGN KEY (`idGenre`) REFERENCES `genres` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`idMovie`) REFERENCES `movies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`idCinema`) REFERENCES `cinemas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_4` FOREIGN KEY (`idTime`) REFERENCES `times` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_5` FOREIGN KEY (`idLocation`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction_items`
--
ALTER TABLE `transaction_items`
  ADD CONSTRAINT `transaction_items_ibfk_1` FOREIGN KEY (`idTransaction`) REFERENCES `transactions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_items_ibfk_2` FOREIGN KEY (`idSeat`) REFERENCES `seats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
