import Principal "mo:base/Principal";
import RBTree "mo:base/RBTree";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import Prelude "mo:base/Prelude";
import Int "mo:base/Int";

actor socio {

    type User = {
        userName : Text;
        displayName : Text;
        profilePic : Blob;
        posts: Int;
        following: Int;
        followers: Int;
        bio : Text;
    };

    var users = RBTree.RBTree<Principal, User>(Principal.compare); // storage for users.
    var userNames = RBTree.RBTree<Text, Principal>(Text.compare); // storage for usernames.

    // function to return the princiapl

    public func whoami(identity : Text) : async Text{
        return(identity);
    };

    //function to check if user already exists.

    public query func checkUser(userprincipal : Text) : async {
        status : Nat;
        msg : Text;
    }{
        var principal = Principal.fromText(userprincipal);
        var userExists = users.get(principal);
        switch(userExists){
            case(null){
                return {
                    status = 0;
                    msg = "No user found";
                };
            };
            case(User){
                return{
                    status = 1;
                    msg = "User already exists";
                };
            };
        };
    };

    //function to create a new User.

    public func createNewUser(identity : Text, username : Text, displayname : Text, profilepic : Blob, userbio : Text) : async {
        status : Nat;
        msg : Text;
    } {
        var principal = Principal.fromText(identity);
        if (not Principal.isAnonymous(principal)) {
            var userExist = users.get(principal);
            switch (userExist) {
                case (null) {
                    var newUser : User = {
                        userName = username;
                        displayName = displayname;
                        profilePic = profilepic;
                        posts = 0;
                        following = 0;
                        followers = 0;
                        bio = userbio;
                    };
                    users.put(principal, newUser);
                    userNames.put(username,principal);
                    return {
                        status = 0;
                        msg = "User created succesfully";
                    };
                };
                case (User) {
                    return {
                        status = 1;
                        msg = "User already exists";
                    };
                };
            };
        } else {
            return {
                status = 1;
                msg = "Please connect to Internet Identity";
            };
        };
    };

    //function to check if username is taken.

    public query func checkUsername(username:Text) : async {
        status : Nat;
        msg : Text;
    }{
        var userNameExists = userNames.get(username);
        switch(userNameExists){
            case(null){
                return {
                    status = 0;
                    msg = "Username is available";
                }
            };
            case(Principal){
                return {
                    status = 1;
                    msg = "Username already taken";
                };
            }
        };
    };

    public func getProfile(identity : Text) : async ?User{
        switch(users.get(Principal.fromText(identity))){
            case (null){
                return null;
            };
            case(user){
                return user;
            };
        };
    };

};
