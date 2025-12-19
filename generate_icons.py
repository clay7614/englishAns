import os
from PIL import Image, ImageDraw

def create_icon(size, filename):
    # Create a new image with a transparent background
    image = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    
    # Colors
    # Primary: #6750A4, Secondary: #D0BCFF
    # We'll use a simple gradient approximation or just the primary color
    primary_color = (103, 80, 164) # #6750A4
    
    # Draw rounded rectangle (rx="112" in 512x512)
    draw.rounded_rectangle(
        [0, 0, 512, 512],
        radius=112,
        fill=primary_color
    )
    
    # Draw the lines (from SVG)
    # <path d="M128 160h256v32H128zm0 64h256v32H128zm0 64h160v32H128z" fill="#FFFFFF"/>
    white = (255, 255, 255)
    
    # Line 1
    draw.rectangle([128, 160, 128 + 256, 160 + 32], fill=white)
    # Line 2
    draw.rectangle([128, 224, 128 + 256, 224 + 32], fill=white)
    # Line 3
    draw.rectangle([128, 288, 128 + 160, 288 + 32], fill=white)
    
    # Draw the arrow (from SVG)
    # <path d="M320 288l64 64-64 64" fill="none" stroke="#FFFFFF" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
    # Arrow points: (320, 288) -> (384, 352) -> (320, 416)
    draw.line([(320, 288), (384, 352), (320, 416)], fill=white, width=32, joint="curve")
    
    # Resize to target size
    if size != 512:
        image = image.resize((size, size), Image.Resampling.LANCZOS)
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    image.save(filename)
    print(f"Created {filename}")

def generate_icons():
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    for s in sizes:
        create_icon(s, f"icons/icon-{s}x{s}.png")
    
    # Also create a favicon
    create_icon(32, "icons/favicon.png")
    print('Icons generated successfully.')

if __name__ == '__main__':
    generate_icons()
