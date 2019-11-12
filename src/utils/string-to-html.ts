export function htmlToElement(htmlString: string): Element {
    const div = document.createElement('div');
    div.innerHTML = htmlString;

    // Change this to div.childNodes to support multiple top-level nodes
    // @ts-ignore
    return div.firstChild;
}
