module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@assets": "./assets",
            "@components": "./components",
            "@screens": "./app/screens",
            "@storage": "./storage",
            "@utils": "./utils",
            "@libs": "./libs",
            "@hooks": "./hooks",
            "@contexts": "./contexts",
            "@routes": "./routes",
            "@store": "./store",
            "@types": "./types",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          verbose: false,
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
