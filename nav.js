// CT Fitness — Shared Navigation
// Include this script in every page, then call: CTNav.init('pageId')
// pageId matches the data-page on each nav link

(function() {
  var PAGES = [
    { id: 'home',      label: 'Home',              icon: '⌂',  href: 'index.html' },
    { id: 'calories',  label: 'Calorie Calculator', icon: '🔥', href: 'calorie-calculator.html' },
    { id: 'bodyfat',   label: 'Body Fat',           icon: '📊', href: 'body-fat.html' },
    { id: 'split',     label: 'Training Split',     icon: '📅', href: 'training-split.html' },
    { id: 'strength',  label: 'Strength Standards', icon: '🏋', href: 'strength-standards.html' },
    { id: 'planner',   label: 'Workout Planner',    icon: '📋', href: 'workout-planner.html' },
    { id: 'services',  label: 'Services',           icon: '◆',  href: 'services.html' },
  ];

  var CSS = `
    #ct-nav{
      position:sticky;top:0;z-index:200;
      background:rgba(12,12,12,0.97);
      border-bottom:1px solid #252525;
      backdrop-filter:blur(16px);
      -webkit-backdrop-filter:blur(16px);
    }
    #ct-nav-inner{
      display:flex;align-items:center;justify-content:space-between;
      padding:0 32px;max-width:1400px;margin:0 auto;height:56px;
    }
    #ct-nav-logo{
      font-family:'Playfair Display',serif;font-size:20px;font-weight:900;
      letter-spacing:2px;color:#fff;text-decoration:none;flex-shrink:0;
    }
    #ct-nav-logo span{
      font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;
      letter-spacing:4px;text-transform:uppercase;color:#666;display:block;margin-top:1px;
    }
    #ct-nav-links{
      display:flex;align-items:center;gap:2px;
    }
    .ct-nav-link{
      display:flex;align-items:center;gap:6px;
      padding:7px 12px;
      font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;
      letter-spacing:1.5px;text-transform:uppercase;
      color:#666;text-decoration:none;
      border:1px solid transparent;
      transition:all 0.2s;white-space:nowrap;
    }
    .ct-nav-link:hover{color:#e8e4de;border-color:#333;}
    .ct-nav-link.active{color:#CD0404;border-color:rgba(205,4,4,0.3);background:rgba(205,4,4,0.06);}
    .ct-nav-icon{font-size:14px;line-height:1;}
    #ct-nav-burger{
      display:none;background:transparent;border:1px solid #333;
      color:#666;padding:8px 12px;cursor:pointer;
      font-family:'Barlow Condensed',sans-serif;font-size:18px;
      transition:all 0.2s;
    }
    #ct-nav-burger:hover{color:#fff;border-color:#666;}
    /* Mobile drawer */
    #ct-nav-drawer{
      display:none;position:fixed;top:56px;left:0;right:0;bottom:0;
      background:rgba(12,12,12,0.98);z-index:199;
      flex-direction:column;padding:16px;gap:6px;
      overflow-y:auto;
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
    @media(max-width:900px){
      #ct-nav-links{display:none;}
      #ct-nav-burger{display:block;}
      #ct-nav-inner{padding:0 20px;}
    }
  `;

  window.CTNav = {
    init: function(activePageId) {
      // Inject CSS
      var style = document.createElement('style');
      style.textContent = CSS;
      document.head.appendChild(style);

      // Build desktop nav links
      var linksHtml = PAGES.map(function(p) {
        var isActive = p.id === activePageId;
        return '<a class="ct-nav-link' + (isActive ? ' active' : '') + '" href="' + p.href + '">' +
          '<span class="ct-nav-icon">' + p.icon + '</span>' + p.label + '</a>';
      }).join('');

      // Build mobile drawer links
      var drawerHtml = PAGES.map(function(p) {
        var isActive = p.id === activePageId;
        return '<a class="ct-nav-drawer-link' + (isActive ? ' active' : '') + '" href="' + p.href + '">' +
          '<span class="ct-nav-drawer-icon">' + p.icon + '</span>' + p.label + '</a>';
      }).join('');

      // Build nav HTML
      var navHtml = '<nav id="ct-nav">' +
        '<div id="ct-nav-inner">' +
          '<a id="ct-nav-logo" href="index.html">CT FITNESS<span>Coach Taj Donaldson</span></a>' +
          '<div id="ct-nav-links">' + linksHtml + '</div>' +
          '<button id="ct-nav-burger" aria-label="Menu">&#9776;</button>' +
        '</div>' +
      '</nav>' +
      '<div id="ct-nav-drawer">' + drawerHtml + '</div>';

      // Inject at top of body
      document.body.insertAdjacentHTML('afterbegin', navHtml);

      // Burger toggle
      var burger = document.getElementById('ct-nav-burger');
      var drawer = document.getElementById('ct-nav-drawer');
      burger.addEventListener('click', function() {
        drawer.classList.toggle('open');
        burger.innerHTML = drawer.classList.contains('open') ? '&#10005;' : '&#9776;';
      });

      // Close drawer on link click
      drawer.querySelectorAll('.ct-nav-drawer-link').forEach(function(link) {
        link.addEventListener('click', function() {
          drawer.classList.remove('open');
        });
      });
    }
  };
})();
