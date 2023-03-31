import { gql } from '@apollo/client'


export const GET_NGO = gql`
query NgoQuery {
  mst__ngos {
    id
    ngo_id
    name
    charity_type
    charity_id
    email_id
    phone_number
    location
    logo
    country
    preferred_currency
    mst_posts {
      id
    }
    mst__projects {
      id
      name
      ngo_id
    }
    mst__transactions {
      total_amount
    }
  }
}
`

export const CREATE_NGO = gql`
mutation MyMutation($charity_type: String, $charity_id:Int, $name: String, $email_id: String,$country: uuid, $phone_number: String, $location: String, $preferred_currency: String, $email:citext, $passwordHash:String) {
  insert_mst__ngos(objects: {charity_type: $charity_type, charity_id:$charity_id, name: $name, email_id: $email_id,country:$country, phone_number: $phone_number, location: $location, preferred_currency: $preferred_currency, user: {data: {email: $email, locale: "en",defaultRole:"ngo", emailVerified: true, passwordHash:$passwordHash}}}) {
    affected_rows
  }
}
`

export const EDIT_NGO = gql`
mutation Ngoedit($id:uuid,$charity_type: String, $name: String, $email_id: String, $phone_number: String,$country: uuid, $location: String, $preferred_currency: String) {
  update_mst__ngos(where: {id: {_eq: $id}}, _set: {name: $name, charity_type: $charity_type,  email_id: $email_id,country:$country, phone_number: $phone_number, location: $location, preferred_currency:$preferred_currency}) {
    affected_rows
  }
}
`

export const GET_POST = gql`
query PostQuery {
  mst_posts {
    description
    title
    image
    post_date
    id
    is_active
    ngo_id
    mst__ngo {
      id
      name
    }
    mst_post_reports {
      id
      user {
        displayName
        createdAt
      }
    }
    mst__project {
      name
      id
      close_date
    }
    mst_post_likes {
      id
      isActive
      like
      postId
      userId
      user {
        id
        email
        displayName
        lastSeen
        phoneNumber
      }
    }
    mnt__comments {
      comment
      id
      is_active
      post_id
      user_id
      users {
        createdAt
        lastSeen
        id
        email
        displayName
      }
    }
  }
}
`

export const GET_POST_BY_NGOID = gql`
query PostQuery($ngo_id:uuid) {
  mst_posts(where: {ngo_id: {_eq: $ngo_id}}) {
    description
    title
    image
    post_date
    id
    is_active
    ngo_id
    mst_post_reports{
      id
    }
    mst__project {
      name
      id
      close_date
    }
    mst_post_likes {
      id
      isActive
      like
      postId
      userId
      user {
        id
        email
        displayName
        lastSeen
        phoneNumber
      }
    }
    mnt__comments {
      comment
      id
      is_active
      post_id
      user_id
      users {
        createdAt
        lastSeen
        id
        email
        displayName
      }
    }
  }
}
`

export const CREATE_POST = gql`
mutation PostCreate($title: String, $description: String, $image: String, $project_id: uuid, $amount_targeted:Int,$amount_received:Int,$post_date:date,$is_active:Boolean,$ngo_id:uuid) {
  insert_mst_posts(objects: {title: $title, description: $description, image: $image, project_id: $project_id, amount_targeted: $amount_targeted, amount_received: $amount_received,  post_date: $post_date, is_active: $is_active,ngo_id:$ngo_id}) {
    affected_rows
    returning {
      description
      image
      title
      post_date
      ngo_id
    }
  }
}
`
export const GET_PROJECT = gql`
query MyQuery {
  mst__projects {
    name
    charity_type
    donation_type
    license_no
    image
    description
    amount_target
    start_date
    close_date
    photos
    details
    id
    ngo_id
    is_active
    project_category {
      id
      name
    }
    mst__ngo {
      id
      ngo_id
      name
    }
    mst__transactions {
      total_amount
      user_id
      gift_aid_amount
      user {
        displayName
      }
      app_fee_amount
    }
  }
  
}
`
export const CREATE_PROJECT = gql`
mutation MyMutation($name: String, $charity_type: String, $project_categories_id: uuid, $donation_type: String, $license_no: String, $image: String, $description: String, $close_date: date, $photos: String, $details: String, $amount_target: Int, $start_date: date, $ngo_id: uuid, $sponsorship_name: String, $sponsorship_dob: String, $sponsorship_age: Int, $story: String, $is_active: Boolean) {
  insert_mst__projects(objects: {name: $name, charity_type: $charity_type, project_categories_id: $project_categories_id, donation_type: $donation_type, license_no: $license_no, image: $image, description: $description, close_date: $close_date, photos: $photos, details: $details, amount_target: $amount_target, start_date: $start_date, ngo_id: $ngo_id, sponsorship_name: $sponsorship_name, sponsorship_dob: $sponsorship_dob, sponsorship_age: $sponsorship_age, story: $story, is_active: $is_active}) {
    affected_rows
  }
}
`
export const CREATE_PROJECT_DONATION = gql`
mutation MyMutation($name: String, $charity_type: String, $project_categories_id: uuid, $donation_type: String, $license_no: String, $image: String, $description: String, $close_date: date,$start_date: date, $photos: String, $details: String,$is_active:Boolean,$amount_target:Int, $ngo_id: uuid) {
  insert_mst__projects(objects: {name: $name, charity_type: $charity_type, project_categories_id: $project_categories_id, donation_type: $donation_type, license_no: $license_no, image: $image, description: $description, close_date: $close_date, photos: $photos, details: $details, amount_target: $amount_target, start_date: $start_date, story: "post", is_active: $is_active,   ngo_id: $ngo_id}) {
    affected_rows
  }
}
`

export const GET_COUNTRY = gql`
query Country{
  mst__countrys {
    id
    name
  }
}
`

export const EDIT_POST = gql`
mutation PostEdit($id: uuid, $title: String, $description: String, $image: String, $project_id: uuid, $amount_targeted: Int, $amount_received: Int, $post_date: date, $is_active: Boolean, $ngo_id: uuid) {
  update_mst_posts(where: {id: {_eq: $id}}, _set: {title: $title, description: $description, image: $image, project_id: $project_id, amount_targeted: $amount_targeted, amount_received: $amount_received, post_date: $post_date, is_active: $is_active,  ngo_id: $ngo_id}) {
    affected_rows
    returning {
      title
      updated_at
      project_id
      post_date
      ngo_id
      is_active
      image
      id
      description
      created_at
      amount_targeted
      amount_received
    }
  }
}
`

export const EDIT_PROJECT = gql`
mutation MyMutation($id: uuid, $name: String, $charity_type: String, $project_categories_id: uuid, $license_no: String, $image: String, $description: String, $close_date: date, $photos: String, $details: String, $donation_type: String, $amount_target:Int, $is_active: Boolean,$ngo_id: uuid) {
  update_mst__projects(where: {id: {_eq: $id}}, _set: {name: $name, charity_type: $charity_type, project_categories_id: $project_categories_id, license_no: $license_no, image: $image, description: $description, close_date: $close_date, photos: $photos,amount_target: $amount_target, details: $details, donation_type: $donation_type, is_active: $is_active, ngo_id: $ngo_id}) {
    affected_rows
  }
}
`

export const GET_BYID_NGO = gql`
query MyQuery($id:uuid){
  mst__ngos(where: {id: {_eq: $id}}) {
    id
    charity_type
    email_id
    phone_number
    location
    preferred_currency
    name
    logo
    mst__transactions {
      app_fee_amount
      gift_aid_amount
      total_amount
    }
    country
    our_story
    state
    postal_code
    our_mission
    mst__projects {
      id
    }
  }
}
`

export const SEARCH_PROJECT = gql`
query SearchprojectQuery($name:String) {
  mst__projects(where: {name: {_ilike: $name}}) {
    name
    charity_type
    donation_type
    license_no
    image
    description
    amount_target
    amount_received
    start_date
    close_date
    photos
    details
    id
    is_active
    project_category {
      id
      name
    }
    
  }
}

`


export const USER_DETAILS = gql`
query UserDetails {
  users {
    email
    id
    displayName
    locale
    avatarUrl
    phoneNumber
      roles {
        role
        userId
        id
      }
  }
}
`
export const GET_PAYMENT = gql`
query MyQuery {
  mst__transactions(order_by: {created_at: desc}) {
    project_id
    total_amount
    transaction_date
    payment_method
    gift_aid_amount
    app_fee_amount
    type
    user {
      displayName
      email
    }
    mst__projects {
      name
      close_date
      start_date
      is_active
      amount_received
      mst__transactions {
        total_amount
        transaction_date
      }
      project_category {
        name
      }
      mst__ngo {
        name
      }
    }
    created_at
    id
    mst__ngo {
      name
      ngo_id
    }
  }
}
`
export const GET_PAYMENT_BY_NGOID = gql`
query MyQuery($ngo_id:uuid) {
  mst__transactions(where: {ngo_id: {_eq: $ngo_id}}, order_by: {created_at: desc}) {
    project_id
    total_amount
    transaction_date
    payment_method
    gift_aid_amount
    app_fee_amount
    type
    user {
      displayName
      email
    }
    mst__projects {
      name
      close_date
      start_date
      amount_received
      mst__transactions {
        total_amount
        transaction_date
      }
      project_category {
        name
      }
      mst__ngo {
        name
      }
    }
    created_at
    id
    mst__ngo {
      name
      ngo_id
    }
  }
}
`

export const GET_POST_COMMENTS = gql`
query PostComment {
  mnt__comments {
    comment
    created_at
    id
    is_active
    post_id
    user_id
    users {
      displayName
      email
      id
      lastSeen
      phoneNumber
    }
  }
}

`
export const GET_PROJECT_CATEGORIES = gql`
query MyQuery {
  project_categories {
    id
    name
    is_active
  }
}

`



export const GET_NGO_POST = gql`
query PostQuery {
  mst_posts {
    description
    title
    image
    post_date
    id
    is_active
    mst__ngo {
      id
      ngo_id
      name
    }
    mst__project {
      name
      id
      close_date
    }
    mst_post_likes {
      id
      isActive
      like
      postId
      userId
      user {
        id
        email
        displayName
        lastSeen
        phoneNumber
      }
    }
    mnt__comments {
      comment
      id
      is_active
      post_id
      user_id
      users {
        createdAt
        lastSeen
        id
        email
        displayName
      }
    }
  }
}
`

export const NGO_USER = gql`
query MyQuery($id: uuid) {
  mst__ngos(where: {user: {id: {_eq: $id}}}) {
    id
    user {
      id
      displayName
    }
    ngo_id
    name
  }
}
`

export const PROJECT_NGO_ID = gql`
query MyQuery($ngo_id: uuid) {
  mst__projects(where: {ngo_id: {_eq: $ngo_id}}) {
    id
    name
    is_active
    donation_type
  }
}
`


export const CHARITY_PROJECT = gql`
query MyQuery($ngo_id:uuid){
  mst__projects(where: {ngo_id: {_eq: $ngo_id}}) {
    id
    name
    start_date
    image
    amount_target
     project_category {
      id
      name
    }
    close_date
    details
    mst__transaction {
      amount
    }
}
}
`

export const CHARITY_POST = gql`
query MyQuery($ngo_id:uuid){
  mst_posts(where: {ngo_id: {_eq: $ngo_id}}) {
    title
    post_date
    description
    image
    mst__project {
      name
    }
    mnt__comments {
      comment
      id
      is_active
      post_id
      user_id
      users {
        createdAt
        lastSeen
        id
        email
        displayName
      }
    }
    mst_post_likes {
      id
      isActive
      like
      postId
      userId
      user {
        id
        email
        displayName
        lastSeen
        phoneNumber
      }
    }
      mst_post_reports {
        id
        user {
          displayName
          createdAt
        }
      }
  }
}
`

export const CHARITY_TRANSACTION = gql`
query transaction($ngo_id: uuid) {
  mst__transactions(where: {ngo_id: {_eq: $ngo_id}}) {
    total_amount
    mst__projects {
      id
    }
    transaction_date
    created_at
  }
}
`

export const GET_BYID_PROJECT = gql`
query MyQuery($ngo_id: uuid) {
  mst__projects(where: {ngo_id: {_eq: $ngo_id}}) {
    name
    start_date
    close_date
    photos
    image
    is_active
    amount_target
    mst__ngo {
      id
      ngo_id
      name
    }
    project_category {
      id
      name
    }
    mst__transactions {
      app_fee_amount
      gift_aid_amount
      total_amount
    }
  }
}
`

export const NGO_FOLLOWER = gql`
query MyQuery($followee_id: uuid) {
  map_user_follow(where: {followee_id: {_eq: $followee_id}}) {
    follower_id
    created_at
  }
}
`
export const TRANSACTION_TABLE = gql`
query getPostTransaction( $project_id: uuid) {
  mst__transactions(where: { project_id: {_eq: $project_id}}) {
    id
    total_amount
    gift_aid_amount
    user_id
    ngo_id
    payment_method
    project_id
    type
  }
}
`

export const GET_PROJECT_BY_NGOID = gql`
query MyQuery($ngo_id:uuid) {
  mst__transactions(where: {ngo_id: {_eq: $ngo_id}}, order_by: {created_at: desc}) {
    name
    charity_type
    donation_type
    license_no
    image
    description
    amount_target
    start_date
    close_date
    photos
    details
    id
    ngo_id
    is_active
    project_category {
      id
      name
    }
    mst__ngo {
      id
      ngo_id
      name
    }
  }
  mst__transactions {
    total_amount
  }
}
`
export const NGO_USER_FOLLOWER = gql`
query MyQuery($id: uuid) {
  users(where: {id: {_eq: $id}}) {
    displayName
    createdAt
    lastSeen
  }
}
`

export const ADMIN_TRANSACTION = gql`
query MyQuery($to: uuid) {
  mst__admin_transaction(where: {to: {_eq: $to}}) {
    donation_amount
    transfer_date
  }
}
`

export const GET_REPORT = gql`
query MyQuery {
  mst_post_report {
    mst_report_options {
      id
      option_name
    }
    mst_ngo {
      name
      created_at
      logo
      ngo_id
    }
    user {
      metadata
    }
    mst__project {
      id
    }
    status
    id
  }
}
`

export const UPDATE_REPORT = gql`
mutation MyMutation ($id:uuid){
  update_mst_post_report(where: {id: {_eq: $id}},
    _set: {status: "COMPLETED"}) {
    affected_rows
  }
}
`

export const NGO_PROFILE_UPDATE = gql`
mutation MyMutation($id: uuid, $logo: String) {
  update_mst__ngos(where: {id: {_eq: $id}}, _set: {logo: $logo}) {
    affected_rows
    returning {
      id
      logo
    }
  }
}

`
export const GET_TRANSACTION_AMOUNT = gql`
query MyQuery($transaction_date: date) {
  mst__transactions(where: {transaction_date: {_gt: $transaction_date}}) {
    total_amount
  }
}
`

export const NGO_PROFILE_FIELD_UPDATE = gql`
mutation MyMutation($id: uuid, $email_id: String, $country: uuid, $phone_number: String, $our_story: String, $our_mission: String, $name: String, $state: String, $postal_code: Int, $preferred_currency: String) {
  update_mst__ngos(where: {id: {_eq: $id}}, _set: {email_id: $email_id, country: $country, phone_number: $phone_number, our_story: $our_story, our_mission: $our_mission, name: $name, state: $state, postal_code: $postal_code, preferred_currency: $preferred_currency}) {
    affected_rows
    returning {
      phone_number
      country
      id
      email_id
      logo
      name
      our_mission
      our_story
      postal_code
      preferred_currency
      state
    }
  }
}
`

export const ADMIN_INBOX = gql`
query inbox {
  mst_inbox {
    userByUser {
      displayName
    }
    status
    message
    created_at
  }
  }
  `


export const REPORT_OPTIONS = gql`
query MyQuery {
  mst_post_report {
    mst_report_options {
      option_name
      id
    }
  }
}
`

export const POST_REPORT_TICKETS = gql`
mutation MyMutation($post_id:uuid,$option_name:String,$user_id:uuid,$project_id:uuid,$status:String,$ngo_id:uuid) {
  insert_mst_post_report(objects: {post_id: $post_id, mst_report_options: {data: {option_name: $option_name}}, user_id: $user_id, project_id:$project_id, status: $status, ngo_id: $ngo_id}) {
    returning {
      post_id
      user_id
      options
    }
    affected_rows
  }
}
`
export const PROJECT_REPORT_TICKETS = gql`
mutation MyMutation($option_name:String,$user_id:uuid,$project_id:uuid,$status:String,$ngo_id:uuid) {
  insert_mst_post_report(objects: { mst_report_options: {data: {option_name: $option_name}}, user_id: $user_id, project_id:$project_id, status: $status, ngo_id: $ngo_id}) {
    returning {
      user_id
      options
    }
    affected_rows
  }
}
`