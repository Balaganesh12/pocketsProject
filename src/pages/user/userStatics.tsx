import Link from 'next/link'

import { Container, Title } from '@mantine/core'
import Image from 'next/image'
import money from '../../assets/images/money-4.svg';
import coin from '../../assets/images/coin.svg';
import giftsvg from '../../assets/images/giftsvg.svg';
import profile_pic from '../../assets/images/profile_pic.svg';
import donation_pic from '../../assets/images/donation_pic.svg';



export const Userstatics: React.FC = () => {
    return (
        <>
            <div className='userStatics_page'>
                <div className='user_statics'>
                    <h2 className='user_h2'>User statics</h2>
                    <div className='total_donation'>
                        <div className='donation_sec'>
                            <h3 className='details_h3'>Total donation</h3>
                            <div className='detaile_dev'>
                                <Image src={money} alt="money-4" />
                                <span className='euro'>£ 591</span>
                            </div>
                        </div>
                        <div className='donation_sec'>

                            <h3 className='details_h3'>App fee</h3>
                            <div className='detaile_dev'>
                                <Image src={coin} alt="money-4" />
                                <span className='euro'>£ 80</span>
                            </div>
                        </div>
                        <div className='donation_sec'>

                            <h3 className='details_h3'>Gift aid</h3>
                            <div className='detaile_dev'>
                                <Image src={giftsvg} alt="money-4" />
                                <span className='euro'>£ 591</span>
                            </div>
                        </div>
                    </div>
                    <div className='total_list'>
                        <h2 className='requr_donation'>Recurrening donation list</h2>
                        <div className='donation_list'>
                            <div className='user_trans'>
                                <div className='duration'>
                                    <div className='pic'>
                                        <Image src={profile_pic} alt="profile" />
                                    </div>
                                    <div>
                                        <h2 className='child_details'>Child in need</h2>
                                        <h4 className='month'>Duration: 8 months</h4>
                                    </div>

                                </div>
                                <div className='gift_sec'>
                                    <span className='gif'>Gift-aid - <p className='green_text'>£ 05</p></span>
                                    <span className='gif'>App fee - <p className='green_text'>£ 10</p></span>
                                    <span className='gif'>Recurring- <p className='green_text'>£ 75</p></span>
                                </div>
                            </div>
                            <div className='user_trans'>
                                <div className='duration'>
                                    <div className='pic'>
                                        <Image src={profile_pic} alt="profile" />
                                    </div>
                                    <div>
                                        <h2 className='child_details'>Child in need</h2>
                                        <h4 className='month'>Duration: 8 months</h4>
                                    </div>

                                </div>
                                <div className='gift_sec'>
                                    <span className='gif'>Gift-aid - <p className='green_text'>£ 05</p></span>
                                    <span className='gif'>App fee - <p className='green_text'>£ 10</p></span>
                                    <span className='gif'>Recurring- <p className='green_text'>£ 75</p></span>
                                </div>
                            </div>
                            <div className='user_trans'>
                                <div className='duration'>
                                    <div className='pic'>
                                        <Image src={profile_pic} alt="profile" />
                                    </div>
                                    <div>
                                        <h2 className='child_details'>Child in need</h2>
                                        <h4 className='month'>Duration: 8 months</h4>
                                    </div>

                                </div>
                                <div className='gift_sec'>
                                    <span className='gif'>Gift-aid - <p className='green_text'>£ 05</p></span>
                                    <span className='gif'>App fee - <p className='green_text'>£ 10</p></span>
                                    <span className='gif'>Recurring- <p className='green_text'>£ 75</p></span>
                                </div>
                            </div>
                            <div className='user_trans'>
                                <div className='duration'>
                                    <div className='pic'>
                                        <Image src={profile_pic} alt="profile" />
                                    </div>
                                    <div>
                                        <h2 className='child_details'>Child in need</h2>
                                        <h4 className='month'>Duration: 8 months</h4>
                                    </div>

                                </div>
                                <div className='gift_sec'>
                                    <span className='gif'>Gift-aid - <p className='green_text'>£ 05</p></span>
                                    <span className='gif'>App fee - <p className='green_text'>£ 10</p></span>
                                    <span className='gif'>Recurring- <p className='green_text'>£ 75</p></span>
                                </div>
                            </div>
                            <div className='user_trans'>
                                <div className='duration'>
                                    <div className='pic'>
                                        <Image src={profile_pic} alt="profile" />
                                    </div>
                                    <div>
                                        <h2 className='child_details'>Child in need</h2>
                                        <h4 className='month'>Duration: 8 months</h4>
                                    </div>

                                </div>
                                <div className='gift_sec'>
                                    <span className='gif'>Gift-aid - <p className='green_text'>£ 05</p></span>
                                    <span className='gif'>App fee - <p className='green_text'>£ 10</p></span>
                                    <span className='gif'>Recurring- <p className='green_text'>£ 75</p></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='total_list'>
                        <h2 className='requr_donation'>Donation history</h2>
                        <div className='donation_list'>
                            <div className='user_trans'>
                                <div className='duration'>
                                    <div className='pic'>
                                        <Image src={donation_pic} alt="profile" />
                                    </div>
                                    <div>
                                        <h2 className='child_details'>Welfare Trust</h2>
                                        <h4 className='month'>Duration: 8 months</h4>
                                    </div>

                                </div>
                                <div className='gift_sec'>
                                    <span className='gif'>Gift-aid - <p className='green_text'>£ 05</p></span>
                                    <span className='gif'>App fee - <p className='green_text'>£ 10</p></span>
                                    <span className='gif'>Recurring- <p className='green_text'>£ 75</p></span>
                                </div>
                            </div>
                            <div className='user_trans'>
                                <div className='duration'>
                                    <div className='pic'>
                                        <Image src={donation_pic} alt="profile" />
                                    </div>
                                    <div>
                                        <h2 className='child_details'>Welfare Trust</h2>
                                        <h4 className='month'>Duration: 8 months</h4>
                                    </div>

                                </div>
                                <div className='gift_sec'>
                                    <span className='gif'>Gift-aid - <p className='green_text'>£ 05</p></span>
                                    <span className='gif'>App fee - <p className='green_text'>£ 10</p></span>
                                    <span className='gif'>Recurring- <p className='green_text'>£ 75</p></span>
                                </div>
                            </div>
                            <div className='user_trans'>
                                <div className='duration'>
                                    <div className='pic'>
                                        <Image src={donation_pic} alt="profile" />
                                    </div>
                                    <div>
                                        <h2 className='child_details'>Welfare Trust</h2>
                                        <h4 className='month'>Duration: 8 months</h4>
                                    </div>

                                </div>
                                <div className='gift_sec'>
                                    <span className='gif'>Gift-aid - <p className='green_text'>£ 05</p></span>
                                    <span className='gif'>App fee - <p className='green_text'>£ 10</p></span>
                                    <span className='gif'>Recurring- <p className='green_text'>£ 75</p></span>
                                </div>
                            </div>
                            <div className='user_trans'>
                                <div className='duration'>
                                    <div className='pic'>
                                        <Image src={donation_pic} alt="profile" />
                                    </div>
                                    <div>
                                        <h2 className='child_details'>Welfare Trust</h2>
                                        <h4 className='month'>Duration: 8 months</h4>
                                    </div>

                                </div>
                                <div className='gift_sec'>
                                    <span className='gif'>Gift-aid - <p className='green_text'>£ 05</p></span>
                                    <span className='gif'>App fee - <p className='green_text'>£ 10</p></span>
                                    <span className='gif'>Recurring- <p className='green_text'>£ 75</p></span>
                                </div>
                            </div>
                            <div className='user_trans'>
                                <div className='duration'>
                                    <div className='pic'>
                                        <Image src={donation_pic} alt="profile" />
                                    </div>
                                    <div>
                                        <h2 className='child_details'>Welfare Trust</h2>
                                        <h4 className='month'>Duration: 8 months</h4>
                                    </div>

                                </div>
                                <div className='gift_sec'>
                                    <span className='gif'>Gift-aid - <p className='green_text'>£ 05</p></span>
                                    <span className='gif'>App fee - <p className='green_text'>£ 10</p></span>
                                    <span className='gif'>Recurring- <p className='green_text'>£ 75</p></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userstatics
