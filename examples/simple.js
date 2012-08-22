var ProtoListDeep = require('../');
var p = new ProtoListDeep();

p.push({
  fruit: { green: 'apple' }
});
p.push({
  fruit: { green: 'lime', yellow: 'lemon' }
});

console.log('Snapshot:');
console.log(p.snapshot);

console.log('---');

console.log('Deep Snapshot:');
console.log(p.deepSnapshot);
