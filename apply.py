import re
import sys
from pathlib import Path

# Existing patch.txt block order:
# 1       -> KB.txt
# 2       -> release_notes.txt
# 3..18   -> worker.js

PATCH_FILE = Path(sys.argv[1] if len(sys.argv) > 1 else "patch.txt")

BLOCK_TARGETS = {
    1: "KB.txt",
    2: "release_notes.txt",
    **{i: "worker.js" for i in range(3, 19)},
}

text = PATCH_FILE.read_text(encoding="utf-8").replace("\r\n", "\n")
text = re.sub(r"^\`\`\`\w*\n|\n\`\`\`\s*$", "", text.strip())

blocks = re.findall(
    r"@@@@ SEARCH\n(.*?)\n@@@@ SPLIT\n(.*?)\n@@@@ END",
    text,
    re.S,
)

if not blocks:
    sys.exit("No patch blocks found.")

if len(blocks) != len(BLOCK_TARGETS):
    sys.exit(
        f"Patch has {len(blocks)} blocks, but this mapping expects "
        f"{len(BLOCK_TARGETS)}. Nothing written."
    )

grouped = {}
for index, (old, new) in enumerate(blocks, 1):
    target = BLOCK_TARGETS.get(index)
    if target is None:
        sys.exit(f"No target assigned to patch block {index}. Nothing written.")
    grouped.setdefault(target, []).append((index, old, new))

# Read and validate all targets before changing any file.
prepared = {}
for filename, file_blocks in grouped.items():
    path = Path(filename)
    if not path.is_file():
        sys.exit(f"File not found: {filename}. Nothing written.")

    raw = path.read_text(encoding="utf-8")
    had_crlf = "\r\n" in raw
    source = raw.replace("\r\n", "\n")

    for index, old, new in file_blocks:
        count = source.count(old)
        if count != 1:
            sys.exit(
                f"Nothing written. {filename}, patch block {index}: "
                f"expected exactly 1 match, found {count}."
            )

    for index, old, new in file_blocks:
        source = source.replace(old, new, 1)

    if had_crlf:
        source = source.replace("\n", "\r\n")

    prepared[path] = source

# Keep backups, then write the validated results.
for path in prepared:
    backup = path.with_name(path.name + ".bak")
    backup.write_bytes(path.read_bytes())

for path, content in prepared.items():
    with path.open("w", encoding="utf-8", newline="") as f:
        f.write(content)

print(
    f"Applied {len(blocks)} blocks to "
    + ", ".join(path.name for path in prepared)
)
print("Backups created with the .bak extension.")
