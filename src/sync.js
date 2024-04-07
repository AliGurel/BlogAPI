"use strict"

const User = require('./models/user.model')
const { BlogCategory, BlogPost } = require('./models/blog.model')

module.exports = async () => {

    /* BlogCategory */

    // // Get first blogCategory:
    // const blogCategory = await BlogCategory.findOne()
    // // console.log(blogCategory._id)

    // if (blogCategory) {
    //     BlogPost.updateMany({ //? Filter:
    //         "blogCategoryId": { $exists: false } // field yok ise
    //     }, { //? Update:
    //         "blogCategoryId": blogCategory._id // kaydı ata
    //     }).catch(err => console.log(err))
    // }

    /* Exampla Data */
    // Deleted All Records // Veritabanındaki tüm verileri siliniyor:
    await User.deleteMany().then(() => console.log(' - User Deleted All'))
    await BlogCategory.deleteMany().then(() => console.log(' - BlogCategory Deleted All'))
    await BlogPost.deleteMany().then(() => console.log(' - BlogPost Deleted All'))

    // Example User: Örnek bir user hesabı ekleneiyor; test işlemleri için
    const user = await User.create({
        email: "test@test.com",
        password: "12345678",
        firstName: "Test",
        lastName: "Test"
    })

    // Example Category: Örnek bir Blog Kategory oluşturuluyor
    const blogCategory = await BlogCategory.create({
        name: 'Test Category'
    })
    // Example Posts: Örnek 200 adet post oluşturuluyor
    for (let key in [...Array(200)]) {
        await BlogPost.create({
            userId: user._id,
            blogCategoryId: blogCategory._id,
            title: `test ${key} title`,
            content: `test ${key} content`,
            published: Boolean(key % 2) // bi false bi true gelsin
        })
    }

    // End:
    console.log('* Synchronized *')
    /* Finished */
}