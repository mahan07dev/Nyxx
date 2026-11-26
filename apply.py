# python apply.py worker.js patch.txt
import re, sys

target = sys.argv[1] if len(sys.argv) > 1 else "README.md"
patch = sys.argv[2] if len(sys.argv) > 2 else "patch.txt"

raw = open(target, encoding="utf-8", newline="").read()
crlf = "\r\n" in raw
src = raw.replace("\r\n", "\n")

text = open(patch, encoding="utf-8").read().replace("\r\n", "\n")
text = re.sub(r"^```\w*\n|\n```\s*$", "", text.strip())
blocks = re.findall(r"@@@@ SEARCH\n(.*?)\n@@@@ SPLIT\n(.*?)\n?@@@@ END", text, re.S)

bad = [(i, src.count(old)) for i, (old, _) in enumerate(blocks, 1) if src.count(old) != 1]
if bad:
    sys.exit("Nothing written. Bad blocks (index, matches): " + ", ".join(f"{i}:{n}" for i, n in bad))

for old, new in blocks:
    src = src.replace(old, new, 1)

if crlf:
    src = src.replace("\n", "\r\n")
open(target, "w", encoding="utf-8", newline="").write(src)
print(f"Applied {len(blocks)} blocks")