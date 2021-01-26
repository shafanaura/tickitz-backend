-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2021 at 04:55 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express-backend`
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
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinemas`
--

INSERT INTO `cinemas` (`id`, `name`, `picture`, `address`, `price`, `createdBy`, `createdAt`) VALUES
(1, 'ebv.id', NULL, 'Whatever street No.12, South Purwokerto', 15, NULL, '2021-01-18 23:52:07'),
(2, 'CineOne21', NULL, 'Downcare street No. 21, East Purwokerto', 12, NULL, '2021-01-18 23:52:36'),
(3, 'hiflix Cinema', NULL, 'Colonel street No. 2, East Purwokerto', 10, NULL, '2021-01-18 23:53:07');

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
(1, 1, 1, '2021-01-23 15:15:00'),
(2, 1, 2, '2021-01-23 15:15:00'),
(3, 1, 3, '2021-01-23 15:15:00');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `createdBy`, `createdAt`) VALUES
(1, 'Action', NULL, '2021-01-20 08:07:32'),
(2, 'Adventure', NULL, '2021-01-20 08:24:56'),
(3, 'Comedy', NULL, '2021-01-20 08:25:54'),
(4, 'Sci-Fi', NULL, '2021-01-20 08:26:32'),
(5, 'War', NULL, '2021-01-20 08:26:39'),
(6, 'Drama', NULL, '2021-01-20 08:26:45'),
(12, 'komedi', NULL, '2021-01-21 03:55:28');

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
(140, 'Iron Man', 'uploadspicture-1611559829765-447121450.png', '7 July 2017', 'Jon Watss', '2h 13min', 'Tom Holland, Michael Keaton, Robert Downey Jr.', 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.', NULL, '2021-01-25 07:30:29');

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
(90, 135, 1, '2021-01-25 07:29:10'),
(91, 135, 2, '2021-01-25 07:29:10'),
(92, 135, 4, '2021-01-25 07:29:10'),
(93, 136, 1, '2021-01-25 07:29:36'),
(94, 136, 5, '2021-01-25 07:29:36'),
(95, 136, 6, '2021-01-25 07:29:36'),
(96, 137, 2, '2021-01-25 07:29:55'),
(97, 137, 5, '2021-01-25 07:29:55'),
(98, 137, 12, '2021-01-25 07:29:55'),
(99, 138, 2, '2021-01-25 07:30:06'),
(100, 138, 5, '2021-01-25 07:30:06'),
(101, 138, 12, '2021-01-25 07:30:06'),
(102, 139, 2, '2021-01-25 07:30:19'),
(103, 139, 5, '2021-01-25 07:30:19'),
(104, 139, 12, '2021-01-25 07:30:19'),
(105, 140, 2, '2021-01-25 07:30:29'),
(106, 140, 5, '2021-01-25 07:30:29'),
(107, 140, 12, '2021-01-25 07:30:29');

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
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `times`
--

INSERT INTO `times` (`id`, `name`, `createdBy`, `createdAt`) VALUES
(1, '08:30am', NULL, '2021-01-23 15:01:53'),
(2, '10:30pm', NULL, '2021-01-23 15:02:05'),
(3, '12:00pm', NULL, '2021-01-23 15:02:13'),
(4, '02:00pm', NULL, '2021-01-23 15:02:19'),
(5, '04:30pm', NULL, '2021-01-23 15:02:26'),
(6, '07:00pm', NULL, '2021-01-23 15:02:34'),
(7, '08:30pm', NULL, '2021-01-23 15:02:39');

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
  `idSeat` int(11) DEFAULT NULL,
  `idLocation` int(11) DEFAULT NULL,
  `dateTime` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` enum('Admin','SuperUser') DEFAULT 'SuperUser',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `createdAt`) VALUES
(9, 'admin@gmail.com', '$2b$10$E0mQIsTTVqQyVyX1/LECped1IFVFKGISa5cJ3feV88olyuDSVZ27S', 'Admin', '2021-01-26 03:06:08'),
(10, 'user1@gmail.com', '$2b$10$pXLN1W7Zzs5qTAuHt35pHegGQagiCKQ8VpUsE0avO85.u0oA1AlYa', 'SuperUser', '2021-01-26 03:10:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`,`idMovie`,`idCinema`,`idTime`,`idSeat`,`idLocation`,`dateTime`),
  ADD KEY `idMovie` (`idMovie`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `cinema_times`
--
ALTER TABLE `cinema_times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `movie_genres`
--
ALTER TABLE `movie_genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `times`
--
ALTER TABLE `times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD CONSTRAINT `cinemas_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `cinema_times`
--
ALTER TABLE `cinema_times`
  ADD CONSTRAINT `cinema_times_ibfk_2` FOREIGN KEY (`idTime`) REFERENCES `times` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `cinema_times_ibfk_3` FOREIGN KEY (`idCinema`) REFERENCES `cinemas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `genres`
--
ALTER TABLE `genres`
  ADD CONSTRAINT `genres_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
-- Constraints for table `times`
--
ALTER TABLE `times`
  ADD CONSTRAINT `times_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`idMovie`) REFERENCES `movies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
