<?php
require_once __DIR__ . "/../../config/db.php";

header("Access-Control-Allow-Origin: http://127.0.0.1:5501");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' || !$_SERVER['REQUEST_METHOD'] === 'POST') {
    http_response_code(200);
    exit;
}

// Decode JSON input
$input = json_decode(file_get_contents("php://input"), true);

// Get data from JSON
$firstName = trim($input['firstName'] ?? '');
$lastName  = trim($input['lastName'] ?? '');
$email     = trim($input['email'] ?? '');
$password  = $input['password'] ?? '';
$role      = $input['role'] ?? 'user';

if (!$firstName || !$lastName || !$email || !$password) {
    echo json_encode(["error" => "Missing fields"]);
    exit;
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if email exists
$stmt = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows() > 0) {
    echo json_encode(["error" => "Email already registered."]);
    exit;
}
$stmt->close();

// Insert user with role
$stmt = $conn->prepare(
    "INSERT INTO users (first_name, last_name, email, password_hash, role)
     VALUES (?, ?, ?, ?, ?)"
);

$stmt->bind_param(
    "sssss",
    $firstName,
    $lastName,
    $email,
    $hashedPassword,
    $role
);


if ($stmt->execute()) {
    echo json_encode(["success" => "Registration successful."]);
} else {
    echo json_encode(["error" => "Registration failed."]);
}

$stmt->close();
$conn->close();
