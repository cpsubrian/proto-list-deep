var tap = require("tap"),
    test = tap.test,
    ProtoListDeep = require("../");

tap.plan(1);

tap.test("fetch deep-merged snapshots", function (t) {
  var p = new ProtoListDeep();

  p.push({
    drink: {
      soda: 'coke'
    }
  });

  p.push({
    food: {
      fruit: {
        red: ['strawberry']
      },
      meat: {
        white: ['pork']
      }
    }
  });

  p.push({
    food: {
      fruit: {
        green: ['apple', 'lime']
      },
      meat: {
        red: ['steak'],
        white: ['chicken']
      },
      carb: 'rice'
    }
  });

  // Test the deep snapshot.
  var deep = p.deepSnapshot;
  t.equal(deep.drink.soda, 'coke');
  t.equal(deep.food.fruit.red[0], 'strawberry');
  t.equal(deep.food.fruit.green[1], 'lime');
  t.equal(deep.food.meat.red[0], 'steak');

  // Make sure we did not disturb the core proto-list functionality.
  t.equal(p.get('food').meat.white[0], 'pork');

  t.end();
});
