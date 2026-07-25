from pathlib import Path
import re

path = Path("apps/web/components/home/home-screen.tsx")
text = path.read_text(encoding="utf-8")

# Replace heading
text = re.sub(
    r"Hi\s*\{profile\?\.(?:displayName)\?\.split\(' '\)\[0\]\s*\?\?\s*'there'\}\.\s*Let&apos;s get lost items home\.",
    "Everything Students Need.<br />One App.",
    text,
    flags=re.MULTILINE,
)

# Replace description
text = re.sub(
    r"Search your campus network,\s*report an item,\s*and track\s*possible matches from one private university space\.",
    "Lost something? Found something? Need a ride or clothes for an event? Campigo brings essential campus services together in one place.",
    text,
    flags=re.MULTILINE,
)

path.write_text(text, encoding="utf-8")
print("✅ Done")
