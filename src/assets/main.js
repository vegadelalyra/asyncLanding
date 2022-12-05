/**
 *? APIS & FRAMEWORKS USED FOR THIS PROJECT // what are they // where did we use it
 ** TailwindCSS // CSS Framework eases html style just editing classes  // Brought as script at our index.html file, tag classes edits html elements styles
 ** RapidAPI // World's largest API marketplace // from here we got the API which provided us youtube channels data
 ** Youtube v3 API // Public API gathered from RapidAPI, provides data from any youtube channel //  we copied the URL API and options object for our code
 */

// ? We got API address options object from Youtube v3 API at RapidAPI 
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCNYW2vfGrUE6R5mIJYzkRyQ&part=snippet%2Cid&order=date&maxResults=9'
const content = null || document.querySelector('#content')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0d4802d552msh7e067ca24f9ee34p1f1243jsn4d6b9f0f8791',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
}

// ? async fetch handler function
async function fetchData(urlApi) {
    const response = await fetch(urlApi, options)
    const data = await response.json()
    return data
}

// * This anonymous arrow function is gonna call our logic asynchronously as soon as the script runs
// ? You can save the calling line of a function just adding a () at the end of your fn to initialize it
// ? With this syntax: (() => {})() or (async () => {})() for async fns
(async () => {
    // * This function will handle the promise (or async data) of the fetch with try...catch... keywords.
    try {
        const videos = await fetchData(API)
        let view =  `
            ${videos.items.map(video => `
                <div class="group relative">
                    <div class=" w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-90 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-100">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            `).slice(0, 4).join('')
        }`
        content.innerHTML = view
    } catch (error) {
        console.log(error)
    } finally {
        console.log('All async processes have finished! :D')
    }
})()

// ? Although This code block came with the script from Youtube v3, we won't use it.
//// fetch('here was our API URL. Now it lives in our API const', options)
//// 	.then(response => response.json())
//// 	.then(response => console.log(response))
//// 	.catch(err => console.error(err))