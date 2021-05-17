module.exports = {
  mode: "jit",
  purge: ["./app/**/*.tsx", "./app/**/*.ts", "./app/**/*.jsx", "./app/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sandrift: "#b09988",
        "spring-wood": "#e3dfdb",
        nero: "#262626",
        "pale-slate": "#bcb7b5",
        "vista-white": "#dfdedc",
        alabaster: "#efeee8",
        "alabaster-400": "#F2F1ED",
        "alabaster-300": "#F9F8F6",
        "el-paso": "#3a3a39",
        "el-paso-600": "#181818",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
