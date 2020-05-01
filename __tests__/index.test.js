import { main } from '../src';

test('displays a joke', () => {
  main(['/usr/bin/node', 'chuck', 'joke']);
});