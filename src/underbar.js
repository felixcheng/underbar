/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
   _.first = function(array, n) {
    if (arguments.length === 1){
      return array[0];
    } else {
      return array.slice(0, n);
    }
    
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (arguments.length === 1){
      return array[array.length - 1];
    } else {
      if (n > array.length) {
        n = array.length;
      }
      return array.slice(array.length - n, array.length);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for (var e in collection) {
      iterator(collection[e], e, collection);
    };
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var ans = -1
    _.each(array, function(value, ind){
      if (value === target && ans === -1){
        ans = ind;
      }
    })
    return parseInt(ans);
  };

  

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var answer = [];
    _.each(collection, function(value){
      if (iterator(value)){
        answer.push(value);
      }
    })
    return answer;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(value, index, list) {
      return !iterator.call(this, value, index, list);
    }, context);
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var ans =[];
    var check = {};
    _.each(array, function(value, index){
      if (check[value] == null){
        ans.push(value);
        check[value] = true;
      }
    })

    return ans;
    
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var ans = [];
    _.each(array, function(value){
      ans.push(iterator(value));
    })
    return ans;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if (typeof(methodName) == 'function') {
      return _.map(list, function(value) {
        return methodName.apply(value);}
    )}  else {
    return _.map(list, function(value) {
      return value[methodName]();}
    );
  };}

  
  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    if (arguments.length < 3){
      initialValue = 0;
    }
    var total = initialValue;
    _.each(collection, function(value){
        total = iterator(total, value);
    });
    return total;
  };
 

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (arguments.length < 2){
      iterator = function (value){
        return (value == true);
      }
    }
    return _.reduce(collection, function(bool, item){
      if (iterator(item) != true){
          bool = false;
      }
      return bool;}, 
      true);  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (arguments.length < 2){
      iterator = function (item){
        return (item);
      }
    }
  
    var bool = _.every(collection, function(item){
      return !iterator(item);
    })

    if (bool){
      return false
    }  else {
      return true
    }
  }; 



  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
      for (var e in arguments){
        _.each(arguments[e], function(item, prop) {
          obj[prop] = item;
        })
      }
      return obj;
    }


  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
      for (var e in arguments){
        _.each(arguments[e], function(item, prop) {
          if (obj[prop]== null){
            obj[prop] = item;}
        })
      }
      return obj;
  }


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var storedObj = {};
    return function (n) {
      if (storedObj[n] == null){
        storedObj[n] = func(n);
      }
      return storedObj[n];
    }
  }

    

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var para = (Array.prototype.slice.call(arguments, 2));
    return setInterval(function(){return func.apply(this, para); }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var ans =[];
    while (array.length > 0) {
      var ind = Math.floor(Math.random() * (array.length + 1));
      ans.push(array[ind]);
      array = array.splice(ind, 1);
    }
    return ans;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof(iterator) == 'string'){
      var methodName = iterator;
      iterator = function(x){return x[methodName]}
    }

    collection.sort(function (a, b) {
    if (iterator(a) > iterator(b)){
      return 1;
    }
    else if (iterator(a) < iterator(b)){
      return -1;
    }
    return 0;
    });

    
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var counter = arguments.length;
    var maxLength = 0;
    for (n in arguments){
      if (arguments[n].length > maxLength){
        maxLength = arguments[n].length;
      }
    }

    var ans = [];
         
      for (var n = 0 ; n < maxLength; n++){
        var ansPart = [];
        for (var m = 0; m < counter; m++){
            ansPart.push(arguments[m][n])
        }
      ans.push(ansPart);
      }
      
    
    return ans;
    
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if (arguments.length < 2){
      result = [];
    }
    _.each(nestedArray, function(value){
      if (Array.isArray(value)){
        _.flatten(value, result)
      } else {
        result.push(value);
      }
    })
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var counter = arguments.length;
    var ans = [];
    for (var e = 0; e < arguments[0].length; e++){
      var n =0;
      for(var i =0; i < counter; i++){
        if (_.contains(arguments[i], arguments[0][e])){
          n++;
          if (n === counter){
            ans.push(arguments[0][e]);
    } } } }
        
    return ans;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var counter = arguments.length;
    var ans = [];
    for (var e = 0; e < arguments[0].length; e++){
      var n =0;
      for(var i =0; i < counter; i++){
        if (_.contains(arguments[i], arguments[0][e])){
          n++;
        }}
        if (n < 2){
            ans.push(arguments[0][e]);
    } } 
        
    return ans;
  };



  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.

  _.throttle = function(func, wait) {
    // if not called within 'wait' - execute the function
    //else- waited a certain period of time ()
    var last = 0;     
    var para = (Array.prototype.slice.call(arguments, 2));
    //var exe = func.apply(this, para);
    var res;

    return function(){
      var now = new Date();

      if (now - last >= wait){
          last = now;
          res = func.apply(this, para); 
          return res;

      } 
      return res;
    }   
   
  }

  /*_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };*/

}).call(this);
