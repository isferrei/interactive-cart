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
  system("vtex use staging -p")
  system("vtex promote")
  # system("vtex list")
  # system("vtex update")
  # system("vtex install #{store}.motorola-store-theme@0.x")
  # system("vtex install vtex.admin@3.x")
  # system("vtex install vtex.store@2.x --force")
  # system("vtex install vtex.admin-apps@3.x")
  # system("vtex install vtex.admin-pages@4.x")
  # system("vtex install vtex.bazaarvoice@2.x")
  # system("vtex install vtex.store-sitemap@1.x")
  # system("vtex install vtex.admin-graphql-ide@3.x")
end
