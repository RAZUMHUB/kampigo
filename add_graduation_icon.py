from pathlib import Path

path = Path("apps/web/components/home/home-screen.tsx")
text = path.read_text()

old = """  ArrowRight,
} from 'lucide-react';"""

new = """  ArrowRight,
  GraduationCap,
} from 'lucide-react';"""

if "GraduationCap" not in text:
    text = text.replace(old, new)

path.write_text(text)
print("✅ GraduationCap imported")
