import { UserManager, WebStorageStateStore, Log } from "oidc-client";

// All the env variables should be defined in the /.env file
const IDENTITY_CONFIG = {
    authority: process.env.REACT_APP_AUTH_URL, //(string): The URL of the OIDC provider.
    client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID, //(string): Your client application's identifier as registered with the OIDC provider.
    redirect_uri: process.env.REACT_APP_REDIRECT_URL, //The URI of your client application to receive a response from the OIDC provider.
    login: process.env.REACT_APP_AUTH_URL + "/login",
    automaticSilentRenew: false, //(boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
    loadUserInfo: false, //(boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
    // silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URL, //(string): The URL for the page containing the code handling the silent renew.
    post_logout_redirect_uri: process.env.REACT_APP_LOGOFF_REDIRECT_URL, // (string): The OIDC post-logout redirect URI.
    audience: "https://example.com", //is there a way to specific the audience when making the jwt
    scope: "openid", //(string, default: 'openid'): The scope being requested from the OIDC provider.
    // Helpful as Azure tenant OIDC does not seem to return a /checksession endpoint
    monitorSession: false,
    response_type: "id_token token",
    // metadataSeed: {
    //     check_session_iframe: process.env.REACT_APP_AUTH_URL + "/checksession",
    // },
};

export default class AuthService {
    UserManager;

    constructor() {
        this.UserManager = new UserManager({
            ...IDENTITY_CONFIG,
            userStore: new WebStorageStateStore({ store: window.sessionStorage }),
        });

        // Logger
        Log.logger = console;
        Log.level = Log.INFO;

        this.UserManager.events.addUserLoaded((user) => {
            if (window.location.href.indexOf("signin-oidc") !== -1) {
                console.log("UserManager() event addUserLoaded has triggered navigateToScreen(), here's the user record:", user);
                this.navigateToScreen();
            }
        });
        this.UserManager.events.addSilentRenewError((e) => {
            console.log("UserManager() event addSilentRenewError triggered, no action taken", e.message);
        });

        this.UserManager.events.addAccessTokenExpired(() => {
            console.log("UserManager() event addAccessTokenExpire triggered, no action taken");
            this.logout();
        });
    }

    signinRedirectCallback = () => {
        console.log("signinRedirectCallback()");
        this.UserManager.signinRedirectCallback().then((user) => {
            console.warn("signinRedirectCallback() and user:", user);
        });
    };

    getUser = async () => {
        const user = await this.UserManager.getUser();
        if (!user) {
            return await this.UserManager.signinRedirectCallback();
        }
        return user;
    };

    parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    signinRedirect = () => {
        console.log("signinRedirect() with location:", window.location.pathname);
        localStorage.setItem("redirectUri", window.location.pathname);
        this.UserManager.signinRedirect({});
    };

    navigateToScreen = () => {
        console.log("navigateToScreen()");
        window.location.replace("/dashboard");
    };

    isAuthenticated = () => {
        // There are two ways to perform this function
        // 1) Perform the same effect by using UserManager.getUser() which is async, and annoying to wait for
        // 2) Use sessionStorage.getItem to manually get the object (and access_token) that should be there
        // Method 2 has the same effect, and is sync, so we use that

        const oidcStorage = JSON.parse(
            sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`)
        );

        // If there's an access_token, in the oidc-client user object, then the user is likely authenticated (could be expired)
        return !!oidcStorage?.access_token;
    };

    signinSilent = () => {
        this.UserManager.signinSilent()
            .then((user) => {
                console.log("signed in", user);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    signinSilentCallback = () => {
        this.UserManager.signinSilentCallback();
    };

    createSigninRequest = () => {
        return this.UserManager.createSigninRequest();
    };

    logout = () => {
        this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token"),
        });
        this.UserManager.clearStaleState();
    };

    signoutRedirectCallback = () => {
        this.UserManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
            window.location.replace(process.env.REACT_APP_PUBLIC_URL);
        });
        this.UserManager.clearStaleState();
    };
}
