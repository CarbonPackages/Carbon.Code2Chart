import { createFlowTreeBuilder, createSVGRender, TOKEN_TYPES } from "js2flowchart";

import javascript from "highlight.js/lib/languages/javascript";
import hljs from "highlight.js/lib/core";

hljs.registerLanguage("javascript", javascript);

[...document.querySelectorAll(".code-to-flowchart")].forEach((element) => {
    const { showCode, label, maxNameLength } = JSON.parse(element.dataset.config || "{}");
    const codeElement = element.querySelector("pre code");
    const code = codeElement.textContent;
    if (showCode) {
        hljs.highlightElement(codeElement);
    }

    const flowTreeBuilder = createFlowTreeBuilder();
    flowTreeBuilder.setAbstractionLevel({
        defined: Object.values(TOKEN_TYPES),
        custom: [
            {
                type: TOKEN_TYPES.PROGRAM,
                body: true,
                getName: () => label || "Program",
            },
        ],
    });

    try {
        const flowTree = flowTreeBuilder.build(code);
        const svgRender = createSVGRender();
        svgRender.applyTheme({ common: { maxNameLength } });
        let svg = svgRender.buildShapesTree(flowTree).print();
        svg = svg.replace(/width="(\d+)" height="(\d+)"/, 'viewBox="0 0 $1 $2"');
        element.insertAdjacentHTML("beforeend", svg);
    } catch (error) {
        if (window.name == "neos-content-main") {
            element.classList.add("code-to-flowchart--error");
        } else {
            element.remove();
        }
    }
});
