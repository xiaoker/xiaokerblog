import math

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <style>
    .vortex-arm { fill: #282728; }
    .vortex-bg { fill: transparent; }
    .hole { fill: #282728; }
    @media (prefers-color-scheme: dark) {
      .vortex-arm { fill: #eaedf3; }
      .hole { fill: #eaedf3; }
    }
  </style>
  <defs>
    <clipPath id="circleClip">
      <circle cx="50" cy="50" r="48" />
    </clipPath>
  </defs>
  <circle cx="50" cy="50" r="48" class="vortex-bg" />
  <g clip-path="url(#circleClip)">
"""

arms = 18
turns = 1.2
hole_x, hole_y = 35, 65
center_x, center_y = 50, 50

# Draw the deep hole
svg_content += f'    <circle cx="{hole_x}" cy="{hole_y}" r="3" class="hole" />\n'

for a in range(arms):
    angle_offset = (2 * math.pi / arms) * a
    
    pts1 = []
    pts2 = []
    for step in range(100):
        t = step / 99.0
        # Non-linear growth for 3D depth effect
        r = 2 + 70 * (t**1.8) 
        
        # Spiral angle
        theta = angle_offset + turns * 2 * math.pi * t
        
        # Shift the origin from the off-center hole to the true center
        cx = hole_x + (center_x - hole_x) * (t**0.8)
        cy = hole_y + (center_y - hole_y) * (t**0.8)
        
        # Base path
        x = cx + r * math.cos(theta)
        y = cy + r * math.sin(theta)
        pts1.append((x, y))
        
        # Thickness of the crescent arm
        # Gets thicker as it moves outward
        thickness = 0.5 + 8 * (t**1.5)
        # Angular offset to create the outer edge of the crescent
        theta2 = theta + (thickness / r if r > 0.1 else 0)
        
        x2 = cx + r * math.cos(theta2)
        y2 = cy + r * math.sin(theta2)
        pts2.append((x2, y2))
        
    pts2.reverse()
    
    path_d = f"M {pts1[0][0]:.2f} {pts1[0][1]:.2f} "
    for p in pts1[1:]:
        path_d += f"L {p[0]:.2f} {p[1]:.2f} "
    for p in pts2:
        path_d += f"L {p[0]:.2f} {p[1]:.2f} "
    path_d += "Z"
    
    svg_content += f'    <path d="{path_d}" class="vortex-arm" />\n'

svg_content += """  </g>
</svg>"""

with open('public/favicon.svg', 'w') as f:
    f.write(svg_content)

print("SVG generated successfully.")
