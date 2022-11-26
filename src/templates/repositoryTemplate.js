const template = `
export default class Repository {

    create(data) {
        return Promise.reject('method not implemented!')
    }

    read(query) {
        return Promise.reject('method not implemented!')
    }

    update(id, data) {
        return Promise.reject('method not implemented!')
    }

    delete(id) {
        return Promise.reject('method not implemented!')
    }
}
`

export function repositoryTemplate(componentName) {}
