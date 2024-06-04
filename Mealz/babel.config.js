module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};

// Agregué el plugin nativewind/babel para poder utilizar Tailwind CSS en el proyecto