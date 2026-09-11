const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    const total = array.reduce((a,b) => {
        return (a + b.likes)
    }, 0)
    return total
}

const favoriteBlog = (array) => {
    let most = 0
    let theBlog = {}
    array.forEach(value => {
        if (most < value.likes) {
            most = value.likes
            theBlog = value
        }
    })
    return theBlog
}

const mostBlogs = (array) => {
    let counter = {}
    let maxValue = {author: "", blogs: 0}
    array.forEach(value => {
        if (counter[value.author] == null) {
            counter[value.author] = 1
        } else {
            counter[value.author] += 1
        }
        if (maxValue.blogs < counter[value.author]) {
                maxValue.author = value.author
                maxValue.blogs = counter[value.author]
        }
    })
    return maxValue
}

const mostLikes = (array) => {
    let counter = {}
    let maxValue = {author: "", likes: 0}
    array.forEach(value => {
        if (counter[value.author] == null) {
            counter[value.author] = value.likes
        } else {
            counter[value.author] += value.likes
        }
        if (maxValue.likes < counter[value.author]) {
            maxValue.author = value.author
            maxValue.likes = counter[value.author]
        }
    })
    return maxValue
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}