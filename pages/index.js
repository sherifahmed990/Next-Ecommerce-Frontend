import Head from 'next/head'
import Link from 'next/link'
import Img from 'next/image'
import styles from '../styles/Home.module.css'

import { fromImageToUrl, API_URL } from '../utils/urls'
import { twoDecimals } from '../utils/format'

export default function Home({products}) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {products.map(product=>(
        <div key={product.attributes.name} className={styles.product}>
          <Link href={`/products/${product.attributes.slug}`}>
            <a>
          <div className={styles.product__Row}>
            <div className={styles.product__colImg}>
              <img src={fromImageToUrl(product.attributes.image)}/>
            </div>
            <div className={styles.product__Col}>
              {product.attributes.name} ${twoDecimals(product.attributes.price)} 
            </div>
          </div>
          </a>
          </Link>
        </div>
      ))}     
    </div>
  )
}

export async function getStaticProps(){
  const product_res = await fetch(`${API_URL}/api/products/?populate=*`)
  const products_json = await product_res.json()
  const products = products_json.data

  return {
    props:{
      products
    }
  }
}