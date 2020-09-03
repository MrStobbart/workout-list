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
};
