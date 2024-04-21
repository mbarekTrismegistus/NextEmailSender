"use client"

import Script from 'next/script'

export default function ScriptSpline() {
  return (
    <>
        <Script src="https://code.jquery.com/jquery-3.7.1.js" />
        <Script src="script.js" onLoad={() => {
            if(window){
                let customElem = document.getElementById("spline");
                let shadow = customElem.shadowRoot;
                const sheet = new CSSStyleSheet();
                sheet.insertRule("a { display: none; }");
                sheet.insertRule("svg { display: none; }");
                shadow.adoptedStyleSheets = [sheet];
            }

        }}/>
    </>
  )
}
