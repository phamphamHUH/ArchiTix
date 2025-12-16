<?php
require_once __DIR__ . "/config.php";

$conn = mysqli_connect(
    $_ENV['DB_HOST'],
    $_ENV['DB_USER'],
    $_ENV['DB_PASS'],
    $_ENV['DB_NAME'],
    3307
);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
