// So a singleton needs to have a couple of specific features
// There can be only one
// HERE WE ARE, BORN TO BE KINGS
// WE'RE THE PRINCES OF THE UNIVERSE
// And it can't be changed once invoked

// Theoretically an object literal is a singleton
// Except you can add stuff to it

const singleton = {
    name: "Singular McSingleton",
    status: "Not in a relationship",
    greet: (message, name) => {
        console.log(`${message}, ${name}!`);
    }
};

singleton.sex = "Yeah baby!";

console.log("These are the properties of singleton:");
console.log(singleton);

// Alright then, how do we prevent that?

function SingletonThe2nd() {
    // We're making a constructor
    // If there is already an instance, return it instead
    if (SingletonThe2nd) {
    return SingletonThe2nd;
    }
    // We assign the instance to 'this', which will build an object
    SingletonThe2nd.instance = this;
    // Then generic object stuff
    this.name = "Singular McSingleton",
    this.status = "Not in a relationship",
    this.greet = (message, name) => {
        console.log(`${message}, ${name}!`);
    };
}

// Assign a new s2 to variable
let a = new SingletonThe2nd();
// change something in it
a.status = "Yeah, baby!";
// Assign a new s2 to variable
let b = new SingletonThe2nd();
// I'm expecting that both variables will be equal
console.log("I'm expecting that both variables will be equal.");
console.log("a strictly equals b?" + " " + (a === b));
// However, it looks like I changed the status when I did not intend to be able to
// On the other hand, there is still only one instance of the object
// a and b still match
console.log("Now what is in each status?");
console.log("Status:" + " " + a.status);
console.log("Status:" + " " + b.status);

// So this didn't work quite like I expected
// That's not necessarily a bad thing, I suppose
// It looks like I could also add a property to it
// And it'll pop up in both since it's all one instance

a.sex = "Yes, please.";
console.log("Let's see if they both get a new property.");
console.log("Sex:" + " " + a.sex);
console.log("Sex:" + " " + b.sex);
console.log("a strictly equals b?" + " " + (a === b));