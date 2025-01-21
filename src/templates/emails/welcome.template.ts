export const welcomeTemplate = {
    subject: 'Welcome to Theralink',
    template: `
        {{> header }}
        <h1>Welcome to Theralink</h1>
        <p>Your account has been created successfully.</p>
        <p>Here are your login credentials:</p>
        <p><strong>Username:</strong> {{username}}</p>
        <p><strong>Password:</strong> {{password}}</p>
        <p>Please change your password after your first login.</p>
        {{> footer }}
    `
};
