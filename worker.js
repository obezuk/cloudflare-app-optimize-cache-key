addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {

    if (request.method != 'GET') {
        return fetch(request);
    }

    if (typeof INSTALL_OPTIONS == 'undefined') {
        var INSTALL_OPTIONS = 'utm_source,utm_medium,utm_campaign,utm_term,utm_content';
    }

    var blacklisted_params = INSTALL_OPTIONS.split(',');

    var url = new URL(request.url);

    for (var i in blacklisted_params) {
        url.searchParams.delete(blacklisted_params[i])
    }

    var cacheKey = url.toString();

    return fetch(request, {
        "cf": {
            "cacheKey": cacheKey
        }
    });

}