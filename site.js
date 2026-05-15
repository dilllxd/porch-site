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

const downloadOptions = {
  windows: 'https://updates.porch.chat/download/windows/',
  'linux-appimage': 'https://updates.porch.chat/download/linux/appimage/',
  'linux-deb': 'https://updates.porch.chat/download/linux/deb/',
  web: 'https://app.porch.chat'
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
const downloadSelect = document.querySelector('#download-select');
const selectedDownload = document.querySelector('#selected-download');

if (smartDownload) {
  smartDownload.href = selected.url;
  smartDownload.textContent = selected.label;
}

if (downloadSelect && selectedDownload) {
  const platform = detectPlatform();

  if (platform === 'linux') {
    downloadSelect.value = 'linux-appimage';
  } else if (platform === 'mobile' || platform === 'other') {
    downloadSelect.value = 'web';
  }

  selectedDownload.href = downloadOptions[downloadSelect.value];

  downloadSelect.addEventListener('change', () => {
    selectedDownload.href = downloadOptions[downloadSelect.value];
  });
}
