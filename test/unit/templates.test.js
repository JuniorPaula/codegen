import { expect, describe, test, jest, beforeEach } from '@jest/globals'

import templates from '../../src/templates/index.js'
const { repositoryTemplate } = templates

import { repositoryTemplateMock } from './mocks/index.js'

describe('#Codegen 3-layer arch', () => {
    const productName = 'product'
    const repositoryName = `${productName}Repository`
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test.todo('#Should generate repository template')
    test.todo('#Should generate service template')
    test.todo('#Should generate factory template')
})