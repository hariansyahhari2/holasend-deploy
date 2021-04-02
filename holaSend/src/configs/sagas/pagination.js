const pagination = (action) => {
    let parameter = ''

    if (action.pagination.page) {
        parameter+=`page=${action.pagination.page}`
    }

    if (action.pagination.size) {
        if (parameter.length > 0) {
            parameter+="&"
        }
        parameter+=`size=${action.pagination.size}`
    }

    return parameter
}

export default pagination