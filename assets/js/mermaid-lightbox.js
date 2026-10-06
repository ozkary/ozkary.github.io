/**
 * Mermaid.js Interactive Lightbox Component (AI-Dark Theme)
 * Hosted by ozkary.dev (https://www.ozkary.dev/assets/js/mermaid-lightbox.js)
 * 
 * Automatically detects Mermaid code blocks in posts (Blogger, Jekyll, etc.),
 * renders them using Mermaid.js with the ai-dark theme palette,
 * adds an interactive "Click to Expand" badge, and provides a fullscreen
 * interactive modal lightbox with Zoom In, Zoom Out, and Pan/Reset.
 */
(function () {
  'use strict';

  // 1. Inject Component Styles (Matches Jekyll ai-dark skin)
  function injectStyles() {
    if (document.getElementById('ozkary-mermaid-styles')) return;

    var style = document.createElement('style');
    style.id = 'ozkary-mermaid-styles';
    style.textContent = `
      .mermaid-wrapper {
        position: relative !important;
        margin: 25px 0 !important;
        padding: 18px 12px 12px 12px !important;
        background: #111726 !important; /* Code background color */
        border: 1px solid #1e293b !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4) !important;
        box-sizing: border-box !important;
        transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
      }
      .mermaid-wrapper:hover {
        border-color: #38bdf8 !important; /* Cyan accent on hover */
        box-shadow: 0 0 15px rgba(56, 189, 248, 0.15) !important;
      }
      .mermaid-expand-btn {
        display: inline-flex !important;
        align-items: center !important;
        position: absolute !important;
        top: 8px !important;
        right: 8px !important;
        z-index: 10 !important;
        background: #1e293b !important;
        color: #e2e8f0 !important;
        border: 1px solid #334155 !important;
        border-radius: 4px !important;
        padding: 4px 10px !important;
        font-size: 12px !important;
        font-family: inherit !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        line-height: 1.2 !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
        transition: all 0.15s ease-in-out !important;
      }
      .mermaid-expand-btn:hover {
        background: #273549 !important;
        color: #38bdf8 !important;
        border-color: #38bdf8 !important;
      }
      .mermaid {
        display: flex !important;
        justify-content: center !important;
        overflow-x: auto !important;
        cursor: zoom-in !important;
        padding: 8px 0 !important;
        margin: 0 !important;
        background: transparent !important;
      }
      .mermaid svg {
        max-width: 100% !important;
        height: auto !important;
      }
      .mermaid-modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 2147483647;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }
      .mermaid-modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(3, 7, 18, 0.88);
        backdrop-filter: blur(6px);
        z-index: 1;
      }
      .mermaid-modal-dialog {
        position: relative;
        z-index: 2;
        width: 94vw;
        height: 90vh;
        max-width: 1200px;
        background: #0f172a;
        border: 1px solid #1e293b;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
        overflow: hidden;
        box-sizing: border-box;
      }
      .mermaid-modal-toolbar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: #0b0f19;
        border-bottom: 1px solid #1e293b;
        box-sizing: border-box;
      }
      .mermaid-toolbar-btn {
        display: inline-block;
        background: #1e293b;
        border: 1px solid #334155;
        border-radius: 6px;
        padding: 6px 12px;
        font-size: 13px;
        font-family: inherit;
        font-weight: 600;
        cursor: pointer;
        color: #e2e8f0;
        transition: all 0.15s ease-in-out;
      }
      .mermaid-toolbar-btn:hover {
        background: #273549;
        color: #38bdf8;
        border-color: #38bdf8;
      }
      .mermaid-toolbar-btn.close {
        background: rgba(239, 68, 68, 0.15);
        border-color: rgba(239, 68, 68, 0.4);
        color: #fca5a5;
        margin-left: 8px;
      }
      .mermaid-toolbar-btn.close:hover {
        background: rgba(239, 68, 68, 0.3);
        color: #ffffff;
        border-color: #ef4444;
      }
      .mermaid-modal-content {
        flex: 1;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: #0b0f19;
        box-sizing: border-box;
      }
      .mermaid-modal-content svg {
        max-width: none !important;
        transition: transform 0.2s ease-out;
        transform-origin: center center;
      }
    `;
    document.head.appendChild(style);
  }

  // 2. Setup Global Lightbox Modal (Singleton)
  var modalEl, modalContentEl, currentScale = 1;

  function ensureModal() {
    if (modalEl) return;

    modalEl = document.createElement('div');
    modalEl.id = 'ozkary-mermaid-modal';
    modalEl.className = 'mermaid-modal-overlay';
    modalEl.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2147483647;align-items:center;justify-content:center;box-sizing:border-box;';

    modalEl.innerHTML = `
      <div class="mermaid-modal-backdrop"></div>
      <div class="mermaid-modal-dialog">
        <div class="mermaid-modal-toolbar">
          <button type="button" class="mermaid-toolbar-btn" id="ozkary-btn-zin" title="Zoom In">➕ Zoom In</button>
          <button type="button" class="mermaid-toolbar-btn" id="ozkary-btn-zout" title="Zoom Out">➖ Zoom Out</button>
          <button type="button" class="mermaid-toolbar-btn" id="ozkary-btn-reset" title="Reset Zoom">↺ Reset</button>
          <button type="button" class="mermaid-toolbar-btn close" id="ozkary-btn-close" title="Close (Esc)">✕ Close</button>
        </div>
        <div class="mermaid-modal-content" id="ozkary-mermaid-content"></div>
      </div>
    `;
    document.body.appendChild(modalEl);

    modalContentEl = modalEl.querySelector('#ozkary-mermaid-content');

    var updateScale = function () {
      var svg = modalContentEl.querySelector('svg');
      if (svg) svg.style.transform = 'scale(' + currentScale + ')';
    };

    modalEl.querySelector('#ozkary-btn-zin').addEventListener('click', function (e) {
      e.stopPropagation();
      currentScale = Math.min(currentScale + 0.25, 4);
      updateScale();
    });

    modalEl.querySelector('#ozkary-btn-zout').addEventListener('click', function (e) {
      e.stopPropagation();
      currentScale = Math.max(currentScale - 0.25, 0.5);
      updateScale();
    });

    modalEl.querySelector('#ozkary-btn-reset').addEventListener('click', function (e) {
      e.stopPropagation();
      currentScale = 1;
      updateScale();
    });

    var closeModal = function () {
      modalEl.style.display = 'none';
      modalContentEl.innerHTML = '';
      currentScale = 1;
      document.body.style.overflow = '';
    };

    modalEl.querySelector('#ozkary-btn-close').addEventListener('click', closeModal);
    modalEl.querySelector('.mermaid-modal-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalEl.style.display === 'flex') {
        closeModal();
      }
    });
  }

  function openLightbox(svgSource) {
    if (!svgSource) return;
    ensureModal();
    modalContentEl.innerHTML = svgSource.outerHTML;
    currentScale = 1;
    var modalSvg = modalContentEl.querySelector('svg');
    if (modalSvg) {
      modalSvg.style.maxWidth = 'none';
      modalSvg.style.transition = 'transform 0.2s ease-out';
      modalSvg.style.transformOrigin = 'center center';
    }
    modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // 3. Process Code Blocks and Wrap Diagrams
  function processBlocks() {
    var rawBlocks = document.querySelectorAll('pre code.language-mermaid, div.language-mermaid pre code');
    if (!rawBlocks.length) return;

    ensureModal();

    rawBlocks.forEach(function (code) {
      var pre = code.closest('pre');
      var container = pre.closest('.highlighter-rouge') || pre;

      var wrapper = document.createElement('div');
      wrapper.className = 'mermaid-wrapper';

      var expandBtn = document.createElement('button');
      expandBtn.type = 'button';
      expandBtn.className = 'mermaid-expand-btn';
      expandBtn.innerHTML = '🔍 Click to Expand';
      expandBtn.title = 'View diagram in fullscreen lightbox';

      var chartDiv = document.createElement('div');
      chartDiv.className = 'mermaid';
      chartDiv.textContent = code.textContent;

      wrapper.appendChild(expandBtn);
      wrapper.appendChild(chartDiv);
      container.parentNode.replaceChild(wrapper, container);

      var triggerOpen = function (e) {
        if (e) e.stopPropagation();
        var svg = chartDiv.querySelector('svg');
        if (svg) openLightbox(svg);
      };

      expandBtn.addEventListener('click', triggerOpen);
      chartDiv.addEventListener('click', triggerOpen);
    });

    if (window.mermaid) {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#111726',
          mainBkg: '#161f30',
          nodeBorder: '#38bdf8',
          primaryColor: '#161f30',
          primaryTextColor: '#e6edf3',
          primaryBorderColor: '#38bdf8',
          lineColor: '#94a3b8',
          secondaryColor: '#1e293b',
          tertiaryColor: '#0b0f19'
        },
        securityLevel: 'loose',
        flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
        sequence: { useMaxWidth: true, showSequenceNumbers: true }
      });
      window.mermaid.run();
    }
  }

  // 4. Ensure Mermaid Library is Loaded
  function loadMermaidAndInit() {
    injectStyles();

    if (window.mermaid) {
      processBlocks();
    } else {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
      script.onload = function () {
        processBlocks();
      };
      document.head.appendChild(script);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMermaidAndInit);
  } else {
    loadMermaidAndInit();
  }
})();
