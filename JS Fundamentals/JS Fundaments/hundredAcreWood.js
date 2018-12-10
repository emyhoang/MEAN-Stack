var tigger = { character: "Tigger" };

var pooh = { character: "Winnie the Pooh" };
tigger.north = pooh;
pooh.south = tigger;

var piglet = { character: "Piglet" };
piglet.east = pooh;
pooh.west = piglet;

var bees = { character: "bees" };
bees.west = pooh;
pooh.east = bees;

var christopherRobin = { character: "christopher robin" };
pooh.north = christopherRobin;
christopherRobin.south = pooh;

var owl = { character: "owl" };
owl.south = piglet;
piglet.north = owl;
owl.east = christopherRobin;
christopherRobin.west = owl;

var rabbit = { character: "rabbit" };
rabbit.south = bees;
bees.north = rabbit;
rabbit.west = christopherRobin;
christopherRobin.east = rabbit;

var gopher = { character: "gopher" };
gopher.west = rabbit;
rabbit.east = gopher;

var kanga = { character: "kanga" };
kanga.south = christopherRobin;
christopherRobin.north = kanga;

var eeyore = { character: "eeyore" };
eeyore.south = kanga;
kanga.north = eeyore;

var heffalumps = { character: "heffalumps" };
heffalumps.west = eeyore;
eeyore.east = heffalumps;












