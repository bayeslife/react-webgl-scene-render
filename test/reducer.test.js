import { describe } from 'riteway';
import { reducer, click } from '../src/click-reducer';

describe('click counter reducer', async assert => {

        assert({
            given: 'no arguments',
            should: 'return the valid initial state',
            actual: reducer(),
            expected: 0
        });

        assert({
            given: 'initial state and a click action',
            should: 'add a click to the count',
            actual: reducer(undefined, click()),
            expected: 1
        });
        assert({
            given: 'a click count and a click action',
            should: 'add a click to the count',
            actual: reducer(3, click()),
            expected: 4
        });

});