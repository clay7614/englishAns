"""Development server for testing the app at http://localhost:8000."""

from __future__ import annotations

import argparse
import contextlib
import os
import socket
import sys
import webbrowser
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = 8000
REPO_ROOT = os.path.dirname(os.path.abspath(__file__))


class DevServerHandler(SimpleHTTPRequestHandler):
    """Adds correct MIME types and disables caching."""

    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".webmanifest": "application/manifest+json",
        ".json": "application/json; charset=utf-8",
    }

    def end_headers(self) -> None:  # type: ignore[override]
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Serve englishAns locally")
    parser.add_argument("--host", default=DEFAULT_HOST, help="Host interface (default: %(default)s)")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="Port to bind (default: %(default)s)")
    parser.add_argument(
        "--directory",
        default=REPO_ROOT,
        help="Directory to serve (default: repository root)",
    )
    parser.add_argument(
        "--open",
        action="store_true",
        dest="auto_open",
        help="Open the served URL in the default browser",
    )
    return parser.parse_args(argv)


def ensure_directory(path: str) -> None:
    if not os.path.isdir(path):
        raise ValueError(f"Serve directory does not exist: {path}")


def maybe_open_browser(url: str, should_open: bool) -> None:
    if not should_open:
        return
    with contextlib.suppress(webbrowser.Error):
        webbrowser.open_new_tab(url)


def serve(host: str, port: int, directory: str, auto_open: bool) -> None:
    ensure_directory(directory)
    os.chdir(directory)

    server_address = (host, port)
    httpd = ThreadingHTTPServer(server_address, DevServerHandler)
    url = f"http://{host}:{port}/"
    print(f"Serving {directory} at {url}")

    maybe_open_browser(url, auto_open)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    args = parse_args()
    try:
        serve(args.host, args.port, args.directory, args.auto_open)
    except (OSError, socket.error) as error:
        print(f"Failed to start server: {error}", file=sys.stderr)
        sys.exit(1)
    except ValueError as error:
        print(error, file=sys.stderr)
        sys.exit(1)
