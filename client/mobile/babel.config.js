module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "components/*": ["components/"],
            "constants/*": ["constants/"],
            "navigation/*": ["navigation/"],
            "screens/*": ["screens/"],
            "hooks/*": ["hooks/"],
          },
        },
      ],
    ],
    presets: ["babel-preset-expo"],
  };
};
