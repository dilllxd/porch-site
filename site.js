const downloads = {
  windows: {
    label: 'Download for Windows',
    url: 'https://updates.porch.chat/download/windows/'
  },
  linux: {
    label: 'Download for Linux',
    url: 'https://updates.porch.chat/download/linux/appimage/'
  },
  mobile: {
    label: 'Open Web App',
    url: 'https://app.porch.chat'
  },
  other: {
    label: 'Open Web App',
    url: 'https://app.porch.chat'
  }
};

const detectPlatform = () => {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.userAgentData?.platform || navigator.platform || '')
    .toLowerCase();

  if (/android|iphone|ipad|ipod/.test(ua)) {
    return 'mobile';
  }

  if (platform.includes('win')) {
    return 'windows';
  }

  if (platform.includes('linux') || platform.includes('x11')) {
    return 'linux';
  }

  return 'other';
};

const selected = downloads[detectPlatform()] || downloads.other;
const smartDownload = document.querySelector('#smart-download');
const downloadMenu = document.querySelector('#download-menu');
const downloadToggle = document.querySelector('#download-toggle');
const downloadOptions = document.querySelector('#download-options');

if (smartDownload) {
  smartDownload.href = selected.url;
  smartDownload.textContent = selected.label;
}

const closeDownloadMenu = () => {
  downloadMenu?.classList.remove('open');
  downloadToggle?.setAttribute('aria-expanded', 'false');
};

const openDownloadMenu = () => {
  downloadMenu?.classList.add('open');
  downloadToggle?.setAttribute('aria-expanded', 'true');
};

downloadToggle?.addEventListener('click', (event) => {
  event.stopPropagation();

  if (downloadMenu?.classList.contains('open')) {
    closeDownloadMenu();
  } else {
    openDownloadMenu();
  }
});

downloadOptions?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeDownloadMenu();
  }
});

document.addEventListener('click', (event) => {
  if (!downloadMenu?.contains(event.target)) {
    closeDownloadMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDownloadMenu();
  }
});
