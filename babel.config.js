module.exports = function (api) {
  const appEnvironment = process.env.APP_ENV || "develop";

  api.cache.using(() => appEnvironment);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@storage": "./src/storage",
            "@utils": "./src/utils",
            "@libs": "./src/libs",
            "@hooks": "./src/hooks",
            "@contexts": "./src/contexts",
            "@routes": "./src/routes",
            "@store": "./src/store",
            "@config": "./src/config",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: `.env.${appEnvironment}`,
          verbose: false,
        },
      ],
    ],
  };
};
