`test/` directory use to save test-case file. 

We can type `yarn run test:app` to start testing in termial.

and example is

```javascript
import { expect } from 'chai';

describe('Test Group Name', () => {

    it('Test Case Name', () => {

    });

    it('Test Case Name', (done) => {

        done();
    });
});
```

for [more about mocha](http://mochajs.org/#usage);
for [more about chai](http://chaijs.com/api/bdd/#method_true);
