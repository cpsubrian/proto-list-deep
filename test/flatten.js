var tap = require("tap"),
    test = tap.test,
    ProtoListDeep = require("../");

tap.plan(1);

tap.test("flatten and unflatted", function (t) {
  var p = new ProtoListDeep();

  var flat = p.flatten({
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
  t.equal(flat['food:carb'], 'rice');
  t.equal(flat['food:fruit:green'][0], 'apple');

  var deep = p.unflatten(flat);
  t.equal(deep.food.carb, 'rice');
  t.equal(deep.food.meat.red[0], 'steak');

  t.end();
});
