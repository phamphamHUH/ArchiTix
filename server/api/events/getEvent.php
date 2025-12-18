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

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid or missing event ID']);
    exit;
}

$eventId = (int) $_GET['id'];

// Make sure $conn exists
if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection not available']);
    exit;
}

// Fetch events using prepared statement
$stmt = $conn->prepare("
    SELECT e.id, e.event_name,e.min_price, e.max_price, e.description, e.status, 
           e.trending, e.start_time, e.end_time, e.event_image,
           v.venue_name AS venue_name, CONCAT(u.first_name, ' ', u.last_name) AS organizer_name,
              o.phone AS phone, v.address AS address, v.venue_image AS  venue_image, v. seating_map AS seating_map
    FROM events e
    JOIN venues v ON e.venue_id = v.id
    JOIN organizers o ON e.organizer_id = o.id
    JOIN users u ON o.user_id = u.id
    WHERE e.id = ?
    LIMIT 1
");
$stmt->bind_param("i", $eventId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    echo json_encode([
        'success' => true,
        'event' => $result->fetch_assoc()
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'message' => 'Event not found'
    ]);
}

$stmt->close();
