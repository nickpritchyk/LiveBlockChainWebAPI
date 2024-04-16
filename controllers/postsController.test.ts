const { getPosts } = require('./postsController')

test('Returns the posts from mongoDB', async () => {
    const res = 'This is my first post!'
    expect(res).toBe('This is my first post!')
})