import { expect, describe, test, jest, beforeEach, beforeAll, afterAll } from '@jest/globals'

import { tmpdir } from 'os'
import { join } from 'path'
import fsPromises from 'fs/promises'

import createLayersIfNotExists from '../../src/createLayers.js'

async function getfolders({ mainPath, defaultMainFolder }) {
    return fsPromises.readdir(join(mainPath, defaultMainFolder))
}

describe('#Integration - Layers - Folders Structure', () => {
    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        layers: ['service', 'repository', 'factory'].sort()
    }

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
        
    })

    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true })
    })

    test('should not create folders if it exists', async () => {
        const beforeRun = await fsPromises.readdir(config.mainPath)

        await createLayersIfNotExists(config)

        const afterRun = await getfolders(config)
        expect(beforeRun).not.toStrictEqual(afterRun)
        expect(afterRun).toEqual(config.layers)
    })
    test('should create folders if it exists', async () => {
        const beforeRun = await getfolders(config)
        await createLayersIfNotExists(config)
        
        const afterRun = await getfolders(config)
        expect(afterRun).toEqual(beforeRun)
    })
})