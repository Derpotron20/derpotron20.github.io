# server.py
from http.server import HTTPServer, SimpleHTTPRequestHandler

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Disable caching for all files
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        super().end_headers()

PORT = 8000
httpd = HTTPServer(('localhost', PORT), NoCacheHandler)
print(f"Serving at http://localhost:{PORT}")
httpd.serve_forever()
