import { memo } from "react";

function Utterance() {
  return (
    <section
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const scriptElement = document.createElement("script");
        scriptElement.src = "https://utteranc.es/client.js";
        scriptElement.crossOrigin = "anonymous";
        scriptElement.async = true;
        scriptElement.setAttribute("repo", "Junseop-Shin/nextjs-study");
        scriptElement.setAttribute("issue-term", "pathname");
        scriptElement.setAttribute("theme", "github-dark-orange");
        elem.appendChild(scriptElement);
      }}
    />
  );
}

export default memo(Utterance);
