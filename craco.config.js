module.exports = {
  babel: {
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          ssr: false,
          fileName: false,
        },
      ],
    ],
  },
};
