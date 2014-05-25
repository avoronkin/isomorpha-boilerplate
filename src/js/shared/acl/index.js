var Acl = require("virgen-acl").Acl;
var acl = new Acl();
// Set up roles
acl.addRole("guest"); // guest user, inherits from no one
acl.addRole("user", "guest"); // member inherits permissions from guest
acl.addRole("admin"); // Admin inherits from no one

// Set up resources
acl.addResource("todo");
acl.deny(); // deny all by default
acl.allow("admin"); // allow admin access to everything
acl.allow(null, "todo", "view"); // allow everyone to view the blogs
acl.allow("guest", "todo", ["list", "search"]) // supports arrays of actions

acl.allow("user", "todo", "edit", function (err, role, resource, action, done, next) {
    if(role.id){
        done(null, true);
    }else{
        done(null, false);
    }
});

module.exports = acl;
