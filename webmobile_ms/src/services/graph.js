import {
    createGitgraph
} from "@gitgraph/js";

export default (elementId) => {
    const graphContainer = document.getElementById(elementId);

    // Instantiate the graph.
    const gitgraph = createGitgraph(graphContainer);

    return gitgraph
}