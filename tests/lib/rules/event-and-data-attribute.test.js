/* eslint-env jest */
/**
 * @fileoverview Ensure autocomplete attribute is correct.
 * @author Wilco Fiers
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../lib/rules/events-and-data-attributes';
import { eventHandlers } from 'jsx-ast-utils';
const defaultParserOptions = {
    ecmaVersion: 2018,
    ecmaFeatures: {
        experimentalObjectRestSpread: true,
        jsx: true
    }
};

function parserOptionsMapper({
    code,
    errors,
    options = { name: 'test' },
    parserOptions = {}
}) {
    return {
        code,
        errors,
        options,
        parserOptions: {
            ...defaultParserOptions,
            ...parserOptions
        }
    };
}

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const eventHandlerNames = Object.values(eventHandlers)
    .flat()
    .reduce((acc, name) => acc.concat([name, name.toLowerCase()]), []);

console.log(rule);

ruleTester.run('autocomplete-valid', rule, {
    valid: [
        // INAPPLICABLE
        { code: '<Test />;' },
        { code: '<Test onClick="test"/>;' },
        { code: '<Test onAnything="test"/>;' },
        // // PASSED AUTOCOMPLETE
        { code: '<div onClick="test"/>;' },
        { code: '<div data-cy="test" onclick="test"/>;' },
        { code: '<div onClick="test" data-cy="test"/>;' },
        { code: '<div onclick="test" data-cy="test"/>;' }
    ].map(parserOptionsMapper),
    invalid: eventHandlerNames.map(handlerName => ({
        code: `<div ${eventHandlerNames}={()=>""}>`,
        option: {}, //{ name: 'test' },
        errors: [
            {
                message: new RegExp(`${eventHandlerNames}`)
            }
        ]
    }))
});
