document.addEventListener('DOMContentLoaded', function() {
    const settingsModal = document.getElementById('settings-modal');
    const settingsBtn = document.getElementById('settings-btn');
    const closeBtn = document.getElementsByClassName('close')[0];
    const themeSelect = document.getElementById('theme-select');
  
    function setTheme(theme) {
      const link = document.querySelector('link[href^="themes/"]');
      link.href = `themes/${theme}.css`;
      localStorage.setItem('selectedTheme', theme);
      themeSelect.value = theme;
    }
  
    function loadSavedTheme() {
      const savedTheme = localStorage.getItem('selectedTheme');
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme('dark');
      }
    }
  
    loadSavedTheme();
  
    settingsBtn.onclick = function() {
      settingsModal.style.display = "block";
      loadSavedTheme();
    }
  
    closeBtn.onclick = function() {
      settingsModal.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target == settingsModal) {
        settingsModal.style.display = "none";
      }
    }
  
    themeSelect.addEventListener('change', function() {
      const theme = this.value;
      setTheme(theme);
    });
  });
  