/*	Makes a singleton prototype Class Use like:

var Elvis = SingletonClass.create( [superclass ,] 
{
	sing:
		function(){ alert("Evlis is singing") }
,	swing:
		function(){ alert("Evlis is swinging")}
,	live:
		function(){ alert("Evlis lives!")}
));

Elvis is now a Singleton. This is a normal Prototype class but calls to new 
Elvis() will throw an exception. The Class has a method get() which returns
the single instance

Having created Elvis, we can use him like:

Elvis.get().swing();

SingletonClass.create takes any parameters Class.create does. Returns a Prototype class which cannot
be instantiated, but has a get() function to return the sole instance.
*/
var SingletonClass =
  {
      create:
          function singletonclass__create() {
              var ProtoClass = Class.create.apply(Class, arguments);

              //   instance hidden inside our closure:
              var instance;

              /*   extend the Class created above to make a new class that
                   can only be instantiated once: */
              ProtoClass =
                  Class.create(ProtoClass,
                                {
                                    initialize:
                                        function ($super) {
                                            if (instance)
                                                throw ("On ne peut pas en créer une autre - c'est un singleton ");

                                            $super();
                                        }
                                });

              instance = new ProtoClass();

              //     Allow access to instance via a Class function:
              ProtoClass.get = function () { return instance; };

              return ProtoClass;
          }
  };
