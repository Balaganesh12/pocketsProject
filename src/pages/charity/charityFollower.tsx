import React, { useState, useEffect } from "react";
import Image from "next/image";
import { NGO_FOLLOWER, GET_NGO, NGO_USER_FOLLOWER } from '../../helpers/queries'
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Ellipse from "../../assets/images/postImage/Ellipse 5156.svg"
import moment from "moment";

const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
}

export const Product = (id: any) => {
  if (id) {
    const { data, error, loading } = useQuery(NGO_USER_FOLLOWER, {
      variables: {
        id: id?.productId
      }
    })

    let date = data?.users[0]?.createdAt
    var now = moment(date).format("DD/MM/YYYY");

    return (
      <>
      <div className="total_charity_like">
        <div className="user_charity_details">
          <Image loader={sanityIoImageLoader} alt="image" src={Ellipse} className="User_like_image" width={50} height={50} />
          <h3>{data?.users[0]?.displayName}</h3>
          <h4>Followed on {now}</h4>
        </div>
      </div>
     
      </>
    )
  }

}

export const charityFollower: React.FC<any> = () => {
  const router = useRouter()
  const [routerr, setRouter] = useState<any>([]);

  useEffect(() => {
    if (router) {
      setRouter(router)
    }
  }, [routerr]);

  let query = router.query.slug

  const {
    error: ngooError,
    loading: ngooLoading,
    data: dataNgoo,
  } = useQuery(GET_NGO, {
    variables: {
    }
  });

  const datas = dataNgoo?.mst__ngos

  const ngodatafilter = datas?.find((element) => element.id === query)

  const {
    error: userError,
    loading: userLoading,
    data: dataUser,
    refetch: refetchPost,
  } = useQuery(NGO_FOLLOWER, {
    variables: {
      followee_id: ngodatafilter?.id
    }
  });
  console.log(dataUser, "dataUser");

  return (
    <>
      {
        dataUser?.map_user_follow?.map((id) => {
            return <Product productId={id?.follower_id} />
        }
          )
        }
    </>
  )
}

export default charityFollower
