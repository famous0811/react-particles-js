const { alias, configPaths } = require("react-app-rewire-alias");
const {
  addDecoratorsLegacy,
  disableEsLint,
  override,
} = require("customize-cra");

module.exports = (config) => {
  alias({
    ...configPaths("tsconfig.paths.json"),
  })(config);

  const overrideConfig = {
    ...override(disableEsLint(), addDecoratorsLegacy()),
  };
  return { ...config, ...overrideConfig };
};
