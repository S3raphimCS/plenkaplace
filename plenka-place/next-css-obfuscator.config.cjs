module.exports = {
  enable: true,
  mode: "random", // random | simplify | simplify-seedable
  refreshClassConversionJson: true, // False если production 
  allowExtensions: [".jsx", ".tsx", ".js", ".ts", ".html", ".rsc"],

  blackListedFolderPaths: [
    "./.next/cache",
    /\.next\/server\/pages\/api/,
    /_document..*js/,
    /_app-.*/,
    /__.*/, 
  ],
};