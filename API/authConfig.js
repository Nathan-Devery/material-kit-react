const passportConfig = {
    credentials: {
        tenantName: 'generatorapps.onmicrosoft.com',
        clientID: '29b06c98-cb1b-423a-a69d-0859968609c1',
    },
    policies: {
        policyName: 'B2C_1_signupsignin1',    
    },
    metadata: {
        b2cDomain: 'generatorapps.b2clogin.com',
        authority: 'login.microsoftonline.com',
        discovery: '.well-known/openid-configuration',
        version: 'v2.0',
    },
    settings: {
        isB2C: true,
        validateIssuer: false,
        passReqToCallback: true,
        loggingLevel: 'info',
        loggingNoPII: false,
    },
    protectedRoutes: {
        todolist: {
            endpoint: '/api/todolist',
            delegatedPermissions: {
                read: ['ToDoList.Read', 'ToDoList.ReadWrite'],
                write: ['ToDoList.ReadWrite'],
            },
        },
    },
};

module.exports = passportConfig;

