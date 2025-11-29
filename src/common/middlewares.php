<?php
require_once __DIR__ . '/DatabaseHelper.php';


function is_admin_db($db, $userId)
{
    // $userId
    $stmt = $db->prepare("SELECT is_admin FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$result || !isset($result["is_admin"]) || (isset($result["is_admin"]) && $result["is_admin"] === 0)) {
        http_response_code(403);
        echo json_encode(['error' => 'Access denied — only admins can access this endpoint']);
        exit;
    }
}

function requireAdmin()
{
    if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] != 1) {
        http_response_code(403);
        echo json_encode(['error' => 'Access denied — only admins can access this endpoint']);
        exit;
    }
}
