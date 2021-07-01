module.exports = {
  projects: [
    "./client/",
    {
      root: "./client/",
      package: "./package.json",
      globalComponents: ["./src/**/*.vue"],
    },
  ],
};
