# Setup
To get started run
```
npm i
```

This command installs all packages defined in package.json

After installing all packages, run
```
npm run dev
```
to start the development server.



# Authprovider

Example:
```javascript
const {login} = useAuth();

function myLoginFunction() {
    // ... grab password and username from ui
    login(username, password);
}

return (
    <h1> Hello World! </h1>
    <button onClick={myLoginFunction}>Login!</button>
);
```

Example 2:
```javascript
const {user} = useAuth();

return (
    <div>
        <h1> {user!.email} </h1>
        <div>
            {user && <h3>you are logged in!</h3>}
        </div>
    </div>
);
```
# Directories
## pages
Files in this directory will define different pages.
### Example:
`/pages/login.js` defines the look of the `/login` page.

## public
All files in this directory will be served as static files.

## redux
All files in this directory are used for redux.
Redux is a library for managing state in javascript applications.
If you want to know more about redux, check out the
[docs](https://redux.js.org/tutorials/fundamentals/part-5-ui-react) for react.

## components
All files in this directory define components or other objects like `constants.js`. If you want to create a new component, please use the `.jsx` file extension.
