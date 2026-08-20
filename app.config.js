const appJson = require("./app.json");

function getPluginName(plugin) {
  if (typeof plugin === "string") {
    return plugin;
  }

  return plugin[0];
}

function withCleartextTrafficForDevelop(plugins, allowCleartextTraffic) {
  return plugins.map((plugin) => {
    const pluginName = getPluginName(plugin);

    if (pluginName !== "expo-build-properties") {
      return plugin;
    }

    return [
      "expo-build-properties",
      {
        android: {
          usesCleartextTraffic: allowCleartextTraffic,
        },
      },
    ];
  });
}

module.exports = () => {
  const appEnvironment = process.env.APP_ENV || "develop";
  const allowCleartextTraffic = appEnvironment === "develop";
  const appJsonPlugins = appJson.expo.plugins ?? [];

  return {
    expo: {
      ...appJson.expo,
      plugins: withCleartextTrafficForDevelop(
        appJsonPlugins,
        allowCleartextTraffic
      ),
    },
  };
};
