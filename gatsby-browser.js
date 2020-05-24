import './src/styles/global.css';

import Prism from "prism-react-renderer/prism";
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-dart");

export const onRouteUpdate = ({ location, prevLocation }) => {
    dartPad();
    googleCustomSearchEngine();
};

function dartPad() {
    // Dart-Padソースコード埋め込み処理
    const snippets = document.querySelectorAll('code');
    for (const snippet of snippets) {
        if (snippet && snippet.className.includes('run-dartpad')) {
            const message = {
                sourceCode: { 'main.dart': snippet.innerText },
                type: 'sourceCode',
            };

            const iframe = document.createElement('iframe');
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '500px');
            iframe.setAttribute('src', 'https://dartpad.dev/embed-flutter.html?split=60&theme=dark&run=true');

            iframe.onload = () => {
                iframe.contentWindow.postMessage(message, '*');
            };
            snippet.parentNode.replaceChild(iframe, snippet);
        }
    }
}

function googleCustomSearchEngine() {
    const src = 'https://cse.google.com/cse.js?cx=011639872739789057932:mbhzs6ouq8o';

    const oldScript = document.querySelector(`script[src="${src}"]`);
    if (oldScript) {
        oldScript.remove();
    }

    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}