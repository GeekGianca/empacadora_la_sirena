-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 27, 2020 at 02:02 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `empacadora`
--

-- --------------------------------------------------------

--
-- Table structure for table `detalle_compra`
--

CREATE TABLE `detalle_compra` (
  `VENTAS_codigoventa` int(11) NOT NULL,
  `PRODUCTO_codigoproducto` int(11) NOT NULL,
  `fechacompra` datetime NOT NULL,
  `observacioncompra` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detalle_compra`
--

INSERT INTO `detalle_compra` (`VENTAS_codigoventa`, `PRODUCTO_codigoproducto`, `fechacompra`, `observacioncompra`) VALUES
(2, 5453215, '2020-05-27 08:58:43', 'ninguno');

-- --------------------------------------------------------

--
-- Table structure for table `estado_lote`
--

CREATE TABLE `estado_lote` (
  `codigoestado` int(11) NOT NULL,
  `estadolote` tinyint(1) DEFAULT NULL,
  `observacion` text,
  `LOTE_idlote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `lote`
--

CREATE TABLE `lote` (
  `idlote` int(11) NOT NULL,
  `codigolote` varchar(50) NOT NULL,
  `tipolote` varchar(500) NOT NULL,
  `cantidadproductos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lote`
--

INSERT INTO `lote` (`idlote`, `codigolote`, `tipolote`, `cantidadproductos`) VALUES
(2342, '20200522205600', 'Lote 2', 470),
(12252, '20200522205552', 'Lote 3', 500),
(12345, '20200522205256', 'Lote 1', 5);

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

CREATE TABLE `producto` (
  `codigoproducto` int(11) NOT NULL,
  `nombreproducto` varchar(500) NOT NULL,
  `cantidadlitros` double NOT NULL,
  `cantidadlitrosporunidad` double NOT NULL,
  `LOTE_idlote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`codigoproducto`, `nombreproducto`, `cantidadlitros`, `cantidadlitrosporunidad`, `LOTE_idlote`) VALUES
(5453215, 'Paca de agua x500litros', 470, 3, 12345);

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `codigoventa` int(11) NOT NULL,
  `cantidadcomprada` int(11) NOT NULL,
  `totalcompra` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ventas`
--

INSERT INTO `ventas` (`codigoventa`, `cantidadcomprada`, `totalcompra`) VALUES
(1, 1, 126354),
(2, 1, 546513);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`VENTAS_codigoventa`,`PRODUCTO_codigoproducto`),
  ADD KEY `fk_VENTAS_has_PRODUCTO_PRODUCTO1_idx` (`PRODUCTO_codigoproducto`),
  ADD KEY `fk_VENTAS_has_PRODUCTO_VENTAS1_idx` (`VENTAS_codigoventa`);

--
-- Indexes for table `estado_lote`
--
ALTER TABLE `estado_lote`
  ADD PRIMARY KEY (`codigoestado`,`LOTE_idlote`),
  ADD KEY `fk_ESTADO_LOTE_LOTE1_idx` (`LOTE_idlote`);

--
-- Indexes for table `lote`
--
ALTER TABLE `lote`
  ADD PRIMARY KEY (`idlote`);

--
-- Indexes for table `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`codigoproducto`),
  ADD KEY `fk_PRODUCTO_LOTE_idx` (`LOTE_idlote`);

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`codigoventa`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ventas`
--
ALTER TABLE `ventas`
  MODIFY `codigoventa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `fk_VENTAS_has_PRODUCTO_PRODUCTO1` FOREIGN KEY (`PRODUCTO_codigoproducto`) REFERENCES `producto` (`codigoproducto`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_VENTAS_has_PRODUCTO_VENTAS1` FOREIGN KEY (`VENTAS_codigoventa`) REFERENCES `ventas` (`codigoventa`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `estado_lote`
--
ALTER TABLE `estado_lote`
  ADD CONSTRAINT `fk_ESTADO_LOTE_LOTE1` FOREIGN KEY (`LOTE_idlote`) REFERENCES `lote` (`idlote`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_PRODUCTO_LOTE` FOREIGN KEY (`LOTE_idlote`) REFERENCES `lote` (`idlote`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
