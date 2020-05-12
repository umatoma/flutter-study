import './src/styles/global.css';

import Prism from "prism-react-renderer/prism";
(typeof global !== "undefined" ? global : window).Prism = Prism;
require("prismjs/components/prism-dart");

export const onRouteUpdate = ({ location, prevLocation }) => {
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
};