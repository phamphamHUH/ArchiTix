<?php
session_start();

require_once __DIR__ . "/../../config/db.php";
require_once __DIR__ . "/../../config/config.php";

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: http://127.0.0.1:5501");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Decode JSON input
$input = json_decode(file_get_contents("php://input"), true);

$email    = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(["error" => "Missing email or password"]);
    exit;
}

// Fetch user
$stmt = $conn->prepare(
    "SELECT id, password, role, profile_pic FROM users WHERE email = ?"
);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Invalid email or password"]);
    exit;
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['password'])) {
    echo json_encode(["error" => "Invalid email or password"]);
    exit;
}

$payload = [
    "exp" => time() + $_ENV["JWT_EXPIRY"],
    "user" => [
        "id" => $user['id'],
        "email" => $email,
        "role" => $user['role'],
        "profile_pic" => $user['profile_pic']
    ]
];

// Encode JWT
$jwt = JWT::encode($payload, $_ENV["JWT_SECRET"], 'HS256');


$stmt->close();
$conn->close();

echo json_encode([
    "success" => "Login successful",
    "payload" => $jwt,
]);
