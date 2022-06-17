import Head from 'next/head'
import Img from 'next/image'
//import products from '../../products.json'
import { fromImageToUrl,API_URL } from '../../utils/urls'
import { twoDecimals } from '../../utils/format'
import BuyButton from '../../components/BuyButtons'

//const product = products[0]

const Product = ({product}) => {
    return(
        <div>
            <Head>
            {product.attributes.meta_title &&
            <title>{product.attributes.meta_title}</title>
            }
            {product.attributes.meta_description &&
            <meta name="description" content={product.attributes.meta_description}/>
            }
            </Head>
            <h3>{product.attributes.name}</h3>
            <img src={fromImageToUrl(product.attributes.image)} />
            <h3>{product.attributes.name}</h3>
            <p>${twoDecimals(product.attributes.price)} <BuyButton product={product}/></p>
            <p>
                {product.attributes.content}
            </p>
        </div>
    )
}

export async function getStaticProps({params:{slug}}){
    const product_res = await fetch(`${API_URL}/api/products/?filters[slug][$eq]=${slug}&populate=image`)
    const product_json = await product_res.json()
    const found = product_json.data

    return {
        props:{
            product: found[0]
        }
    }
}

export async function getStaticPaths(){
    const product_res = await fetch(`${API_URL}/api/products/?populate=*`)
    const products_json = await product_res.json()
    const products = products_json.data

    return {
        paths: products.map(product=>({
            params: { slug:String(product.attributes.slug)}
        })),
        fallback: false
    }
}

export default Product