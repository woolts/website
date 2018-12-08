module.exports = {
  title: 'Wool',
  themeConfig: {
    nav: [
      { text: "Install", link: "/install" },
      {
        text: "Learn",
        items: [
          { text: 'Guide', link: "/learn/getting-started" },
          { text: 'API', link: "/learn/api" },
        ]
      }
    ],
    sidebar: [
      {
        title: 'Essentials',
        children: [
          '/install',
          '/learn/getting-started',
          '/learn/core'
        ]
      }
    ]
  }
};
