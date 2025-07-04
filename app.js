getPost();
 const newPost = post => {
    const options = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type' : 'application/json'
        }
    }
   
    return fetch(' https://developer.themoviedb.org/reference/search-movie',options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.error('Error: ${error}'))
 }
