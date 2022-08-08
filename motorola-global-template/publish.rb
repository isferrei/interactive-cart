require "json"

manifest_path = "./manifest.json"

stores = [
  "motorolaus",
  "motorolauk",
  "motorolafr",
  "motorolait",
  "motorolanl",
  "motorolaes",
  "motorolade",
]

stores.each do |store|
  system("vtex login #{store}")
  manifest = []
  f = File.open(manifest_path)
  f.each_line do |line|
    manifest << line
  end
  manifest = manifest.join("\n")
  manifest = JSON.parse(manifest)
  manifest["vendor"] = store
  manifest = manifest.to_json
  File.open(manifest_path, "w") { |file| file.puts manifest }
  system("vtex publish --verbose")
  # system("vtex use staging -p")
  # system("vtex install #{store}.motorola-store-theme@0.x")
  system("vtex update")
end
