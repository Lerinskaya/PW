interface ICredentials {
    username: string;
    password: string;
}

interface IUserData {
    credentials: ICredentials;
    loginCredentials?: ICredentials;
    message: string;
    title: string;
}

export enum NOTIFICATIONS {
    REGISTRATION_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    REGISTRATION_FAIL_MIN_PASSWORD = "Password should contain at least 8 characters",
    REGISTRATION_FAIL_EMPTY = "Please, provide valid data",
    REGISTRATION_FAIL_LOWERCASE = "Password should contain at least one character in lower case",
    REGISTRATION_FAIL_SHORT_USERNAME = "Username should contain at least 3 characters",
    REGISTRATION_FAIL_SPACES = "Prefix and postfix spaces are not allowed is username",
    LOGIN_FAIL = "Invalid credentials",
    EMPTY_REGISTER_FORM = "Please, provide valid data",
    LOGIN_FAIL_EMPTY_CREDS = "Credentials are required",
    LOGIN_FAIL_EMPTY_PASSWORD = "Password is required",
    LOGIN_FAIL_EMPTY_USERNAME= "Username is required"
}

export const userData: IUserData[] = [
    { 
        credentials: {username: "username", password: "Qwerty12345!"}, 
        message: NOTIFICATIONS.REGISTRATION_SUCCESS, 
        title: "Should register with smoke credentials"
    },
    { 
        credentials: {username: "Amy", password: "Qwerty12"}, 
        message: NOTIFICATIONS.REGISTRATION_SUCCESS, 
        title: "Should register with min valid credentials"
    },
    { 
        credentials: {username: "Amy", password: "Qwerty12345678900000"}, 
        message: NOTIFICATIONS.REGISTRATION_SUCCESS, 
        title: "Should register with max valid credentials"
    }
    ]

export const invalidUserData: IUserData[] = [
    { 
        credentials: {username: "A", password: "qwer"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_EMPTY, 
        title: "Should not register with invalid credentials"
    },
    { 
        credentials: {username: "user", password: "Qwerty1"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_MIN_PASSWORD, 
        title: "Should not register with less than 8 chars in password"
    },
    { 
        credentials: {username: "Amy", password: "Qwerty123456789000001"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_EMPTY, 
        title: "Should not register with more than 20 chars in password"
    },
    { 
        credentials: {username: "Amy", password: "qwerty12"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_EMPTY, 
        title: "Should not register with no capital letter in password"
    },
    { 
        credentials: {username: "Amy", password: "QWERTY12"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_LOWERCASE, 
        title: "Should not register with no lowercase letter in password"
    },
    { 
        credentials: {username: "Amy", password: "QWERTYwe"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_EMPTY, 
        title: "Should not register with no numbers in password"
    },
    { 
        credentials: {username: "Am", password: "Qwerty123!"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_SHORT_USERNAME, 
        title: "Should not register with less than 3 letters in username"
    },
    { 
        credentials: {username: "Amyloraertyuertyuertyuertyuertyuuuiiooppo", password: "Qwerty123!"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_EMPTY, 
        title: "Should not register with more than 40 letters in username"
    },
    { 
        credentials: {username: " Amy", password: "Qwerty123!"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_SPACES, 
        title: "Should not register with a prefix space in username"
    },
    { 
        credentials: {username: "Amy ", password: "Qwerty123!"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_SPACES, 
        title: "Should not register with a postfix space in username"
    },
    { 
        credentials: {username: "    ", password: "Qwerty123!"}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_SPACES, 
        title: "Should not register with spaces in username"
    },
    { 
        credentials: {username: "", password: ""}, 
        message: NOTIFICATIONS.REGISTRATION_FAIL_EMPTY, 
        title: "Should not register with empty credentials"
    }
]

export const invalidLoginData: IUserData[] = [
    { 
        credentials: {username: "username", password: "Qwerty12345!"}, 
        loginCredentials: {username: "username", password: "Qwerty12345"},
        message: NOTIFICATIONS.LOGIN_FAIL, 
        title: "Should not login with incorrect password"
    },
    { 
        credentials: {username: "username", password: "Qwerty12345!"}, 
        loginCredentials: {username: "user", password: "Qwerty12345!"},
        message: NOTIFICATIONS.LOGIN_FAIL, 
        title: "Should not login with incorrect username"
    },
    { 
        credentials: {username: "username", password: "Qwerty12345!"}, 
        loginCredentials: {username: "", password: ""},
        message: NOTIFICATIONS.LOGIN_FAIL_EMPTY_CREDS, 
        title: "Should not login with empty inputs"
    },
    { 
        credentials: {username: "username", password: "Qwerty12345!"}, 
        loginCredentials: {username: "username", password: ""},
        message: NOTIFICATIONS.LOGIN_FAIL_EMPTY_PASSWORD, 
        title: "Should not login with empty password"
    },
    { 
        credentials: {username: "username", password: "Qwerty12345!"}, 
        loginCredentials: {username: "", password: "Qwerty12345!"},
        message: NOTIFICATIONS.LOGIN_FAIL_EMPTY_USERNAME, 
        title: "Should not login with empty username"
    },
    ]