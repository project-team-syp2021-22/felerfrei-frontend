### To get started run 
```
npm i
```
this command installs all packages defined in package.json


### To see the Sign-In page go to
http://localhost:3000/Sign_In



## Authprovider

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
