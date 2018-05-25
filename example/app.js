// Set up ADAL
var authContext = new AuthenticationContext({
    tenant:'29abf16e-95a2-4d13-8d51-6db1b775d45b', 
    clientId: '4fee1b89-deee-4f74-9b13-684872c8b6e4',
    redirectUri:"http://localhost:8080/", 
    postLogoutRedirectUri:"http://localhost:8080/" 
});

// Make an AJAX request to the Microsoft Graph API and print the response as JSON.
var getCurrentUser = function (access_token) {
  //  document.getElementById('api_response').textContent = 'Calling API...';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://graph.microsoft.com/v1.0/me', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Do something with the response
           // document.getElementById('api_response').textContent =
            //    JSON.stringify(JSON.parse(xhr.responseText), null, '  ');
        } else {
            // TODO: Do something with the error (or non-200 responses)
           //document.getElementById('api_response').textContent =
            //    'ERROR:\n\n' + xhr.responseText;
        }
    };
    xhr.send();
}


if (authContext.isCallback(window.location.hash)) {

    // Handle redirect after token requests
    authContext.handleWindowCallback();
    var err = authContext.getLoginError();
    if (err) {
        // TODO: Handle errors signing in and getting tokens
        document.getElementById('api_response').textContent =
            'ERROR:\n\n' + err;
    }

} else {

    // If logged in, get access token and make an API request
    var user = authContext.getCachedUser();
    if (user) {

        //document.getElementById('username').textContent = 'Signed in as: ' + user.userName;
        document.getElementById('displayname').textContent = user.profile.name;
        //document.getElementById('api_response').textContent = 'Getting access token...';
        
        // Get an access token to the Microsoft Graph API
        authContext.acquireToken(
            'https://graph.microsoft.com',
            function (error, token) {

                if (error || !token) {
                    // TODO: Handle error obtaining access token
                    document.getElementById('api_response').textContent =
                        'ERROR:\n\n' + error;
                    return;
                }

                // Use the access token
                getCurrentUser(token);
            }
        );

    } else {
       // document.getElementById('username').textContent = 'Not signed in.';
        authContext.login();
    }
}