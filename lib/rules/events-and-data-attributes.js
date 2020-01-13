/**
 * @fileoverview Enforce controls are associated with a data-{attribute} label.
 * @author Danny Michaelis
 *
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { hasProp, eventHandlers, hasAnyProp, propName } from 'jsx-ast-utils';
// import type { JSXElement } from 'ast-types-flow';
// import { generateObjSchema, arraySchema } from '../util/schemas';
// import type { ESLintContext } from '../../flow/eslint';
// import isDOMElement from '../util/isDOMElement';

const errorMessage = (elementTag, eventHandlersList, name) =>
    `${elementTag} has [ ${eventHandlersList.join(
        ', '
    )} and no \`data-${name}\` attribute for End-to-End testing. ]`;

const hasEventHandler = element =>
    hasAnyProp(element.attributes, eventHandlers, { spreadStrict: false });

const isDataAttribute = name => name.startsWith('data-');

const hasDataAttribute = element =>
    element.attributes.some(attr => isDataAttribute(propName(attr)));

const getEventHandlers = element =>
    eventHandlers.filter(handlerName =>
        hasProp(element.attributes, handlerName, { spreadStrict: false })
    );

const rule = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'Ensure event-handlers have a coresponding test attribute',
            category: 'Possible Errors',
            recommended: true,
            url: ''
        },
        schema: [
            {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    }
                },
                required: ['name']
            }
        ]
    },
    create: context => {
        const { name = 'test' } = context.options[0] || {};
        console.log(context);
        const rule = node => {
            console.log(node);
            const el = node;

            if (!hasEventHandler(el) || hasDataAttribute(el)) {
                return;
            }
            const tag = node.name;
            const eventHandlerNames = getEventHandlers(el);
            context.report({
                node,
                message: errorMessage(tag, eventHandlerNames, name)
            });
        };

        // Create visitor selectors.
        return {
            'JSXOpeningElement[name=/^[a-z]/]': rule
        };
    }
};

export default rule;
