export const API_URL = process.env.NEXT_PUBLIC_API_UPL || 'http://localhost:1337'

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || 'pk_test_51IZuTBFpX3iFwiqyV1kXo2dpm19MohvTAPctbwPjEhITSsToCqS9y5oBesWvFx2sFpFojoDz7W7v8Q05MH6wjjkQ00thsYKgTi'
export const fromImageToUrl = (image =>{
    if(!image.data.attributes){
        return "/vercel.svg"
    }

    if(image.data.attributes.url.indexOf("/")===0){
        return `${API_URL}${image.data.attributes.url}`
    }

    return image.url
})