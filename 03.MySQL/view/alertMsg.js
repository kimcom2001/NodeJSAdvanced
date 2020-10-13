module.exports.alertMsg = function(message, url) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Alert Message</title>
            <meta charset="utf-8">
        </head>
        <body>
            <script>
                let message = '${message}';
                let returnUrl = '${url}';
                alert(message);
                document.location.href = returnUrl;
            </script>
        </body>
        </html>
    `;
}