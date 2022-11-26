import { expect, describe, test, jest, beforeEach } from '@jest/globals'

import templates from '../../src/templates/index.js'
const { repositoryTemplate } = templates

import { repositoryTemplateMock } from './mocks/index.js'

describe('#Codegen 3-layer arch', () => {
    const componentName = 'product'
    const repositoryName = `${componentName}Repository`
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('#Should generate repository template', () => {
        const expected = {
            fileName: repositoryName,
            template: repositoryTemplateMock
        }

        const result = repositoryTemplate(componentName)
        expect(result).toStrictEqual(expected)
    })
    test.todo('#Should generate service template')
    test.todo('#Should generate factory template')
})