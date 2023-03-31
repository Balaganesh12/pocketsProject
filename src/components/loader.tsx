import Image from "next/image";
import loader from "../assets/images/POCKETS-GIF.gif";

const ProductCardLoader = (props: any) => (
  <div className='loader-lb'><Image src={loader} alt="loader" width={180} /></div>
);

export default ProductCardLoader;
