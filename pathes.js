const lpName = '';
const syntax = 'scss';
const directories = {
  src: './app/src/',
  dev: './app/dev/',
  public: `../../${lpName}/`,
  css: 'styles/',
  js: 'js/',
  fonts: 'fonts/',
  images: 'images/',
  icons: 'icons/'
};
const path = {
  css: {
    src: `${directories.src + directories.css}main.${syntax}`,
    watcher: `${directories.src + directories.css}**/*.${syntax}`,
    dev: `${directories.dev + directories.css}`,
    public: `${directories.public + directories.css}`
  },
  images: {
    src: `${directories.src + directories.images}**/*.*`,
    srcWebP: `${directories.src + directories.images}**/*.{img, png}`,
    dev: `${directories.dev + directories.images}`,
    devWebP: `${directories.dev + directories.images}webp/`,
    public: `${directories.public + directories.images}`,
    publicWebP: `${directories.public + directories.images}webp/`,
    watcher: `${directories.src + directories.images}**/*.*`
  },
  svg: {
    src: `${directories.src + directories.icons}**/*.svg`,
    dev: `${directories.dev + directories.icons}`,
    public: `${directories.public + directories.icons}`
  },
  js: {
    watcher: `${directories.src + directories.js}**/*.js`,
    src: `${directories.src + directories.js}main.js`,
    dev: `${directories.dev + directories.js}`,
    public: `${directories.public + directories.js}`
  },
  fonts: {
    src: `${directories.src + directories.fonts}**/*.*`,
    dev: `${directories.dev + directories.fonts}`,
    public: `${directories.public + directories.fonts}`
  },
  html: {
    src: `${directories.src}*.html`,
    dev: directories.dev,
    public: directories.public
  }
};

module.exports = { path, lpName, directories, syntax };
