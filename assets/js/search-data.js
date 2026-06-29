// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-articles",
          title: "articles",
          description: "My technical writing outside of peer-reviewed publication.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/articles/";
          },
        },{id: "articles-static-and-dynamic-attention-implications-for-graph-neural-networks",
          title: 'Static and Dynamic Attention: Implications for Graph Neural Networks',
          description: "How GAT and GATv2 differ in their attention formulations — static vs. dynamic attention — and why it changes their theoretical expressive capacity.",
          section: "Articles",handler: () => {
              window.location.href = "/articles/static-dynamic-attention-gnn/";
            },},{id: "articles-the-transformer-revolution-the-race-to-build-better-attention-mechanisms-that-power-deep-learning",
          title: 'The Transformer Revolution: The Race to Build Better Attention Mechanisms that Power Deep...',
          description: "How innovative attention mechanisms are allowing AI to process longer contexts, filter out noise, and make better decisions with less computational power.",
          section: "Articles",handler: () => {
              window.location.href = "/articles/transformer-revolution/";
            },},{id: "articles-understanding-the-failure-modes-of-transformers-through-the-lens-of-graph-neural-networks",
          title: 'Understanding the Failure Modes of Transformers through the Lens of Graph Neural Networks...',
          description: "A study of transformer failure modes through graph neural network theory, framing deep learning as learnable information propagation and bottlenecks.",
          section: "Articles",handler: () => {
              window.location.href = "/articles/transformer-failure-modes-gnn/";
            },},{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=GAQtDYsAAAAJ", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/hunjaetimothylee", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
