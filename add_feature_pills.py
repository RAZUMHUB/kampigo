from pathlib import Path

path = Path("apps/web/components/home/home-screen.tsx")
text = path.read_text(encoding="utf-8")

marker = """              <Link
                href="/search\""""

insert = """              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium">
                  🔍 Lost &amp; Found
                </span>

                <span className="rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-medium">
                  👕 Clothes Rental
                </span>

                <span className="rounded-full border border-amber-100 bg-amber-50 px-4 py-2 text-sm font-medium">
                  🚗 Ride Sharing
                </span>
              </div>

""" + marker

if marker in text:
    text = text.replace(marker, insert, 1)
    path.write_text(text, encoding="utf-8")
    print("✅ Feature pills inserted")
else:
    print("❌ Marker not found")
