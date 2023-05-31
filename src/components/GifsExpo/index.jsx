import { useEffect, useState } from "react"

const GifsExpo = ({categories= []}) => {
const [urlList, setUrlList] = useState([])

const getGifts = async (categories)=> {
 if (categories.length === 0){
    setUrlList([])
    return
 }

        const responsesList = await Promise.all(categories.map( async (category) => {
            const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=K5f4TsglH1Um97A7a3sKZIK1AY2ADiP3&q=${category}&limit=10`
        )
        const apiResponse = await response.json()
        return apiResponse.data
         //gifsList = apiResponse.data.map((gif) => {
          //return gif.images.fixed_width.url
         //})
        }))

        let gifsList = []

                responsesList.forEach((data) =>{
                data.forEach((item)=>{
                gifsList = [...gifsList,item.image.fixed_height.url.split('?')[0]]
            })
        })

            setUrlList([...gifsList])
        }

            useEffect(() => {
                 getGifts(categories)
            },
              [categories]
            )

            return (
                <>
                 <div>
                    {
                    urlList.map((url)=>{
                    return(
                    <img key={url} src={url} />
                    )   
                    }) 
                    }
                </div>               
            </>
            )              
}
export default GifsExpo