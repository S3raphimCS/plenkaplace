module.exports = {
  enable: true,
  mode: "simplify", // random | simplify | simplify-seedable
  refreshClassConversionJson: false, // False если production 
  allowExtensions: [".jsx", ".tsx", ".js", ".ts", ".html", ".rsc"],

  blackListedFolderPaths: [
    "./.next/cache",
    /\.next\/server\/pages\/api/,
    /_document..*js/,
    /_app-.*/,
    /__.*/, 
  ],
};