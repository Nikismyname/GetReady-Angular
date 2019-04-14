export function replaceTags(str) {
    return str.replace(/[<>]/g, replaceTag);
}
function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}
var tagsToReplace = {
    '<': '&lt;',
    '>': '&gt;'
};

export function trimEnds(chunk) {
    if (chunk.startsWith("\n")) {
        chunk = chunk.slice(1);
    }
    // if (chunk.endsWith("\n")) {
    //     chunk = chunk.slice(0,chunk.length-1);
    // }
    return chunk
}