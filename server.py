import http.server
import socketserver
import os
from urllib.parse import urlparse

PORT = 8081

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def send_response(self, *args, **kwargs):
        super().send_response(*args, **kwargs)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def guess_type(self, path):
        """Guess the type of a file based on its extension."""
        if path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.html'):
            return 'text/html'
        return super().guess_type(path)

Handler = CORSHTTPRequestHandler
Handler.extensions_map.update({
    '.js': 'application/javascript',
    '.css': 'text/css',
})

httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"서버가 포트 {PORT}에서 실행 중입니다...")
print(f"브라우저에서 http://localhost:{PORT} 를 열어주세요")
httpd.serve_forever()
