((window) => {
  const hosts = {
    "Apple Podcasts": { 
      url: "https://podcasts.apple.com/us/podcast/detachedhead/id1464078091",
      icon: "https://cdn.jsdelivr.net/gh/kyle-west/dh-components/assets/icons/apple.ico"
    },
    "Google Podcasts": { 
      url: "https://www.google.com/podcasts?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy84NmQzODBjL3BvZGNhc3QvcnNz",
      icon: "https://cdn.jsdelivr.net/gh/kyle-west/dh-components/assets/icons/google.png"
    },
    "Spotify": { 
      url: "https://open.spotify.com/show/0BttTlSolUMb77KPEr3Ejs",
      icon: "https://cdn.jsdelivr.net/gh/kyle-west/dh-components/assets/icons/spotify.png"
    },
    "Stitcher": { 
      url: "https://www.stitcher.com/podcast/anchor-podcasts/detachedhead",
      icon: "https://cdn.jsdelivr.net/gh/kyle-west/dh-components/assets/icons/stitcher.png"
    },
    "Overcast": { 
      url: "https://overcast.fm/itunes1464078091/detachedhead",
      icon: "https://cdn.jsdelivr.net/gh/kyle-west/dh-components/assets/icons/overcast.ico"
    },
    "Pocket Casts": { 
      url: "https://pca.st/8s0X",
      icon: "https://cdn.jsdelivr.net/gh/kyle-west/dh-components/assets/icons/pocketcast.ico"
    },
    "Breaker": { 
      url: "https://www.breaker.audio/detachedhead",
      icon: "https://cdn.jsdelivr.net/gh/kyle-west/dh-components/assets/icons/breaker.ico"
    },
    "RadioPublic": { 
      url: "https://radiopublic.com/detachedhead-6BpEaq",
      icon: "https://cdn.jsdelivr.net/gh/kyle-west/dh-components/assets/icons/radiopublic.png"
    },
    "Anchor": { 
      url: "https://anchor.fm/detachedhead",
      icon: "https://cdn.jsdelivr.net/gh/kyle-west/dh-components/assets/icons/anchor.png"
    }
  }

  const css = {
    host: `
      width: 100%;
      margin: auto;
      text-align: center;
    `,
    li: `
      list-style: none;
      margin: 25px;
      `,
    img: `
      width: 2rem;
      height: 2rem;
      display: inline-block; 
      vertical-align: middle;
      margin-right: 5px;
      text-decoration: none;
    `
  }

  let links = Object.entries(hosts).map(host => {
    let [company, config] = host;
    return `
      <li style="${css.li}">
        <a href="${config.url}" target="_blank">
          <img style="${css.img}" src="${config.icon}">${company}
        </a>
      </li>
    `;
  })

  console.log(links)

  class DetachedHeadPodcastLinks extends HTMLElement {
    connectedCallback () {
      this.innerHTML = `
        <div style="${css.host}">
          <h2>Listen for Free</h2>
          ${links.join('')}
        </div>
      `;

      this.applyOnLinkClicks();
    }
    
    static get observedAttributes() {
      return ['on-link-click'];
    }
    
    applyOnLinkClicks () {
      if (this.onLinkClick) {
        [...this.querySelectorAll('a')].forEach(link => {
          let company = link.textContent.trim();
          let config = hosts[company];
          link.onclick = (e) => {
            this.onLinkClick(company, config, e);
          }
        })
      }
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
      if (attrName === 'on-link-click') {
        this.onLinkClick = eval(this.getAttribute(attrName))
        this.applyOnLinkClicks();
      }
    }
  }
  window.customElements.define('dh-podcast-links', DetachedHeadPodcastLinks);
})(window)