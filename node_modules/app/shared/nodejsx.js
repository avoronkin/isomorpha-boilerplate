var isClient = (typeof window != "undefined");
if (!isClient) {
    require('node-jsx').install({
        extension: '.jsx'
    });
}
