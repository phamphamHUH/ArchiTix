<?php
require_once __DIR__ . "/../../config/db.php";

header("Access-Control-Allow-Origin: http://127.0.0.1:5501");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Make sure $conn exists
if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection not available']);
    exit;
}

// Fetch events using prepared statement
$stmt = $conn->prepare("
    SELECT id, venue_name, city, address, venue_image, capacity, commission_rate, created_at, seating_map
    FROM venues
    ORDER BY created_at ASC
");

$stmt->execute();
$result = $stmt->get_result();

$venues = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $venues[] = $row;
    }
}

echo json_encode([
    'venues' => $venues
]);

$stmt->close();
