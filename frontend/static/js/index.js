//6 load view

import ImageDetail from "./views/ImageDetail.js"
import Accueils from "./views/Accueils.js"
import Images from "./views/Images.js"



//9 

//      /post-view/:id
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") +"$")

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    //console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)))
    //return {}

    return Object.fromEntries(keys.map((key, i) =>{
        return [key, values[i]]
    }))
}



// 1 router
const router = async () => {
//console.log(pathToRegex("/post-view/:id"));

    const routes = [
      
        {path: '/image-detail/:id', view: ImageDetail},
        {path: '/', view: Accueils},
        {path: '/images', view: Images},
        
    ]

//2 match function
   const potentialMatches = routes.map(route => {
        return{
            route: route,
            //isMatch: location.pathname === route.path
            result: location.pathname.match(pathToRegex(route.path))
     }
  })
 //console.log(potentialMatches)

 //3
  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)

  if(!match){
    match = {
        route: routes[0],
        //isMatch: true
        result:[location.pathname]
    }
  }
  //console.log(match.result)
  //console.log(match.route.view())

  //7 instance de la classse
  const view  = new match.route.view(getParams(match));
  //console.log(getParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml()
  
}
//4 recuperer le pathname
const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}
//8 history

window.addEventListener('popstate', router)

//5
document.addEventListener("DOMContentLoaded", () =>{
    document.body.addEventListener("click", e => {
        //console.log(e)
        if(e.target.matches("[data-link]")){
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router()
})