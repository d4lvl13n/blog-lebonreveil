<?php
/**
 * Plugin Name: Headless CORS & Security
 * Description: CORS headers for headless WordPress (Astro frontend) + noindex enforcement.
 * Version: 1.0
 *
 * Must-use plugin: copy to wp-content/mu-plugins/headless-cors.php
 */

// Allowed origins for CORS
define('HEADLESS_ALLOWED_ORIGINS', [
    'https://blog.lebonreveil.com',
    'https://lebonreveil-blog.vercel.app',
    'http://localhost:4321',
    'http://localhost:3000',
]);

/**
 * Add CORS headers to REST API and GraphQL responses.
 */
function headless_cors_headers() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, HEADLESS_ALLOWED_ORIGINS, true)) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }

    // Handle preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
add_action('rest_api_init', function () {
    headless_cors_headers();
}, 1);
add_action('init', function () {
    if (defined('GRAPHQL_HTTP_REQUEST') || isset($_SERVER['HTTP_ORIGIN'])) {
        headless_cors_headers();
    }
});

/**
 * Also handle WPGraphQL CORS specifically.
 */
add_filter('graphql_response_headers_to_send', function ($headers) {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, HEADLESS_ALLOWED_ORIGINS, true)) {
        $headers['Access-Control-Allow-Origin'] = $origin;
        $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
        $headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
        $headers['Access-Control-Allow-Credentials'] = 'true';
    }

    return $headers;
});

/**
 * Force noindex on the CMS backend — it should never be indexed.
 */
add_action('wp_head', function () {
    echo '<meta name="robots" content="noindex, nofollow">' . "\n";
});

/**
 * Remove unnecessary frontend features (this is a headless CMS).
 */
add_action('after_setup_theme', function () {
    // Remove emoji scripts
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    // Remove RSD link
    remove_action('wp_head', 'rsd_link');
    // Remove Windows Live Writer manifest
    remove_action('wp_head', 'wlwmanifest_link');
    // Remove WP version
    remove_action('wp_head', 'wp_generator');
});
