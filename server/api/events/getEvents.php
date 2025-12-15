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
    SELECT e.event_id, e.title, e.description, e.start_time, e.end_time, 
           e.min_price, e.max_price, e.status, e.image, e.trending,
           v.name AS venue_name, CONCAT(u.first_name, ' ', u.last_name) AS organizer_name
    FROM events e
    JOIN venues v ON e.venue_id = v.venue_id
    JOIN organizers o ON e.organizer_id = o.organizer_id
    JOIN users u ON o.user_id = u.user_id
    ORDER BY e.start_time ASC
");

$stmt->execute();
$result = $stmt->get_result();

$events = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
}

echo json_encode([
    'success' => true,
    'data' => $events
]);

$stmt->close();
