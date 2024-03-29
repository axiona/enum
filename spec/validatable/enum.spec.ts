import {EnumParameters} from '../../dist/validatable/enum.js';
import EnumMessage from '../../dist/assert/string/enum.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

describe(`compiler compatible`,function() {

    enum EnumSpec {
        DATA = 'DATA',
        VALUE = 'VALUE'
    }

    it(`valid value`,function() {

        const validatable = EnumParameters(<unknown>'DATA', EnumSpec, EnumMessage.Parameters);

        if(validatable.valid) {

            // compiler pass
            const number : EnumSpec = validatable.value;
            expect(number).toBe(EnumSpec.DATA);

        } else {

            // @ts-expect-error
            const number : EnumSpec = validatable.value;
            fail('validatable.valid should false');
        }
    });

    it(`invalid value`,function() {

        const validatable = EnumParameters(<unknown>{}, EnumSpec, EnumMessage.Parameters);

        if(validatable.valid) {

            // compiler pass
            const number : EnumSpec = validatable.value;
            fail('validatable.valid should false');

        } else {

            // @ts-expect-error
            const number : EnumSpec = validatable.value;
            // @ts-expect-error
            expect(number).toEqual({});
        }
    });

    it(`readonly`,function() {

        const validatable = EnumParameters(<unknown>EnumSpec.DATA, EnumSpec, EnumMessage.Parameters);

        try {
            // @ts-expect-error
            validatable.valid = true;
            fail('exception should thrown');
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }

        try {
            // @ts-expect-error
            validatable.value = true;
            fail('exception should thrown');
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }

        try {
            // @ts-expect-error
            validatable.message.js = 'message';
            fail('exception should thrown');
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }

    });
});

describe(`compiler compatible`,function() {

    enum EnumSpec {
        DATA = 'DATA',
        VALUE = 'VALUE'
    }

    it(`valid enum`,function() {

        const validatable = EnumParameters(EnumSpec.DATA, EnumSpec, EnumMessage.Parameters);

        expect(validatable.valid).toBe(true);
        expect(validatable.value).toBe(EnumSpec.DATA);
        expect(typeof validatable.message).toBe('string');

    });

    it(`valid string`,function() {

        const validatable = EnumParameters('DATA', EnumSpec, EnumMessage.Parameters);

        expect(validatable.valid).toBe(true);
        expect(validatable.value).toBe('DATA');
        expect(typeof validatable.message).toBe('string');

    });

    it(`invalid`,function() {

        const validatable = EnumParameters('a', EnumSpec, EnumMessage.Parameters);

        expect(validatable.valid).toBe(false);
        expect(validatable.value).toBe('a');
        expect(typeof validatable.message).toBe('string');

    });

});



