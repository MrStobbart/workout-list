module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/workouts",
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};
