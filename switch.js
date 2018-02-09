let user = {     // an object
  name: "John",  // by key "name" store value "John"
  age: 30,        // by key "age" store value 30
  warnen: () => {
    console.warn('ACHTUNG');
  },
  isAdmin: true,
  toString: function () {
    return this.name;
  }
};

onload = () => {
  div = document.getElementById('user');
  div.append(user);
};
