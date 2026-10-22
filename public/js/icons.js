// Premium SVG Icons & Brand Logos for UniLLM Platform

export const icons = {
  // Brand Logo
  logo: (size = "w-4 h-4") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fill-opacity="0.2" stroke="currentColor"></polygon>
    </svg>
  `,

  // Brand Logo Badge
  logoBadge: (boxSize = "w-8 h-8", iconSize = "w-4 h-4") => `
    <div class="${boxSize} rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
      <svg class="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="white" fill-opacity="0.3"></polygon>
      </svg>
    </div>
  `,

  // Providers & Tech Brands
  openai: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.02-1.1635a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4023-.6863zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0748a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.4598a.7948.7948 0 0 0-.3927.6813l-.0048 6.7219zm1.0978-2.3655l2.602-1.4998 2.5973 1.4998v2.9997l-2.5973 1.4998-2.602-1.4998z"/>
    </svg>
  `,

  anthropic: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 3.125h-3.956L7.332 20.875h3.956l1.378-3.792h5.668l1.378 3.792h3.956zm-3.6 10.708l1.622-4.463 1.622 4.463zM2.875 20.875h3.956L13.015 3.125H9.06z"/>
    </svg>
  `,

  google: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  `,

  python: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.81v.825H3.9S0 5.78 0 11.898c0 6.12 3.4 5.908 3.4 5.908h2.03v-2.86s-.11-3.4 3.34-3.4h5.758s3.23.053 3.23-3.123V2.656S18.307 0 11.914 0zm-3.23 1.838c.607 0 1.1.493 1.1 1.1 0 .608-.493 1.1-1.1 1.1-.608 0-1.1-.492-1.1-1.1 0-.607.492-1.1 1.1-1.1zm3.4 22.162c6.095 0 5.714-2.656 5.714-2.656l-.006-2.752H11.98v-.825h8.117s3.9.453 3.9-5.665c0-6.118-3.4-5.908-3.4-5.908h-2.03v2.86s.11 3.4-3.34 3.4H9.463s-3.23-.053-3.23 3.123v5.758s-.55 2.656 5.85 2.656zm3.23-1.838c-.607 0-1.1-.493-1.1-1.1 0-.608.493-1.1 1.1-1.1.608 0 1.1.492 1.1 1.1 0 .607-.492 1.1-1.1 1.1z" fill="url(#python-grad)"/>
      <defs>
        <linearGradient id="python-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3776AB"/>
          <stop offset="100%" stop-color="#FFD43B"/>
        </linearGradient>
      </defs>
    </svg>
  `,

  typescript: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0z" fill="#3178C6"/>
      <path d="M13.568 17.584c.36.216.852.384 1.404.384.756 0 1.236-.372 1.236-.936 0-.588-.396-.864-1.32-1.2-1.332-.492-2.124-1.308-2.124-2.316 0-1.428 1.14-2.508 2.976-2.508.684 0 1.308.168 1.692.384l-.456 1.356c-.324-.18-.768-.324-1.284-.324-.768 0-1.176.396-1.176.84 0 .54.408.816 1.368 1.188 1.404.54 2.088 1.296 2.088 2.376 0 1.5-1.14 2.58-3.156 2.58-.84 0-1.572-.228-2.004-.492l.456-1.428zM7.22 12.448H4.628V11.02h6.984v1.428H9.02v7.716H7.22v-7.716z" fill="#FFF"/>
    </svg>
  `,

  golang: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="#00ADD8">
      <path d="M1.81 10.455c-.244 0-.447-.075-.609-.224A.824.824 0 0 1 .95 9.6c0-.267.085-.487.256-.66.17-.175.385-.262.645-.262.25 0 .458.083.623.25.166.166.248.375.248.627 0 .25-.084.464-.252.641a.846.846 0 0 1-.66.259zm4.238 3.52c-.687 0-1.23-.198-1.63-.594-.4-.396-.6-.94-.6-1.634 0-.71.205-1.27.616-1.682.41-.41.97-.616 1.68-.616.717 0 1.28.204 1.688.612.408.408.612.964.612 1.67 0 .708-.204 1.266-.612 1.673-.408.407-.97.611-1.688.611zm.014-1.28c.328 0 .584-.108.769-.324.184-.216.277-.527.277-.932 0-.41-.093-.726-.277-.946-.185-.22-.441-.33-.77-.33-.334 0-.592.11-.775.33-.183.22-.274.536-.274.946 0 .405.091.716.274.932.183.216.441.324.776.324z"/>
      <path d="M12.56 12.015h3.816v1.268H12.56v-1.268zm-5.06-1.56h3.456v1.268H7.5v-1.268zm2.4 3.12h4.56v1.268H9.9v-1.268z"/>
    </svg>
  `,

  kubernetes: (size = "w-6 h-6") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="#326CE5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 21.5 7.5 21.5 18.5 12 24 2.5 18.5 2.5 7.5 12 2"></polygon>
      <circle cx="12" cy="12" r="3"></circle>
      <line x1="12" y1="2" x2="12" y2="9"></line>
      <line x1="12" y1="15" x2="12" y2="24"></line>
      <line x1="2.5" y1="7.5" x2="9.5" y2="10.5"></line>
      <line x1="14.5" y1="13.5" x2="21.5" y2="18.5"></line>
      <line x1="2.5" y1="18.5" x2="9.5" y2="13.5"></line>
      <line x1="14.5" y1="10.5" x2="21.5" y2="7.5"></line>
    </svg>
  `,

  helm: (size = "w-6 h-6") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="#0F1689" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="12" y1="2" x2="12" y2="8"></line>
      <line x1="12" y1="16" x2="12" y2="22"></line>
      <line x1="2" y1="12" x2="8" y2="12"></line>
      <line x1="16" y1="12" x2="22" y2="12"></line>
    </svg>
  `,

  docker: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="#2496ED">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.575a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.93 0h2.12a.185.185 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.17a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zM23.99 11.23a4.7 4.7 0 00-1.89-1.95.19.19 0 00-.28.1 4.54 4.54 0 01-.84 1.34 7.03 7.03 0 00-2.48-1.57h-.06a.19.19 0 00-.19.19v1.73a.19.19 0 00.19.19h.33c.85 0 1.55.67 1.63 1.52.02.26-.06.51-.23.7a6.38 6.38 0 01-5.18 2.06H2.6a2.6 2.6 0 01-2.6-2.6v-.32a.19.19 0 01.19-.19h18.23c.1 0 .19-.08.19-.19v-1.1a.19.19 0 00-.19-.19H17.4a.19.19 0 00-.19.19v1.89c0 .1.08.19.19.19h.56a.19.19 0 01.19.19v.32a.19.19 0 01-.19.19H.19A.19.19 0 000 13.33v.38c0 4.15 3.37 7.52 7.52 7.52h9.19c5.07 0 7.28-3.4 7.28-7.39v-.04c0-.92-.28-1.8-.75-2.57z"/>
    </svg>
  `,

  // Core System & UI Icons
  server: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,

  cloud: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>
  `,

  shield: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  `,

  lightning: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  `,

  cpu: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  `,

  eye: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `,

  gitBranch: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="6" y1="3" x2="6" y2="15"></line>
      <circle cx="18" cy="6" r="3"></circle>
      <circle cx="6" cy="18" r="3"></circle>
      <path d="M18 9a9 9 0 0 1-9 9"></path>
    </svg>
  `,

  users: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,

  bot: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
      <line x1="8" y1="16" x2="8.01" y2="16"></line>
      <line x1="16" y1="16" x2="16.01" y2="16"></line>
    </svg>
  `,

  cog: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  `,

  plug: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22v-5"></path>
      <path d="M9 8V2"></path>
      <path d="M15 2v6"></path>
      <path d="M18 8v5a6 6 0 0 1-12 0V8z"></path>
    </svg>
  `,

  globe: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  `,

  brain: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"></path>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"></path>
    </svg>
  `,

  lock: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,

  key: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 2l-2 2m-1.5 1.5L16 7l-1.5-1.5L13 7l-1.5-1.5L10 7l-1.5-1.5L7 7l-2-2a5 5 0 1 0-3 3l16 16 3-3-2-2 2-2-2-2 2-2z"></path>
    </svg>
  `,

  chart: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  `,

  bell: (size = "w-5 h-5") => `
    <svg class="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  `
};
