// CT Fitness — Shared Navigation
// Include this script in every page, then call: CTNav.init('pageId')

(function() {
  var SUPABASE_URL  = 'https://oqwyemyvmqubzbawcgfj.supabase.co';
  var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xd3llbXl2bXF1YnpiYXdjZ2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MTA1ODEsImV4cCI6MjA4ODQ4NjU4MX0.AghBMaHcRa9H0ZEbiT6qWCB_1Mpw4EN5rtJPjCTuXTA';

  // Detect if we're in a subfolder (e.g. /infinity-foods/)
  var _inSubfolder = window.location.pathname.split('/').filter(Boolean).length > 2;
  var _root = _inSubfolder ? '../' : '';

  var PAGES = [
    { id: 'home',         label: 'Home',           icon: '⌂',  href: _root + 'index.html' },
    { id: 'tools',        label: 'Free Tools',     icon: '🔧', href: _root + 'free-tools.html' },
    { id: 'programs',     label: 'Programs',       icon: '◈',  href: _root + 'programs.html' },
    { id: 'longevity',    label: '52-Week',        icon: '📈', href: _root + 'combined-app.html' },
    { id: 'infinity-foods', label: 'Infinity Foods', icon: '🌾', href: _root + 'infinity-foods/index.html' },
    { id: 'services',     label: 'Services',       icon: '◆',  href: _root + 'services.html' },
  ];

  // Pages that are "children" of Free Tools — mark their nav link as tools-active
  var TOOL_PAGES = ['calories','bodyfat','split','strength','planner'];
  var INFINITY_PAGES = ['sourdough','kefir','lacto-veg'];

  var CSS = `
    #ct-nav{
      position:sticky;top:0;z-index:200;
      background:#0c0c0c;
      border-bottom:1px solid #252525;
      backdrop-filter:blur(16px);
      -webkit-backdrop-filter:blur(16px);
    }
    #ct-nav-inner{
      display:flex;align-items:center;justify-content:space-between;
      padding:0 40px;max-width:1400px;margin:0 auto;height:84px;gap:16px;
    }
    #ct-nav-logo{
      font-family:'Playfair Display',serif;font-size:28px;font-weight:900;
      letter-spacing:2px;color:#fff;text-decoration:none;flex-shrink:0;
    }
    #ct-nav-logo span{
      font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;
      letter-spacing:4px;text-transform:uppercase;color:#666;display:block;margin-top:2px;
    }
    #ct-nav-links{
      display:flex;align-items:center;gap:2px;flex:1;
    }
    .ct-nav-link{
      display:flex;align-items:center;gap:8px;
      padding:10px 16px;
      font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:700;
      letter-spacing:1.5px;text-transform:uppercase;
      color:#666;text-decoration:none;
      border:1px solid transparent;
      transition:all 0.2s;white-space:nowrap;
    }
    .ct-nav-link:hover{color:#e8e4de;border-color:#333;}
    .ct-nav-link.active{color:#CD0404;border-color:rgba(205,4,4,0.3);background:rgba(205,4,4,0.06);}
    .ct-nav-icon{font-size:16px;line-height:1;}
    #ct-nav-auth{ flex-shrink:0;display:flex;align-items:center; }
    .ct-nav-auth-btn{
      font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;
      letter-spacing:2px;text-transform:uppercase;padding:10px 20px;
      text-decoration:none;cursor:pointer;border:none;transition:all 0.2s;white-space:nowrap;display:inline-block;
    }
    .ct-nav-login{color:#666;background:transparent;border:1px solid #333;}
    .ct-nav-login:hover{color:#fff;border-color:#666;}
    .ct-nav-dashboard{color:#fff;background:#CD0404;border:1px solid #CD0404;}
    .ct-nav-dashboard:hover{background:#e03333;border-color:#e03333;}
    #ct-nav-burger{
      display:none;background:transparent;border:1px solid #333;
      color:#666;padding:12px 16px;cursor:pointer;
      font-family:'Barlow Condensed',sans-serif;font-size:22px;
      transition:all 0.2s;flex-shrink:0;
    }
    #ct-nav-burger:hover{color:#fff;border-color:#666;}
    #ct-nav-drawer{
      display:none;position:fixed;top:84px;left:0;right:0;bottom:0;
      background:rgba(12,12,12,0.98);z-index:9999;
      flex-direction:column;padding:16px;gap:6px;overflow-y:auto;
    }
    #ct-nav-drawer.open{display:flex;}
    .ct-nav-drawer-link{
      display:flex;align-items:center;gap:14px;
      padding:16px 18px;border:1px solid #252525;background:#141414;
      font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;
      letter-spacing:2px;text-transform:uppercase;
      color:#666;text-decoration:none;transition:all 0.2s;
    }
    .ct-nav-drawer-link:hover{color:#e8e4de;border-color:#333;}
    .ct-nav-drawer-link.active{color:#CD0404;border-color:rgba(205,4,4,0.4);background:rgba(205,4,4,0.07);}
    .ct-nav-drawer-icon{font-size:20px;width:28px;text-align:center;}
    .ct-nav-drawer-auth{
      margin-top:8px;padding:16px 18px;border:1px solid #CD0404;
      background:rgba(205,4,4,0.08);
      font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;
      letter-spacing:2px;text-transform:uppercase;
      color:#CD0404;text-decoration:none;text-align:center;display:block;
    }
    @media(max-width:900px){
      #ct-nav-links{display:none;}
      #ct-nav-burger{display:block;}
      #ct-nav-inner{padding:0 16px;}
      #ct-nav-auth{display:none;}
    }
    @media(max-width:480px){
      #ct-nav-logo{font-size:20px !important;}
      #ct-nav-logo span{font-size:11px !important;letter-spacing:2px !important;}
      #ct-nav-inner{height:70px !important;padding:0 12px !important;}
      #ct-nav-drawer{top:70px !important;}
    }
  `;

  window.CTNav = {
    init: function(activePageId) {
      // Treat tool sub-pages as 'tools' for nav highlighting
      var effectiveId = TOOL_PAGES.indexOf(activePageId) !== -1 ? 'tools' : INFINITY_PAGES.indexOf(activePageId) !== -1 ? 'infinity-foods' : activePageId;

      var style = document.createElement('style');
      style.textContent = CSS;
      document.head.appendChild(style);

      var linksHtml = PAGES.map(function(p) {
        var isActive = p.id === effectiveId;
        return '<a class="ct-nav-link' + (isActive ? ' active' : '') + '" href="' + p.href + '">' +
          '<span class="ct-nav-icon">' + p.icon + '</span>' + p.label + '</a>';
      }).join('');

      var drawerHtml = PAGES.map(function(p) {
        var isActive = p.id === effectiveId;
        return '<a class="ct-nav-drawer-link' + (isActive ? ' active' : '') + '" href="' + p.href + '">' +
          '<span class="ct-nav-drawer-icon">' + p.icon + '</span>' + p.label + '</a>';
      }).join('');

      var navHtml = '<nav id="ct-nav">' +
        '<div id="ct-nav-inner">' +
          '<a id="ct-nav-logo" href="' + _root + 'index.html">CT FITNESS<span>Coach Taj Donaldson</span></a>' +
          '<div id="ct-nav-links">' + linksHtml + '</div>' +
          '<div id="ct-nav-auth"><a class="ct-nav-auth-btn ct-nav-login" href="signup.html">Log In</a></div>' +
          '<button id="ct-nav-burger" aria-label="Menu">&#9776;</button>' +
        '</div>' +
      '</nav>' +
      '<div id="ct-nav-drawer">' + drawerHtml +
        '<a class="ct-nav-drawer-auth" href="signup.html" id="ct-drawer-auth">Log In / Sign Up</a>' +
      '</div>';

      document.body.insertAdjacentHTML('afterbegin', navHtml);

      var burger = document.getElementById('ct-nav-burger');
      var drawer = document.getElementById('ct-nav-drawer');
      burger.addEventListener('click', function() {
        drawer.classList.toggle('open');
        burger.innerHTML = drawer.classList.contains('open') ? '&#10005;' : '&#9776;';
      });
      drawer.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() { drawer.classList.remove('open'); });
      });

      CTNav._checkSession();
    },

    _checkSession: function() {
      if (window.supabase && window.supabase.createClient) {
        CTNav._updateAuthButton(); return;
      }
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = function() { CTNav._updateAuthButton(); };
      document.head.appendChild(script);
    },

    _updateAuthButton: function() {
      try {
        var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
        client.auth.getSession().then(function(res) {
          var session = res.data && res.data.session;
          var authEl   = document.getElementById('ct-nav-auth');
          var drawerEl = document.getElementById('ct-drawer-auth');
          if (session) {
            if (authEl) authEl.innerHTML = '<a class="ct-nav-auth-btn ct-nav-dashboard" href="dashboard.html">My Dashboard</a>';
            if (drawerEl) { drawerEl.textContent = 'My Dashboard'; drawerEl.href = 'dashboard.html'; }
          } else {
            if (authEl) authEl.innerHTML = '<a class="ct-nav-auth-btn ct-nav-login" href="signup.html">Log In</a>';
            if (drawerEl) { drawerEl.textContent = 'Log In / Sign Up'; drawerEl.href = 'signup.html'; }
          }
        });
      } catch(e) { console.warn('Nav auth check failed:', e); }
    }
  };
})();
