const downloads = {
  windows: {
    label: 'Download for Windows',
    hint: 'Windows installer selected automatically.',
    url: 'https://updates.porch.chat/download/windows/'
  },
  linux: {
    label: 'Download for Linux',
    hint: 'Linux AppImage selected automatically.',
    url: 'https://updates.porch.chat/download/linux/appimage/'
  },
  mobile: {
    label: 'Open Web App',
    hint: 'Phones use the Porch web app. Install it from your browser menu.',
    url: 'https://app.porch.chat'
  },
  other: {
    label: 'Open Web App',
    hint: 'Desktop downloads are available for Windows and Linux.',
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
const hint = document.querySelector('#download-hint');

if (smartDownload) {
  smartDownload.href = selected.url;
  smartDownload.textContent = selected.label;
}

if (hint) {
  hint.textContent = selected.hint;
}
